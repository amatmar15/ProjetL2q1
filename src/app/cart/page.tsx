/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3xSlNZxlIyF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { SeparatorHorizontal, ShoppingCart, X } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "../../Providers/cart-provider";
import { formatPrice } from "../../lib/utils";
import { Produit } from "../../payload-types";
import { Product as ProductType } from "../../types/product";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export default function Component() {
  const { cartItems, total, discount, deliveryCost, cartProducts } = useCart()
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-8 px-4 md:px-0">
      <div>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <div className="grid gap-4">
          <div>
            <Separator className="border border-grey-500 mb-2.5" />
              {cartProducts.map((product, index) => (
              <Product product={product} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Shipping Address</h2>
            <form className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter your address" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter your city" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Enter your state" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zip">Zip</Label>
                  <Input id="zip" placeholder="Enter your zip code" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us" id="country">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p className="font-medium">{formatPrice(total)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Shipping</p>
                <p className="font-medium">{formatPrice(deliveryCost)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <p>Total</p>
                <p>{deliveryCost == "Free"? (
                  <>
                    {formatPrice(total)}
                  </>
                ):
                (
                  <>
                    {formatPrice(total + deliveryCost)}
                  </>
                )}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <CreditCardIcon className="h-4 w-4 mr-2" />
                Complete Purchase
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

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