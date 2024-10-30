import productApiRequest from "@/apiRequest/product";
import ProductAddForm from "@/app/products/_components/product-add-form";
import type { Metadata } from "next";
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
    title: `Edit sản phẩm ${product.name}`,
    description: product.description,
  };
}

const ProductEdit = async ({ params }: Props) => {
  let product = null;
  try {
    const id = params.id;
    // console.log(id);
    const { payload } = await getDetail(Number(id));
    // Nếu không có d
    product = payload.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-4">
      {!product && <div>Không tìm thấy sản phẩm</div>}
      <ProductAddForm product={product} />
    </div>
  );
};

export default ProductEdit;
