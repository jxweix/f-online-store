type Products = {
    product_id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    stock_quantity: number;
    image_url: string;
    Categories: any;
}

type Props = {
    value: Products;
    onChange: (value: boolean) => void;
};

type Cartdetail = {
    value: Number;
    onChange: (value: boolean) => void;
};

type CartItem = {
    cart_id: Number;
    product_id: Number;
    amount: Number;
}

type Cart = {
    cart_id: number;
    product_id: number;
    amount: number;
    name: string;
    price: number;
    total_price: number;
    image_url: string;
    category_id: number;
    description: string;
    stock_quantity: number;
};

interface TableProps {
    data: any[];
    columns: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    upData: any;
}


interface SearchContextType {
    data: any[];
    updateData: (searchData: any[]) => void;
}