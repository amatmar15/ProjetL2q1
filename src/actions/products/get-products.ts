import payload from "payload"

export const getProducts = async () => {
    const { docs } = await payload.find({
        collection: "Produits"
    })
    return docs
}