'use client'

import React, { useState } from 'react'

export default function EmailInput() {
    const [email, setEmail] = useState('')
    
    async function handleAddSubscriber() {
        try {
            // write POST fetch request to send email to whatever service we use to build email list
        } catch (err) {
            console.log('Failed to add subscriber: ', err.message)
        }
    }
    return (
        <div className="sign-up">
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }} placeholder="Email Address..."/>
            <button className="button-card">Sign Up</button>
        </div>
    )
}
