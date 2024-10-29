import productApiRequest from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProductListPage = async () => {
  const { payload } = await productApiRequest.getList();
  const productList = payload.data;
  console.log(productList);
  return (
    <>
      <h1>ProductList</h1>
      <div className="space-y-5">
        {productList.map((item) => {
          const { name, price, description, image, id } = item;
          return (
            <div key={id} className="'flex space-x-4">
              <Image src={image} alt={name} width={180} height={180} />
              <h3>{name}</h3>
              <div>{price}</div>
              <div>{description}</div>
              <div className="flex space-x-2">
                <Button value={"outline"}>Edit</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductListPage;
