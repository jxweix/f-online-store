"use client"
import { createContext, ReactNode, useContext, useState } from "react";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<any>();
    const updateData = (searchData: any) => {
        setData(searchData);
    };

    return (
        <SearchContext.Provider value={{ data, updateData }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch some error');
    }
    return context;
};