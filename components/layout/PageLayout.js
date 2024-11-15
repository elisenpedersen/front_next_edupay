import React from 'react'

import Header from './Header';


export default function PageLayout({ children, title }) {
    return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
            <Header />
            <h1 className="text-4xl font-bold text-center text-indigo-800 mb-12">{title}</h1>
            {children}
        </div>
    )
}