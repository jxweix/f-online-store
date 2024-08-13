"use client"
import Images from 'next/image';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { fetchData, fetchDataOther, postData, upData } from '@/api/apiService';

export const Cartdetail: React.FC<Cartdetail> = ({ value, onChange }) => {
    const [data, setData] = useState<any>([]) //product
    const [cart, setCart] = useState<any>([])
    const [detail, setDetail] = useState<Products>()
    const [amount, setAmount] = useState<any>(1)

    const handleCart = async () => {
        const findId = await cart.find((item: any) => item.product_id === detail?.product_id)
        if (amount >= 1) {
            if (findId) {
                // ถ้าเจอ product ที่มี product_id เดียวกันในตะกร้า
                await upData('CartItem', [{
                    "cart_id": findId?.cart_id,
                    "product_id": detail?.product_id,
                    "amount": findId?.amount + amount
                }]);
                alert('ใส่ตะกร้าแล้ว');
            } else {
                // ถ้าไม่เจอ product ที่มี product_id เดียวกันในตะกร้า
                await postData('CartItem', [{
                    "product_id": detail?.product_id,
                    "amount": amount
                }]);
                alert('ใส่ตะกร้าแล้ว');
            }
        } else {
            alert('เกิดข้อผิดพลาด: ไม่สามารถใส่จำนวนติดลบ หรือ เครื่องหมายในช่องนี้ได้');
        }
    }

    const handleClick = () => {
        onChange(false);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        if (parseInt(input.value, 10) < 0) {
            input.value = "0"; // ปรับค่าเป็น 0 ถ้าค่าติดลบ
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchDataOther('Products', { other: 'Categories' });
                setData(res);
                const data = await fetchData('CartItem');
                setCart(data)
            } catch (error) {
                throw error
            }
        };
        loadData();
    }, [cart])

    useEffect(() => {
        if (value !== null) {
            const filter = data.find((item: any) => item.product_id === value);
            setDetail(filter);
        }
    }, [data, value]);

    return (
        <Card>
            <CardHeader>
                <div className='grid items-center w-full gap-2'>
                    <div className='grid justify-items-end'>
                        <Button
                            isIconOnly
                            variant='light'
                            radius='full'
                            onPressChange={handleClick}
                        >
                            <Images
                                src="/icons/icon_close.png"
                                alt="Vercel"
                                className="dark:invert"
                                width={15}
                                height={15}
                                priority
                            />
                        </Button>
                    </div>
                </div>

            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className='grid w-full justify-items-center'>
                    <Image
                        isBlurred
                        alt="Card background"
                        className="grid object-scale-down rounded-xl"
                        src={detail?.image_url}
                        height={550}
                    />
                </div>
                <div className='grid grid-rows-3 grid-cols-2 items-center w-full mt-2 px-[3vh] pt-[3vh]'>
                    <div className='grid col-span-2'>
                        <span className='flex gap-2 items-center'>
                            <p className="text-[20px] font-bold">{detail?.name}</p>
                            <Chip size='sm' className='text-[12px]'>{detail?.Categories.name}</Chip>
                        </span>
                    </div>
                    <div className='grid justify-items-start'>
                        <p className='grid text-[12px] text-default-500'> Stock </p>
                        <p className="grid justify-items-end text-[20px] uppercase font-bold">{detail?.stock_quantity} ฿</p>
                    </div>
                    <div className='grid justify-items-end row-span-1'>
                        <p className='grid text-[12px] text-default-500'> Price </p>
                        <p className="grid justify-items-end text-[20px] uppercase font-bold">
                            {detail?.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })}
                        </p>
                    </div>

                    <div className='grid justify-items-start col-span-2'>
                        <p className='grid text-[12px] text-default-500'>{detail?.description}</p>
                    </div>
                </div>
            </CardBody>
            <CardFooter className='grid grid-cols-3 pb-[2vh] '>
                <p className='grid col-span-3 justify-items-start items-end h-full text-[12px] pb-2 pl-8 text-[#cccccc]'>Amount</p>
                <div className='col-span-3 flex gap-x-[2vh] px-[2vh]'>
                    <Input
                        name='amount'
                        className='justify-start w-full m-0'
                        classNames={{
                            input: 'w-full min-w-[20vh]'
                        }}
                        type='number'
                        size='md'
                        min={1}
                        value={amount}
                        onInput={(e) => handleInput(e)}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <Button
                        className='w-full min-w-[25vh] dark grid'
                        isIconOnly
                        color='primary'
                        variant='ghost'
                        onClick={handleCart}
                    >
                        <Images
                            src="/icons/icon_shop.png"
                            alt="Vercel"
                            width={20}
                            height={20}
                            priority
                        />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}