'use client'

import React from 'react'
import Link from 'next/link'
import { useProducts } from '@/context/ProductContext'

// NextJS renders the app server-sided instead of client-sided like React, which does not allow user interactivity
// To handle this, we add 'use client' at the top of the file to tell NextJS to render this component client-sided

export default function Cart() {
    const { cart } = useProducts()

    // to calculate total number of products in carts, we need to use the reduce method
    // Since the cart is an object with key-value pairs, we need to make it into an array of just the keys, 
    // which contains only the products
    // reduce method receives 2 arguments, annonymous arrow function and a default value
    // the arrow function takes 3 arguments, accumulator, current value, and current index
    const numProducts = Object.keys(cart).reduce((acc, curr, currIndex) => {
        // acc maps over every entity in array and whatever we return from one iteration from reduce method, 
        // becomes the acc in next instance

        // curr represents price id
        const numProduct = cart[curr].quantity
        const sum = acc + parseInt(numProduct)
        return sum
    }, 0)

    return (
        <div>
            <Link className="unstyled-button" href={'/cart'}>
                <i className="fa-solid fa-cart-shopping"></i>
                {numProducts > 0 && (
                    <div className="cart-num">
                        <p>{numProducts}</p>
                    </div> 
                )}
            </Link>
        </div>
    )
}
