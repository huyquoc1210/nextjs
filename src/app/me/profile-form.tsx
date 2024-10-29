"use client";

import accountApiRequest from "@/apiRequest/account";
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
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// type ProfileFormType = AccountResType["data"];
interface ProfileFormType {
  profile: {
    name?: string;
    email?: string;
    id?: number;
  };
}

const ProfileForm = (props: ProfileFormType) => {
  const { profile } = props;
  const { name, email } = profile;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return;
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const result = await accountApiRequest.updateMe(values);

      toast({
        description: result.payload.message,
      });

      router.refresh();
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] w-full flex-shrink-0"
        noValidate
      >
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="shadcn" type="email" value={email} readOnly />
        </FormControl>
        <FormMessage />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
