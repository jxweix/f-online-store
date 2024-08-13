import React from 'react'
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";

export const Carditem: React.FC<Props> = ({ value, onChange }) => {
    const handleClick = () => {
        onChange(true);
    };

    return (
        <Card
            isPressable
            className="py-4 max-h-[350px]"
            onPressChange={handleClick}
        >
            <CardHeader className="overflow-visible py-2">
                <Image
                    isBlurred
                    isZoomed
                    alt="Card background"
                    className="object-scale-down rounded-xl "
                    src={value.image_url}
                    width={230}
                    height={200}
                />
            </CardHeader>
            <CardBody
                className="pb-0 pt-[1vh] px-[2vh] flex-col items-start overflow-hidden"
            >
                <h4 className="font-bold text-large pb-1 text-ellipsis overflow-hidden">{value.name}</h4>
                <Chip size='sm' className="text-default-500 text-[12px]">{value.Categories.name}</Chip>
                <div className='grid grid-cols-2 items-center w-full mt-2'>
                    <p className='grid text-[12px] text-default-500'> price </p>
                    <p className="grid justify-items-end text-[20px] uppercase font-bold">
                        {value.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })}
                    </p>
                </div>
            </CardBody>
        </Card>
    );
}