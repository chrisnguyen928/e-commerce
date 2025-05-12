import Stripe from 'stripe'
import '../../../envConfig'

const API_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY, {
    apiVersion: '2023-10-16'
})

// note: route syntax is specific to app route, making endpoints in page.js uses different syntax and utilizes handler functions
export async function GET() {
    try {
        // fetch all active product from Stripe
        const products = await stripe.products.list({ active: true })

        // fetch all active price id
        const prices = await stripe.prices.list({ active: true })

        // combine products and associated price id
        const combinedData = products.data.map((product) => {
            const productPrices = prices.data.filter((price) => {
                // only return prices if price matches product id
                return price.product === product.id
            })

            // return an object containing all products and prices
            return {
                ...product,
                prices: productPrices.map((price) => {
                    // filter out any irrelevant info and show price info we only need
                    return {
                        id: price.id,
                        unit_ammount: price.unit_amount,
                        currency: price.currency,
                        recurring: price.recurring
                    }
                })
            }
        })

        // send combined data as json
        return Response.json(combinedData)

    } catch (err) {
        console.error('Error fetching data from Stripe: ', err.message)
        return Response.json({error: 'Failed to fetch data from Stripe'})
    }
}