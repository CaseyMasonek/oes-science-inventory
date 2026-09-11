import { createClient } from '@/utils/supabase/server'

export default async function Page() {
    const supabase = await createClient()
    const a = await supabase.from('items').select()

    return (
        <div className={"p-3"}>
            {a.data?.map((item) => (
                <div key={item.id} className={"my-2 p-5 border-2 rounded-xl"}>
                    <b>{item.name}</b>
                    <p>{item.room} {item.drawer_label && (<em>
                        - Drawer label: {item.drawer_label}
                    </em>)}</p>
                    <p className={"mt-2"}>{item.notes}</p>
                </div>
            ))}
        </div>
    )
}