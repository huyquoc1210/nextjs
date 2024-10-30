import productApiRequest from "@/apiRequest/product";
import DeleteProduct from "@/app/products/_components/product-delete";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const ProductListPage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const isAuthenticated = Boolean(sessionToken.value);

  const { payload } = await productApiRequest.getList();
  const productList = payload.data;

  return (
    <div className="space-y-3">
      <h1>ProductList</h1>
      {isAuthenticated && (
        <Link href={"/products/add"}>
          <Button variant={"secondary"}>Thêm sản phẩm</Button>
        </Link>
      )}
      <div className="space-y-5">
        {productList.map((item) => {
          const { name, price, description, image, id } = item;
          console.log(id);
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
              {isAuthenticated && (
                <div className="flex space-x-2 items-start">
                  <Link href={`/products/${id}edit/`}>
                    <Button value={"outline"}>Edit</Button>
                  </Link>
                  <DeleteProduct product={item} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListPage;
