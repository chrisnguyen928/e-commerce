'use client'

import React from 'react'
import { useState, useContext, createContext } from 'react'

const ProductContext = createContext()

export default function ProductsProvider(props) {
    const { children } = props

    const [cart, setCart] = useState({})

    function handleIncrementProduct(price_id, num, data, noIncrement = false) {
        const newCart = {
            ...cart
        }

        if (price_id in cart) {
            // if product in cart, take previous value associated with product, and increment it however more or less
            // each price_id is associated with the current data (which will help us not have to fetch product data again on the cart page),
            // and quantity of how much of each product is in the cart
            // if noIncrement is true, assign quantity to new value, if false, increment/decrement previous value
            newCart[price_id] = {
                ...data,
                quantity: noIncrement ? num : newCart[price_id]?.quantity + num
            }
        } else {
            // if we don't have product in cart, add it to cart object and set quanitity to equal the ammount added
            newCart[price_id] = {
                ...data,
                quantity: num
            }
        }
        
        if (parseInt(newCart[price_id].quantity) <= 0) {
            // if user sets the amount of product to 0, remove product from cart
            delete newCart[price_id]
        }

        // overwrite previous cart state with new cart object
        setCart(newCart)
    }

    const value = {
        cart,
        handleIncrementProduct
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)
