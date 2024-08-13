"use client"
import React, { useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Badge } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { fetchData } from '@/api/apiService';
import { NavSearch } from './search';

export const Nav = () => {
    const [itemCount, setItemCount] = useState();
    const router = useRouter();
    const current = usePathname();

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchData('CartItem');
            setItemCount(res.length);
        };
        fetch();

        const inter = setInterval(() => {
            fetch();
        }, 2000)
        return () => clearInterval(inter);
    }, []);

    return (
        <Navbar
            isBordered
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}>
            <NavbarContent className='max-w-[16vh]' justify="start">
                <NavbarBrand className="mr-4">
                    <AcmeLogo />
                    <p className="hidden sm:block font-bold text-inherit">STO</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3">
                    <NavbarItem isActive={current == "/homepage"}>
                        <Link
                            color="foreground"
                            href="/homepage"
                            style={{ color: current === "/homepage" ? "#006FEE" : "" }}
                        >
                            Shop
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" >
                <NavSearch />
                <Badge content={itemCount} color="danger" shape="circle">
                    <Button
                        onClick={() => router.push('./cartpage')}
                        isIconOnly color="default" size='sm' variant="light" radius='full' >
                        <Image width={20} height={20} src="/icons/icon_shop.png" alt="icon" />
                    </Button>
                </Badge>
            </NavbarContent>
        </Navbar>
    );
}
