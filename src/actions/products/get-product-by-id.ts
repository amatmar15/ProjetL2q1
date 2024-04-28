import payload from "payload"

export const getProductByID = async ({ id }: { id: string }) => {
    try {
        const doc = await payload.findByID({
            collection: "Produits",
            id: id
        })
        return doc
    } catch (e) {
        return null
    }
}