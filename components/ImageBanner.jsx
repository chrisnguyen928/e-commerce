'use client'

import React from 'react'
import { useState, useRef, useEffect } from 'react'

export default function ImageBanner() {
    const [isLoaded, setIsLoaded] = useState(false)
    const imgRef = useRef()

    useEffect(() => {
        if (imgRef.current.complete) {
            setIsLoaded(true)
        }
    }, [])

    return (
        <div className="banner-images">
            <img className="low-res-img" src="low_res/banner.jpg" alt="banner-low-res" />
            <img className="high-res-img" src="med_res/banner.png" alt="banner-high-res" ref={imgRef} style={{opacity: isLoaded ? 1 : 0}}
            onLoad={() => {
                // when the high resolution img is completely loaded, callback function is executed and makes high
                // resolution image visible
                setIsLoaded(true)
            }}/>
            <div className="cta-btns-container">
                <div>
                    <div>
                        <h3>Welcome to</h3>
                        <h1>Caffeine Heaven</h1>
                    </div>
                    <div>
                        <button>Brewing Equipment</button>
                        <button>Coffee Beans and Matcha</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
