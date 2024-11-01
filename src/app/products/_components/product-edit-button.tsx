"use client";

import DeleteProduct from "@/app/products/_components/product-delete";
import { Button } from "@/components/ui/button";
import { isClient } from "@/lib/http";
import { ProductListResType } from "@/schemaValidations/product.schema";
import Link from "next/link";

interface ProductEditButtonProps {
  product: ProductListResType["data"][0];
}

const ProductEditButton = (props: ProductEditButtonProps) => {
  const { product } = props;
  const { id } = product;

  const isAuthenticated =
    isClient() && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) return null;

  return (
    <div className="flex space-x-2 items-start">
      <Link href={`/products/${id}/edit`}>
        <Button value={"outline"}>Edit</Button>
      </Link>
      <DeleteProduct product={product} />
    </div>
  );
};

export default ProductEditButton;
