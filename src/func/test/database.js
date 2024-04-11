import {supabase} from "@lib/supabase"

export async function getTest() {
    const {data, error} = await supabase.from("Test").select()

    if (error) {
        console.error(error)
        throw Error("Failed to fetch Test")
    }

    return data
}

export async function getPageVisitCount() {
    const {data, error } = await supabase.from("Test").select("page_visit_count")
    if (error) {
        console.error(error)
        throw Error("Failed to fetch page_visit_count from 'Test'")
    }

    return data[0].page_visit_count
}

export async function pageVisited() {

    const visitCount = await getPageVisitCount()

    const { data, error } = await supabase.from("Test").update({page_visit_count: visitCount + 1}).eq('id', 1).select()

    if (error) {
        console.error(error)
        throw Error("Failed to fetch Test")
    }

    return data
}

