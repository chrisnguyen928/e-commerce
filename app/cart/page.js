'use client'

import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import Link from "next/link"

export default function CartPage() {
    const router = useRouter()
    const { cart, handleIncrementProduct } = useProducts()

    async function createCheckout() {
        try {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL
            const lineItems = Object.keys(cart).map((item, itemIndex) => {
                return {
                    price: item,
                    quantity: cart[item].quantity
                }
            })
            
            const response = await fetch(baseURL + '/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ lineItems })
            })
            const data = await response.json()

            if (response.ok) {
                console.log(data)
                router.push(data.url)
            }
        } catch (err) {
            console.log('Error creating checkout', err.message)
        }
    }

    // calculate total cost of all the items in the cart 
    const total = Object.keys(cart).reduce((acc, curr, currIndex) => {
        // use price_id to find data for product in the cart 
        const cartItems = cart[curr]

        // find the quantity of products in the cart
        const quantity = cartItems.quantity

        // find the cost (in cents) of the product
        const cost = cartItems.prices[0].unit_ammount

        // find total cost
        const totalCost = acc + quantity * cost
    
        return totalCost    
    }, 0)

    return (
        <section className="cart-section">
            <h2>Your Cart</h2>
            {Object.keys(cart).length === 0 && <p>You have no items in your cart</p>}
            <div className="cart-container">
                {Object.keys(cart).map((item, itemIndex) => {
                    const itemData = cart[item]
                    const itemQuantity = itemData?.quantity

                    let imgName = ''

                    if (itemData.name === "The World's Ultimate Coffee Bean") {
                        imgName = 'ultimate-beans'
                    } else if (itemData.name === "Heaven's Matcha") {
                        imgName = 'matcha'
                    } else {
                        imgName = itemData.name.replaceAll(' ', '_')
                    }

                    const imgUrl = 'low_res/' + imgName + '.jpg'

                    return (
                        <div className="cart-item" key={itemIndex}>
                            <img src={imgUrl} alt={imgName + '-img'}/>
                            <div className="cart-item-info">
                                <h3>{itemData.name}</h3>
                                <p>{itemData.description.slice(0, 100)} {itemData.description.length > 100 ? '...' : ''}</p>
                                <h4>${itemData.prices[0].unit_ammount / 100}</h4>
                                <div className="quantity-container">
                                    <p><strong>Quantity</strong></p>
                                    <input type ="number" value={itemQuantity} placeholder="2" onChange={(e) => {
                                        const newValue = e.target.value
                                        handleIncrementProduct(itemData.default_price, newValue, itemData, true)
                                    }} />
                                </div>
                            </div>
                        </div>
                    )
                })}
                <h3><strong>Total: $</strong>{total / 100}</h3>
            </div>
            <div className="checkout-container">
                <Link href={'/'}>
                    <button>&larr; Continue Shopping</button>
                </Link>
                <button onClick={createCheckout}>Checkout &rarr;</button>
            </div>
        </section>
    );
}