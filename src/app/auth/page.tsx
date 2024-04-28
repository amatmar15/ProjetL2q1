import Image from "next/image";
import Link from "next/link";
import componentsImg from "./assets/components.svg";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="">
            <article className="grid lg:grid-cols-2">
                <div className="px-8 py-20 md:px-20 lg:py-48">
                    <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient">
                        Bienvenue à Ecopower Drive
                    </h1>
                    <p className="mt-2 text-lg">
                        Votre voyage vers une mobilité durable commence ici.
                    </p>
                    <div className="flex gap-2 mt-8">
                        <Link
                            href="/auth/sign-in"
                            className="flex content-center gap-2 px-4 py-2 font-semibold text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
                            style={{ background: "#6C47FF" }}

                       >
                            Sign-in
                            <div className="m-auto">
                                <ArrowRight />
                            </div>
                        </Link>
                        <a
                            className="flex gap-2 px-4 py-2 font-semibold text-gray-600 transition duration-100 rounded-lg hover:text-gray-800"
                            href="#foot"
                        >
                            savoir plus
                            <div className="m-auto">
                                <ArrowDown />
                            </div>
                        </a>
                    </div>
                </div>
                {/* <div className="flex flex-col justify-center"> */}
                {/* <Image src="/acceuil.png" width={650} height={300} alt="Clerk embeddable components" /> */}
                {/* </div> */}
            </article>

        </main>
    );
}
