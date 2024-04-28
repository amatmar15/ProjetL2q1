"use client"

import { SeparatorHorizontal, ShoppingCart, X } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet"
import Link from "next/link";
import { Separator } from "./separator";
import { useCart } from "../Providers/cart-provider";
import { formatPrice } from "../lib/utils";
import { Produit } from "../payload-types";
import { Product as ProductType } from "../types/product";


const Cart = () => {

    const { cartItems, total, discount, deliveryCost, cartProducts } = useCart()
    return (
        <Sheet >
            <SheetTrigger className="flex flex-row items-center m-0" asChild>
                <div className="pl-2.5 w-[4.5vh] h-[4.4vh] sm:h-11 sm:w-16 bg-black hover:bg-gray-800 hover:cursor-pointer rounded-md items-center justify-center align-middle">
                    <ShoppingCart className="text-white" />
                    <span className="text-white pr-2.5 pl-2">{cartItems}</span>
                </div>

            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="text-lg mb-2.5 justify-center align-middle text-center items-center">
                    Cart
                </SheetHeader>
                {cartItems > 0 ? (
                    <>
                        <div>
                            <Separator className="border border-grey-500 mb-2.5" />
                            {cartProducts.map((product, index) => (
                            <Product product={product} />
                        ))}
                        </div>
                        
                        {true && (
                            <>
                                <Separator className="border border-grey-500 mt-2.5 mb-2.5" />
                                <div className="flex flex-row ">
                                    <span className="flex-1">Sous Total</span>
                                    <span>0</span>
                                </div>
                                <div className="flex flex-row ">
                                    <span className="flex-1">Remise</span>
                                    <span>{discount}%</span>
                                </div>
                            </>
                        )}
                        <Separator className="border border-grey-500 mt-2.5 mb-2.5" />
                        <div className="flex flex-row ">
                            <span className="flex-1">Sous Total</span>
                            <span>0</span>
                        </div>
                        <div className="flex flex-row ">
                            <span className="flex-1">Frais de livraison</span>
                            <span>{deliveryCost}</span>
                        </div>
                        <Separator className="border border-grey-500 mt-2.5 mb-2.5" />
                        <div className="flex flex-row ">
                            <span className="flex-1">TOTAL</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                        <SheetFooter className="mt-2.5 outline-none">
                            <SheetTrigger asChild className="w-full outline-none">
                                <Link href='/cart' className="outline-none">
                                    <Button className="w-full outline-none">Paiement</Button>
                                </Link>
                            </SheetTrigger>
                        </SheetFooter>
                    </>
                ) : (
                    <>
                        <div className="text-lg m-0">
                            <Separator className="border border-grey-500 mb-2.5" />
                            <svg fill="#4a4a4a" className="p-6 overflow-visible rounded-full bg-[#d9d9d9]  ml-[85px] mt-[28vh] mb-6 w-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141z" /></svg>
                            <span className="text-[#4a4a4a] ml-[105px] px-2.5">Rien à voir :{"("}</span>
                        </div>
                    </>)}
                
            </SheetContent>
        </Sheet>
    )
}

export default Cart






const Product = ({ product }: { product: ProductType }) => {
    const { removeFromCart } = useCart()

    return (
        <div className="flex items-center justify-between relative">
            <Link href={`/product/${product.id}`} className="w-1/3">
                <img
                    className=" h-auto rounded-lg border-2 border-gray-200"
                    height="250"
                    src={product.imageSrc.url!}
                    style={{
                        aspectRatio: "250/250",
                        objectFit: "cover",
                    }}
                    width="250"
                    alt={product.imageSrc.alt!}
                />
            </Link>
            <div className="flex-1 flex flex-col justify-between ">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex flex-col space-x-1">
                    <div className="flex flex-row ">
                        <span className="flex-1">Price</span>
                        <span>{formatPrice(product.price)}</span>
                    </div>
                    {product.sale &&
                        <div className="flex flex-row ">
                            <span className="flex-1">Price discounted</span>
                            <span>{formatPrice(product?.priceDiscounted!)}</span>
                        </div>
                    }
                    <div className="flex flex-row ">
                        <span className="flex-1">Quantity</span>
                        <span>{product.quantity}</span>
                    </div>
                </div>
            </div>
            <a onClick={() => removeFromCart(product)}
                className=" absolute top-0 right-0 p-1 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer"
            >
                <X size={15} />
            </a>
        </div>
    );
};