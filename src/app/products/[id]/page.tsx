import productApiRequest from "@/apiRequest/product";
import type { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";

type Props = {
  params: { id: string };
};

const getDetail = cache(productApiRequest.getDetail);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;
  const { payload } = await getDetail(Number(id));

  // fetch data
  const product = payload.data;

  return {
    title: product.name,
  };
}

const ProductDetail = async ({ params }: Props) => {
  let product = null;
  try {
    const id = params.id;
    // console.log(id);
    const { payload } = await getDetail(Number(id));

    product = payload.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      Page
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
            className="w-32 h-32 object-cover"
          />

          <h3>{product.name}</h3>
          <div>{product.price}</div>
          <div>{product.description}</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
