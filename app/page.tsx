import { createClient } from '@/utils/supabase/server'
import DisplayData from "@/components/displayData";

export default async function Page() {
    const supabase = await createClient()
    const items = await supabase.from('items').select()

    return <DisplayData items={items} />
}