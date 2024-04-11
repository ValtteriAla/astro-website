import { getTest } from "@func/test/database"

export const GET = async ({ params, request }) => {

    const data = await getTest()
    return new Response(JSON.stringify({
        message: "OK",
        data: data
      })
    )
  }
  