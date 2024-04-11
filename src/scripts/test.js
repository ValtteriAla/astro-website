export async function getTest() {
    return (await fetch("/api/test.json")).json()
}