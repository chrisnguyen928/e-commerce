import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// fetch product info from GET route using server-side logic
export async function getProducts() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    const response = await fetch(baseURL + '/api/products')
    const products = await response.json()

    return products
}

export default async function Home() {
    // access product info
    const products = await getProducts()
    
    let coffeeBean = null
    let matcha = null
    let equipments = []

    for (let product of products) {
        if (product.name === "The World's Ultimate Coffee Bean") {
            coffeeBean = product
            continue
        }

        if (product.name === "Heaven's Matcha") {
            matcha = product
            continue
        }

        equipments.push(product)
    }

    return (
        <>
            <ImageBanner />
            <section>
                <Products coffeeBean={coffeeBean} matcha={matcha} equipments={equipments} />
            </section>
        </>
    )
}