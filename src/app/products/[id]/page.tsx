import productApiRequest from "@/apiRequest/product";
import Image from "next/image";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  let product = null;
  try {
    const id = (await params).id;
    // console.log(id);
    const { payload } = await productApiRequest.getDetail(Number(id));
    // Nếu không có d
    product = payload.data;
    console.log(product);
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
