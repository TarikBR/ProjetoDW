import React from 'react'
import '../index.css'
import { Navbar } from './Navbar'
import { RemoveProducts } from './RemoveProducts'

export const RemoveProductsPage = ({user}) => {
    return(
        <div className='wrapper'>
            <Navbar user={user}/>
            <RemoveProducts/>
        </div>
    )
}