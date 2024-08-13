"use client"
import React from 'react'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, Button, Input, Avatar } from "@nextui-org/react";
import { deleteData } from '@/api/apiService';
import { DeleteDocumentIcon } from './iconDelete';

export const TableCompo: React.FC<TableProps> = ({ data, columns, setData, upData }) => {
    const handleDelete = (table: string, colData: string, valueData: any) => async () => {
        try {
            await deleteData(table, { col: colData, value: valueData });
            alert('Deletion successful');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleAmountChange = async (e: any, cartId: any) => {
        const newValue = e.target.value;

        setData((prevData) => {
            const updatedData = prevData.map((item) =>
                item.cart_id === cartId
                    ? {
                        ...item,
                        amount: newValue,
                        total_price: item.price * newValue,
                    }
                    : item
            );
            return updatedData;
        });
    };

    const renderCell = React.useCallback((data: any, columnKey: any) => {
        const cellValue = data[columnKey];

        switch (columnKey) {
            case "no":
                return (
                    <Avatar
                        size='lg'
                        radius='sm'
                        src={data.image_url}
                    />
                );
            case "amount":
                return (
                    <Input
                        className='w-[100px]'
                        type='number'
                        value={data.amount}
                        min={1}
                        onChange={(e) => handleAmountChange(e, data.cart_id)} >
                        {data.amount}
                    </Input>
                )
            case "price":
                return (
                    <>
                        {data.price.toLocaleString('th-TH',
                            { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })}
                    </>
                )
            case "total_price":
                return (
                    <>
                        {data.total_price.toLocaleString('th-TH',
                            { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })}
                    </>
                )
            case "actions":
                return (
                    <div className="flex items-center">
                        <Button
                            isIconOnly
                            color='danger' size="lg" variant="light"
                            onPress={handleDelete('CartItem', 'cart_id', data.cart_id)}
                        >
                            <DeleteDocumentIcon />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="flex flex-col gap-3">
                <Table
                    aria-label="Selection behavior table example with dynamic content"
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn className='max-w-[200px] justify-items-center' key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={data}>
                        {(data) => (
                            <TableRow key={data?.cart_id}>
                                {(columnKey) => <TableCell>{renderCell(data, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}