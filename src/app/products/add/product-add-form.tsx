"use client";

import productApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  CreateProductBody,
  CreateProductBodyType,
} from "@/schemaValidations/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const ProductAddForm = () => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
    },
  });

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDeleteImage = () => {
    // Xóa file và preview
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }

    // Reset form value
    form.setValue("image", "");

    // Reset input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];

    // Cleanup old preview URL if exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (newFile) {
      const newPreviewUrl = URL.createObjectURL(newFile);
      setFile(newFile);
      setPreviewUrl(newPreviewUrl);
      form.setValue("image", `http://localhost:3000/${newFile.name}`);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadImageResult = await productApiRequest.uploadImage(formData);
      const imageUrl = uploadImageResult.payload.data;
      const result = await productApiRequest.create({
        ...values,
        image: imageUrl,
      });

      toast({
        description: result.payload.message,
      });

      router.push("/products");
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
        })}
        className="space-y-2 max-w-[600px] w-full flex-shrink-0"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="tên" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá cả</FormLabel>
              <FormControl>
                <Input placeholder="Giá" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả sản phẩm</FormLabel>
              <FormControl>
                <Textarea placeholder="Mô tả về sản phẩm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  //   const file = e.target.files?.[0];
                  //   if (file) {
                  //     setFile(file);
                  //     field.onChange(`http://localhost:3000/${file.name}`);
                  //   }
                  // }}
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {file && (
          <>
            <Image
              src={URL.createObjectURL(file)}
              width={128}
              height={128}
              alt="Picture Preview"
              className="w-32 h-32 object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDeleteImage}
            >
              Xoá
            </Button>
          </>
        )}

        <Button type="submit" className="!mt-8 w-full">
          Thêm sản phẩm
        </Button>
      </form>
    </Form>
  );
};

export default ProductAddForm;
