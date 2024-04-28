import { notFound } from "next/navigation";
import { LeftPanel } from "../../../sections/product/left-section";
import { RightPanel } from "../../../sections/product/right-section";
import { getProductByID } from "../../../actions/products/get-product-by-id";

export default async function Component({ params }: { params: any }) {

    const product = await getProductByID({ id: params.productId })
    if (!product) {
        return notFound()
    }
    return (

        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <LeftPanel product={product} />
                <RightPanel cover={product.imageSrc} images={product.images} />
            </div>
        </div>
    )
}

