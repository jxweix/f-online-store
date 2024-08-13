"use client"
import { Input } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { SearchIcon } from "./SearchIcon"
import { useRouter } from "next/navigation"
import { fetchDataOther } from "@/api/apiService"
import { useSearch } from "./context"

export const NavSearch = () => {
    const router = useRouter();
    const [data, setData] = useState<any>()
    const { updateData } = useSearch();

    const handleChange = (value: string) => {
        const numericValue = parseFloat(value);
        const isNumber = !isNaN(numericValue);

        let filteredData;

        if (isNumber) {
            filteredData = data.filter((item: any) => {
                const price = item.price;
                return price >= numericValue - 500 && price <= numericValue + 500;
            });
        } else {
            filteredData = data.filter((item: any) =>
                item.nameCategories.toLowerCase().includes(value.toLowerCase())
            );
        }

        updateData(filteredData);
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchDataOther('Products', { other: 'Categories' })

            const transformedData = res.map((item: any) => {
                const newItem = {
                    ...item,
                    "nameCategories": item.Categories.name,
                    "descriptionCategories": item.Categories.description
                };
                delete newItem.Categories;
                return newItem;
            });
            if (transformedData) {
                setData(transformedData)
            }
        }
        fetch();
    }, [])
    return (
        <>
            <Input
                classNames={{
                    base: "max-w-full  h-10",
                    mainWrapper: "w-full h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                onClick={() => router.push('/')}
                onChange={(e) => (handleChange(e.target.value))}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon width={18} height={18} />}
                type="search"
            />
        </>
    )
}