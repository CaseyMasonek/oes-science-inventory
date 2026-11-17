"use client"

import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {createClient} from "@/lib/supabase/client";

type ItemsResponse = {
    items: {data: {
        id: string;
        name: string;
        room: string;
        drawer_label: string;
        notes: string[];
    }[] | null};
};

export default function DisplayData()
{
    const [searchTerm,setSearchTerm] = useState<string>('')
    const [searchValue] = useDebounce(searchTerm, 500)

    const [items,setItems] = useState([]);

    const supabase = createClient()

    useEffect(() => {
        (async () => {
            supabase.from('items')
                .select('*')
                .ilike('name',`%${searchValue}%`)
                .limit(100)
                .then(({ data, error }) => {
                if (error) {
                    console.error('Supabase error:', error);
                    return;
                }
                console.log(data, "!");
                // @ts-ignore
                    setItems(data ?? []);
            });
        })()
    },[searchValue,supabase])

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