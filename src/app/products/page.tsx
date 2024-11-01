import productApiRequest from "@/apiRequest/product";
import ProductAddButton from "@/app/products/_components/product-add-button";
import ProductEditButton from "@/app/products/_components/product-edit-button";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm",
  description: "Danh sách sản phẩm của web bán hàng ,được tạo bởi Huy Dev",
};

const ProductListPage = async () => {
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;

  return (
    <div className="space-y-3">
      <h1>ProductList</h1>
      <ProductAddButton />
      <div className="space-y-5">
        {productList.map((product) => {
          const { name, price, description, image, id } = product;

          return (
            <div key={id} className="flex space-x-4">
              <Link href={`/products/${id}`}>
                <Image
                  src={image}
                  alt={name}
                  width={180}
                  height={180}
                  className="w-32 h-32 object-cover"
                />
              </Link>
              <h3>{name}</h3>
              <div>{price}</div>
              <div>{description}</div>
              <ProductEditButton product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListPage;
