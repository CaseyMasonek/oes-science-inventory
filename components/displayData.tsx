"use client"

import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useDebounce} from "use-debounce";

type ItemsResponse = {
    items: {data: {
        id: string;
        name: string;
        room: string;
        drawer_label: string;
        notes: string[];
    }[] | null};
};

export default function DisplayData(itemsResponse: ItemsResponse)
{
    const [searchTerm,setSearchTerm] = useState<string>('')
    const [searchValue] = useDebounce(searchTerm, 500)

    const items = itemsResponse?.items.data ?? [];

    return (
        <div>
            <div className={"p-3 h-[30vh] bg-[#2a644a] flex flex-col items-center justify-center space-y-15"}>
                <h1 className={"text-5xl text-white"}>OES Science Inventory</h1>
                <Input placeholder={"Search..."} className={"bg-white w-1/2 scale-150"} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className={"grid grid-cols-3"}>
                {items.map((item) => (
                    <>{item.name?.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 &&
                        <div key={item.id} className={"py-4 p-5 hover:bg-accent border-b-1 border-r-1 border-dotted"}>
                            <b>{item.name}</b>
                            <p>{item.room} {item.drawer_label && (<em>
                                - {item.drawer_label}
                            </em>)}</p>
                            <p className={"mt-2"}>{item.notes}</p>
                        </div>
                    }</>
                ))}
            </div>
            {(items.filter((item) => (item.name.toLowerCase()?.indexOf(searchValue.toLowerCase()) !== -1))).length == 0 &&
                <div className={"w-full h-[70vh] flex justify-center items-center"}><p className={"p-3 text-2xl"}>No results.</p></div>}
        </div>
    )
}