'use client'

import React from 'react'
import { useState } from 'react'
import Modal from './Modal.jsx'
import { useProducts } from '@/context/ProductContext.jsx'

export default function Products(props) {
    const { coffeeBean, matcha, equipments } = props
    const [modalImage, setModalImage] = useState(null)

    const { cart, handleIncrementProduct } = useProducts()
    console.log(cart)

    // if equipments.length = 0 or we don't have coffeeBean or we don't have matcha, we return nothing
    if (!equipments.length || !coffeeBean || !matcha) {
        return null
    }

    return (
        <>
            {modalImage && (
                <Modal handleCloseModal={() => {
                    setModalImage(null)
                }}>
                    <div className="modal-content">
                        <img className="img-display" src={`med_res/${modalImage}.jpg`} alt={`${modalImage}-high-res`} />
                    </div>
                </Modal>
            )}
            <div className="section-container">
                <div className="section-header">
                    <h2>Shop Our Inventory</h2>
                    <p>Buy our products to make your perfect coffee and matcha</p>
                </div>

                <div className="caffeine-container">
                    <div>
                        <button className="img-button" onClick={() => {
                            setModalImage('ultimate-beans')
                        }}>
                            <img src="low_res/ultimate-beans.jpg" alt="high-res-ultimate-beans"></img>
                        </button>
                    </div>
                    <div className="caffeine-info">
                        <p className="text-large caffeine-header">
                           The World's Ultimate Coffee Bean
                        </p>
                        <h3><span>$</span>17.99</h3>
                        <p>Have a taste of the best coffee beans in the <strong>universe</strong>!
                        Start off your day strong with the undisputed <strong>number 1</strong> coffee beans in the entire world.
                        This will surely keep you awake and may increase your caffeine limit to its breaking point. 
                        This coffee bean is so good that you will go to <strong>heaven</strong>...</p>
                        <ul>
                            <li><strong>Flavor Profile</strong>: Chocolate, Bourbon, and Blueberry</li>
                            <li><strong>Roast</strong>: Robusta</li>
                        </ul>
                        <div className="purchase-btns">
                            <button onClick={() => {
                                const coffeeBeanPriceId = coffeeBean.prices[0].id
                                handleIncrementProduct(coffeeBeanPriceId, 1, coffeeBean)
                            }}>Add to Cart</button>
                        </div>
                    </div>

                    <div>
                        <button className="img-button" onClick={() => {
                            setModalImage('matcha')
                        }}>
                            <img src="low_res/matcha.jpg" alt="high-res-matcha"></img>
                        </button>
                    </div>
                    <div className="caffeine-info">
                        <p className="text-large caffeine-header">
                            Heaven's Matcha
                        </p>
                        <h3><span>$</span>9.99</h3>
                        <p>The strongest matcha in the <strong>realm</strong>! 
                        Normally, a small ceremonial tin of matcha would cost you up to $60, but at Caffeine Heaven, we offer
                        our matcha at such a low price. What a steal! You can get the best matcha in our dimension for less than $10.
                        A taste of this delicious matcha will send you to the <strong>Japanese gods</strong>...</p>
                        <ul>
                            <li><strong>Grade</strong>: Ceremonial</li>
                            <li><strong>Place of Origin</strong>: Kyoto</li>
                        </ul>
                        <div className="purchase-btns">
                            <button onClick={() => {
                                const matchaPriceId = matcha.prices[0].id
                                handleIncrementProduct(matchaPriceId, 1, matcha)
                            }}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-container">
                <div className="section-header">
                    <h2>Check Out Our Equipments</h2>
                    <p>Choose the right equipment to make your perfect drink</p>
                </div>
                <div className="equipment-container">
                    {equipments.map((equipment, equipmentIndex) => {
                        const equipmentName = equipment.name
                        const equipmentImgUrl = equipment.name.replaceAll(' ', '_')
                        return (
                            <div className="equipment-card" key={equipmentIndex}>
                                <button className="img-button" onClick={() => {
                                    setModalImage(equipmentImgUrl)
                                }}>
                                    <img src={`low_res/${equipmentImgUrl}.jpg`} alt={`${equipmentImgUrl}-low-res`} />
                                </button>
                                <div className="equipment-info">
                                    <p className="text-medium">{equipmentName}</p>
                                    <p>{equipment.description}</p>
                                    <h4><span>$</span>{equipment.prices[0].unit_ammount / 100}</h4>
                                    <button onClick={() => {
                                        const equipmentPriceId = equipment.default_price
                                        handleIncrementProduct(equipmentPriceId, 1, equipment)
                                    }}>Add to Cart</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
