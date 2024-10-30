"use client";

import productApiRequest from "@/apiRequest/product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { ProductResType } from "@/schemaValidations/product.schema";
import { useRouter } from "next/navigation";

type ProductAddFormProps = ProductResType["data"];

const DeleteProduct = (props: { product: ProductAddFormProps }) => {
  const { product } = props;
  const id = product.id;
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await productApiRequest.delete(id);

      toast({
        description: result.payload.message,
      });
      router.refresh();
    } catch (error) {
      handleErrorApi(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có muốn xoá sản phẩm không?</AlertDialogTitle>
          <AlertDialogDescription>
            Sản phẩm &rdquo;{product.name}&rdquo; sẽ bị xoá vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
