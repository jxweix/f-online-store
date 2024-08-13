"use client"
import React, { useEffect, useRef, useState } from 'react'
import { fetchData, fetchDataOther, upData } from '@/api/apiService';
import { TableCompo } from '@/components/table/table';
import { Card, CardBody, Image } from '@nextui-org/react';

function Page() {
    const [data, setData] = useState<Cart[]>([])
    const [itemCount, setItemCount] = useState();
    const [total, setTotal] = useState<number>(0);

    const prevDataRef = useRef(data);

    const columns = [
        {
            key: "no",
            label: "No",
        },
        {
            key: "name",
            label: "Name",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "price",
            label: "Price",
        },
        {
            key: "total_price",
            label: "Total Price",
        },
        {
            key: "actions",
            label: "Actions",
        },
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await fetchDataOther('CartItem', { other: 'Products' });
                if (res) {
                    const transformedData = res.map((item: any) => {
                        const newItem = {
                            ...item,
                            ...item.Products
                        };
                        delete newItem.Products;
                        return newItem;
                    });
                    const aggregatedData = transformedData.reduce((acc: any[], currentItem: any) => {
                        const existingItem = acc.find((item) => item.product_id === currentItem.product_id);
                        if (existingItem) {
                            existingItem.amount += currentItem.amount;
                            existingItem.total_price += currentItem.price * currentItem.amount; // รวม amount
                        } else {
                            acc.push({
                                ...currentItem,
                                total_price: currentItem.price * currentItem.amount
                            }); // เพิ่ม item ใหม่
                        }
                        return acc;
                    }, []);

                    const sumTotal = aggregatedData.reduce((sum: any, item: any) => sum + item.total_price, 0);
                    setTotal(sumTotal ?? 0)

                    // ตั้งค่าข้อมูลที่รวมแล้ว
                    setData(aggregatedData);
                    setItemCount(res.length)
                }
            } catch (error) {
                throw error
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const format = data.map((item) => ({
                    cart_id: item.cart_id,
                    product_id: item.product_id,
                    amount: Number(item.amount),
                }));

                const res = await upData('CartItem', format);
                if (Array.isArray(res)) {
                    setData(res);
                }

            } catch (error) {
                console.error('Error updating data:', error);
            }
        };
        const prevData = prevDataRef.current;
        const hasAmountChanged = data.some(
            (item, index) => item.amount !== prevData[index]?.amount
        );

        if (hasAmountChanged) {
            fetchData();
        }
    }, [data]);

    return (
        <>
            <div className="flex flex-col gap-3 p-[7vh] py-[2vh]">
                <Card>
                    <CardBody >
                        <div className='flex space-x-[2vh] items-center px-2'>
                            <Image radius='none' src='./icons/icon_shop.png' width={30} />
                            <p className='uppercase text-[25px]'>Shopping Cart</p>
                        </div>
                    </CardBody>
                </Card>
                <TableCompo data={data} columns={columns} setData={setData} upData={upData} />
                <Card>
                    <CardBody >
                        <div className='grid grid-cols-2'>
                            <div className='flex space-x-[2vh] items-center px-2'>
                                <Image radius='none' src='./icons/icon_shop.png' width={30} />
                                <p className='text-[18px]'>Seclet ({itemCount})</p>
                            </div>
                            <div className='flex justify-end items-center pr-[2vh]'>
                                <p className='text-[18px]'>Total ({itemCount}) :</p>
                                <p className='text-[23px] text-primary px-2'>
                                    {total.toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Page