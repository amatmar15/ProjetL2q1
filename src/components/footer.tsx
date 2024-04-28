import {Input} from "@/components/ui/input"; // Import du composant Input depuis le répertoire des composants UI
import {Button} from "@/components/ui/button";
import {SVGProps} from "react"; // Import des types SVGProps depuis React pour les fonctions des icones

const Footer = () => { // Définition du composant Footer
    return (<footer // Pied de page
            style={{
                backgroundColor: "white",
                padding: "1.3rem",
                marginTop: "2rem",
                textAlign: "center",
                border: "1px solid lightgrey",
            }}>

            <div className="py-10 px-4 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

                    <div className="text-center"> {/* 1er element livraison */}
                        <div className="mb-2">
                            <TruckIcon className="h-6 w-20 mx-auto"/>
                        </div>
                        <h5 className="text-lg font-semibold">QUICK DELIVERY</h5>
                        <p className="text-sm">Wide choice of delivery</p>
                    </div>

                    <div className="text-center">  {/* 2e element paiment */}
                        <div className="mb-2">
                            <CreditCardIcon
                                className="h-6 w-20 mx-auto"/>
                        </div>
                        <h5 className="text-lg font-semibold">SECURE PAYMENT</h5>
                        <p className="text-sm">Various payment methods</p>
                    </div>

                    <div className="text-center"> {/* 3e element client */}
                        <div className="mb-2">
                            <UserIcon
                                className="h-6 w-20 mx-auto"/>
                        </div>
                        <h5 className="text-lg font-semibold">CUSTOMER SERVICE</h5>
                        <p className="text-sm">shop@l2q1.fr</p>
                    </div>

                    <div className="mt-8 xl:mt-0 xl:col-span-1 text-center"> {/* 4e element newsletter */}
                        <h2 className="text-lg font-semibold">OUR NEWSLETTER</h2>
                        <p className="text-sm">Stay informed of our news & offers</p>
                        <form className="mt-4 sm:flex sm:max-w-md">
                            <label className="sr-only" htmlFor="email-address">
                                Your email address
                            </label>
                            <Input
                                className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs"
                                placeholder="Your email address"
                                type="email"
                            />
                            {/* Champ d'entrée d'adresse e-mail avec styles spécifiques */}
                            <Button className="bg-white w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0" variant="outline">OK !</Button>
                        </form>
                    </div>

                </div>

                <div className="mt-10"><p>L2Q1 - Programming project 2024</p></div>

            </div>
        </footer>


    )
}

export default Footer // Exporte le composant Footer par défaut (implémenté layout)

// Définition du composant fonctionnel de l'icone de la carte de credit avec les propriétés SVG
function CreditCardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
    )
}

// Icone de l'utilisateur
function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}

// Icone de l'icone camion
function TruckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/>
            <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/>
            <circle cx="7" cy="18" r="2"/>
            <path d="M15 18H9"/>
            <circle cx="17" cy="18" r="2"/>
        </svg>
    )
}