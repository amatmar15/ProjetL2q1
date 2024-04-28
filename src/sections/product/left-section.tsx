"use client"

import { Product } from "../../types/product";
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, HeartIcon, StarIcon } from "lucide-react"
import { useCart } from "../../Providers/cart-provider";
import { useEffect, useState } from "react";
import { cn, formatPrice } from "../../lib/utils";
import { Produit } from "../../payload-types";


export function LeftPanel({ product: initProduct }: { product: Produit }) {

    const { addToCart } = useCart()
    const [product, setProduct] = useState<any>(initProduct)

    useEffect(() => {
        setProduct({ ...initProduct, quantity: 1, color: initProduct.colors[0].color })
    }, [])

    const setQuantity = (value: string) => {
        setProduct((product: any) => { return { ...product, quantity: parseInt(value) } })
    }
    const setColor = (value: string) => {
        setProduct({ ...product, color: value })
    }

    return <div className="flex flex-col w-full lg:w-1/2">
        < BreadCrumb product={product} />
        <ProductDetails product={product} />
        <div className="mt-6 grid gap-4 md:gap-8">
            <QuantitySelector inventory={product.inventory} setQuantity={setQuantity} />
            <ColorSelector colors={product.colors} setColor={setColor} />
            <div className="flex items-center justify-between mt-2">
                <Button className="text-red-600" size="lg" variant="outline">
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Add to wishlist
                </Button>
                <Button className="ml-2 w-full bg-blue-900 text-white" size="lg" variant="outline" type="button" onClick={() => addToCart(product)}>
                    Add to cart
                </Button>
            </div>
        </div>
    </div>
}


const QuantitySelector = ({ inventory, setQuantity }: { inventory: number, setQuantity: any }) => {
    return <div className="grid gap-2">
        {/* Libellé du champ de quantité */}
        <Label className="text-base" htmlFor="quantity">
            Quantity
        </Label>
        {/* Sélecteur de quantité */}
        <Select defaultValue="1" onValueChange={setQuantity}>
            <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                {new Array(inventory).fill(0).map((_, index) => {
                    return <>
                        <SelectItem value={`${index + 1}`}>{index + 1} </SelectItem>
                    </>
                })}
            </SelectContent>
        </Select>
    </div>
}

const ColorSelector = ({ colors, setColor }: { colors: Produit["colors"], setColor: any }) => {
    return (
        <div className="grid gap-2">
            {/* Libellé du champ de couleur */}
            <Label className="text-base" htmlFor="color">
                Color
            </Label>
            {/* Groupe de boutons pour les options de couleur */}
            <RadioGroup className="flex items-center gap-2" defaultValue={colors[0].color!} id="color" onValueChange={setColor}>
                {colors.map((colorObj) => {
                    const { color } = colorObj
                    return (
                        <Label
                            key={color}
                            className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                            htmlFor={`color-${color}`}
                        >
                            <RadioGroupItem id={`color-${color}`} value={color!} />
                            {color}
                        </Label>
                    )
                })}
            </RadioGroup>
        </div>
    );
};

const ProductDetails = ({ product }: { product: Produit }) => {
    return <>
        {/* Affiche le nom du produit sélectionné : c'est le titre de la page */}
        <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-gray-900" > {product.name}</h1>
        {/* Paragraphe affichant le prix initial du produit sélectionné*/}
        < p className={cn(product.sale ? "text-gray-400 line-through  text-sm" : "text-3xl font-extrabold", "mt-7")} > {formatPrice(product.price)}</ p>
        {/* Paragraphe affichant le prix spécial du produit sélectionné*/}
        {product.sale && <p className="text-3xl font-extrabold" > {formatPrice(product?.priceDiscounted!)}</p >}

        <div className="flex items-center mt-3">
            {/* Affichage des cinq icônes d'étoile (voir fonction plus bas) pour représenter une notation */}
            <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <StarIcon className="w-5 h-5 text-yellow-400" />

            {/* Paragraphe affichant la note du produit sélectionné*/}
            <p className="ml-2 text-sm text-gray-500">4/5</p>
        </div>

        {/* Paragraphe affichant quel type d'utilisateur est connecté et rappelant si il y a une réduction*/}
        <p className="mt-3 text-sm text-gray-600">
            Logged in as <span className="font-medium text-gray-900">Reseller</span> -
            Price reduction applied
        </p>
        {/* Paragraphe affichant la description du produit sélectionné*/}
        <p className="mt-4 text-sm text-gray-600">
            {product.description}
        </p>
    </>
}

const BreadCrumb = ({ product }: { product: Produit }) => {
    return <div className="flex items-center gap-2 text-sm">
        <Link className="font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="/">
            Home
        </Link>
        <ChevronRightIcon className="h-3 w-3 fill-current-foreground-50 text-gray-400" />
        <Link
            className="font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/product">
            Products
        </Link>
        <ChevronRightIcon className="h-3 w-3 fill-current-foreground-50 text-gray-400" />
        <span className="font-medium">{product.name}</span>
    </div>
}