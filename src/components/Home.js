import React from 'react'
import '../index.css'
import { Navbar } from './Navbar'
import { Products } from './Products'

export const Home = ({user, isAdmin}) => {
    return(
        <div className='wrapper'>
            <Navbar user={user} isAdmin={isAdmin}/>
            <Products/>
        </div>
    )
}