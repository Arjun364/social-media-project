import React from 'react'
import { Flowbite, Footer } from "flowbite-react";

const FooterSection = () => {
    const customTheme = {
        "footer": {
            "root": {
                "base": "w-full bg-slate-100 shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
                "container": "w-full p-6",
                "bgDark": "bg-gray-800"
            },
            "groupLink": {
                "base": "flex flex-wrap text-sm text-gray-500 dark:text-white",
                "link": {
                    "base": "me-4 last:mr-0 md:mr-6",
                    "href": "hover:underline"
                },
                "col": "flex-col space-y-4"
            },
            "icon": {
                "base": "text-gray-500 dark:hover:text-white",
                "size": "h-5 w-5"
            },
            "title": {
                "base": "mb-6 text-sm font-semibold uppercase text-gray-500 dark:text-white"
            },
            "divider": {
                "base": "my-6 w-full border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8"
            },
            "copyright": {
                "base": "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
                "href": "ml-1 hover:underline",
                "span": "ml-1"
            },
            "brand": {
                "base": "mb-4 flex items-center justify-center md:justify-start sm:mb-0",
                "img": "mr-3 h-8",
                "span": "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white"
            }
        }
    }
    return (
        <Flowbite theme={{theme:customTheme}}>
            <Footer container>
                <div className="w-full">
                    <div className="grid w-full justify-center gap-8 sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div className='flex flex-col md:gap-2'>
                            <Footer.Brand
                                href="/"
                                name="Connetify"
                            />
                            <p className='text-sm text-center md:text-left max-w-[30rem] text-slate-800 dark:text-gray-400 px-[1rem]'>
                            At Connetify, our goal is to provide a space for communities with shared passions to connect, grow, and thrive together. Built with our users in mind, we foster a supportive environment focused on learning and collaboration.
                            </p>
                        </div>
                        <div className="grid  justify-center gap-8 sm:mt-4 grid-cols-3 sm:gap-6">
                            <div>
                                <Footer.Title title="about" />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="">Our mission</Footer.Link>
                                    <Footer.Link href="">Our team</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Follow us" />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="">instagram</Footer.Link>
                                    <Footer.Link href="">Discord</Footer.Link>
                                    <Footer.Link href="">twitter</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Legal" />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="">Privacy Policy</Footer.Link>
                                    <Footer.Link href="">Terms &amp; Conditions</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright href="#" by="Connetify™" year={2024} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">

                        </div>
                    </div>
                </div>
            </Footer>
        </Flowbite>
    )
}

export default FooterSection