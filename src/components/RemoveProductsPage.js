import React from 'react'
import '../index.css'
import { Navbar } from './Navbar'
import { RemoveProducts } from './RemoveProducts'
import { NotFound } from './NotFound';

export const RemoveProductsPage = ({ user, isAdmin }) => {
    return (
        <>
            {!user && (<NotFound/>)}
            {isAdmin && (
                <div className='wrapper'>
                    <Navbar user={user}/>
                    <RemoveProducts/>
                </div>
            )}
        </>
    )
}