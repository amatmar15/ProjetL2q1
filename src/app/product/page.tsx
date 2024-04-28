import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"
import Link from "next/link";
import { getProducts } from "../../actions/products/get-products";
import { Produit } from "../../payload-types";
import { cn, formatPrice } from "../../lib/utils";

export default async function Component() {

    const products = await getProducts()

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row">
                    <SideBar />
                    <main className="w-full md:w-3/4 px-2">
                        <Header />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                            {products.map((product) => <Product product={product} />)}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

const Header = () => {
    return (<>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Products</h1> {/* Titre de la page */}
            <div className="flex items-center space-x-2 mt-2">
                {/* Sélecteur déroulant pour trier les produits */}
                <Select>
                    <SelectTrigger id="sort">
                        <SelectValue placeholder="Best Selling" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="best-selling">Our choice</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low-high">Price: low to high</SelectItem>
                        <SelectItem value="price-high-low">Price: high to low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex justify-between items-center mb-6">
            {/* Texte indiquant le nombre d'articles affichés */}
            <span className="text-sm">Showing 1 to 9 of 9 items</span>
        </div>
    </>
    )
}

const SideBar = () => {
    return <aside className="w-full md:w-1/4 px-2 mb-4 md:mb-0 mt-10 mr-3"> {/* Définit un panneau latéral pour les options de recherche*/}
        <h2 className="text-lg font-semibold mb-4">Browse by :</h2>
        <ul className="space-y-2 mb-6"> {/* Liste d'options de recherche */}
            <li className="font-bold text-blue-900 cursor-pointer hover:font-bold">All</li>
            <li className="text-gray-900 cursor-pointer hover:font-semibold">Sale</li>
            <li className="text-gray-900 cursor-pointer hover:font-semibold">Chargers</li>
            <li className="text-gray-900 cursor-pointer hover:font-semibold">Portables Chargers</li>
            <li className="text-gray-900 cursor-pointer hover:font-semibold">Charging Cables</li>
            <li className="text-gray-900 cursor-pointer hover:font-semibold">Interior Accessorires</li>
            <li className="text-gray-900 cursor-pointer hover:font-semibold">Exterior Accessories</li>
        </ul>
        <div className="space-y-4 mt-5">
            <h3 className="font-semibold mb-2">Filter by :</h3>
            {/* Accordion pour des otpions de recherches qui peuvent se rabbattre */}
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-2 mb-6">
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">Less than 500€</li>
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">Less than 200€</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Color</AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-2 mb-6">
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">Blue
                            </li>
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">Black
                            </li>
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">Violet
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Rated</AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-2 mb-6">
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">5 stars only
                            </li>
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">4 stars or more
                            </li>
                            <li className="text-gray-900 cursor-pointer hover:font-semibold">3 stars or more
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Bouton pour réinitialiser tous les filtres */}
            <Button className="w-full" variant="outline">
                Reset all filters
            </Button>
        </div>
    </aside>
}


const Product = ({ product }: { product: Produit }) => {

    return (
        <div className="space-y-2">
            <Link href={`/product/${product.id}`}>
                <img
                    className="w-full h-auto rounded-lg border-2 border-gray-200"
                    height="250"
                    src={product.imageSrc.url!}
                    style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                    }}
                    width="250"
                    alt={product.imageSrc.alt!}
                />
            </Link>
            <div className="flex justify-between items-center">
                {product.sale && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Sale
                    </span>
                )}
                <div className="flex space-x-1">
                    <span className={cn(product.sale && "line-through text-gray-400", "text-sm")}>
                        {formatPrice(product.price)}
                    </span>
                    {product.sale &&
                        <span className="text-sm font-semibold">
                            {formatPrice(product.priceDiscounted!)}
                        </span>
                    }
                </div>
            </div>
            <h3 className="font-semibold">{product.name}</h3>
        </div >
    );
};