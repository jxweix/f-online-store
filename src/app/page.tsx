"use client"
import { Cartdetail } from "@/components/cartdetail/cartdetail";
import { Carditem } from "@/components/cartitem/card";
import { useSearch } from "@/components/navbar/context";
import { SearchIcon } from "@/components/navbar/SearchIcon";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { data } = useSearch();
  const [fomat, setFormat] = useState<any[]>();
  const [externalBool, setExternalBool] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(1)

  useEffect(() => {
    if (data) {
      const transformedData = data.map((item: any) => {
        const newItem = {
          ...item,
          Categories: {
            name: item.nameCategories,
            description: item.descriptionCategories
          }
        };
        delete newItem.nameCategories, newItem.descriptionCategories;
        return newItem;
      });

      if (transformedData) {
        setFormat(transformedData)
      }
    }
  }, [data])

  const handleBooleanChange = (newValue: boolean) => {
    setExternalBool(newValue);
  };

  const handleCardItemClick = useCallback((productId: number) => {
    return () => {
      setSelectedId(productId);
      handleBooleanChange(true);
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 p-6">
        <ScrollShadow
          hideScrollBar
          className={`grid ${externalBool ? 'col-span-2' : 'col-span-4'} h-[89vh]`}>

          {fomat && fomat.length > 0 ? (
            <div className={` ${externalBool ? `flex grow px-[9vh]` : 'flex px-[6vh]'}  flex-wrap gap-4 justify-items-center `}>
              {fomat?.map((item: any, index: number) => (
                <Carditem
                  key={item.product_id}
                  value={item}
                  onChange={handleCardItemClick(item.product_id)}
                />
              ))}
            </div>
          ) : (
            <>
              <Card className='max-h-[4.5vh] items-center'>
                <CardBody>
                  <div className="flex flex-nowrap items-center space-x-4 pl-4">
                    <SearchIcon width={18} height={18} />
                    <p>Please enter what you are looking for...</p>
                  </div>
                </CardBody>
              </Card>
            </>
          )}

        </ScrollShadow>
        {externalBool && (
          <div className='grid col-span-2 row-span-1'>
            <Cartdetail
              value={selectedId}
              onChange={handleBooleanChange} />
          </div>
        )}
      </div>
    </>
  );
}