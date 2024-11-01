import productApiRequest from "@/apiRequest/product";
import { baseOpenGraph } from "@/app/shared-metadata";
import envConfig from "@/config";
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
  const url = envConfig.NEXT_PUBLIC_URL + `/products/${id}`;

  // fetch data
  const product = payload.data;

  return {
    ...baseOpenGraph,
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      siteName: "Web bán hàng",
      images: [
        {
          url: product.image, // Must be an absolute URL
        },
      ],
    },
    alternates: {
      canonical: url,
    },
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
      {!product && <div>Không tìm thấy sản phẩm</div>}
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
