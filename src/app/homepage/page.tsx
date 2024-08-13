"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { fetchDataOther } from '@/api/apiService'
import { Carditem } from '@/components/cartitem/card';
import { Cartdetail } from '@/components/cartdetail/cartdetail';
import { ScrollShadow } from '@nextui-org/react';
import { shuffleArray } from './shuffle';

function Page() {
    const [data, setData] = useState<any>([])
    const [externalBool, setExternalBool] = useState(false);
    const [selectedId, setSelectedId] = useState<number>(1)

    const handleBooleanChange = (newValue: boolean) => {
        setExternalBool(newValue);
    };

    const handleCardItemClick = (id: number) => {
        setSelectedId(id);
        handleBooleanChange(true);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchDataOther('Products', { other: 'Categories' });
                if (res) {
                    const shuffled = shuffleArray([...res]);
                    setData(shuffled);
                }
            } catch (error) {
                throw error
            }
        };
        loadData();
    }, [])

    return (
        <>
            <div className='grid grid-cols-4 p-6'>
                {/* <div className='grid border-e-1 border-[#959595]'></div> */}
                <ScrollShadow
                    hideScrollBar
                    className={`grid ${externalBool ? 'col-span-2' : 'col-span-4'} h-[89vh]`}>

                    <div className={`${externalBool ? 'flex px-[2vh]' : 'flex px-[4vh]'} 
                     flex-wrap col-span-2 justify-items-center gap-4`} >
                        {data.map((item: any) => (
                            <Carditem
                                key={item.product_id}
                                value={item}
                                onChange={() => handleCardItemClick(item.product_id)}
                            />
                        ))}
                    </div>
                </ScrollShadow>
                {externalBool && (
                    <div className='grid col-span-2'>
                        <Cartdetail
                            value={selectedId}
                            onChange={handleBooleanChange} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Page