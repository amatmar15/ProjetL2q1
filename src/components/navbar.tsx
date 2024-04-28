"use client"

import { Link as LinkIcon } from "lucide-react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Searchbar } from "./searchbar"
import NavItems from "./navitems"
import { Button } from "./ui/button"
import Link from "next/link"
import { UserButton, useAuth } from "@clerk/nextjs"
import Cart from "./cart"

const Navbar = () => {

    const { isSignedIn } = useAuth()
    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 border-b border-gray-200">
            <header className="relative">
                <MaxWidthWrapper className="md:px-0 px-0">
                    <div>
                        <div className="flex h-16 2xl:h-[4.2vw] items-center justify-between">
                            <div className="hidden lg:flex ml-4 ">
                                <Link href="/">
                                    <LinkIcon >
                                        <a href="#" className="opacity-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" fill="black" /></svg>
                                        </a>
                                    </LinkIcon>
                                </Link>
                            </div>
                            <div className="ml-0 lg:ml-[15vw] xl:ml-80 pr-0 flex items-center z-50 px-10">
                                <NavItems name={"PRODUCT"} repo={"product"} />
                                <NavItems name={"ABOUT US"} repo={"about-us"} />
                                <NavItems name={"CONTACT"} repo={"contact"} />
                            </div>
                            <div className="flex pr-0 items-center justify-between">
                                <Searchbar />
                                <div className="flex h-16 2xl:h-[4.2vw]  border-l border-gray-200 items-center px-3">
                                    {isSignedIn ?
                                        <UserButton afterSignOutUrl="/" />
                                        :
                                        <Link href="/auth">
                                            <Button>
                                            
                                                Sign Up
                                            
                                            </Button>
                                        </Link>
                                    }
                                </div>
                                <div className="flex h-16 2xl:h-[4.2vw]  border-l border-gray-200 items-center pr-3 pl-3">
                                    <Cart />
                                </div>
                            </div>
                        </div>

                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}

export default Navbar