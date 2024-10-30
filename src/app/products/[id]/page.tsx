import productApiRequest from "@/apiRequest/product";
import ProductAddForm from "@/app/products/_components/product-add-form";

const ProductEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
  let product = null;
  try {
    const id = (await params).id;
    // console.log(id);
    const { payload } = await productApiRequest.getDetail(Number(id));
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
