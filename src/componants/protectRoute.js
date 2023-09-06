import React from 'react'
import { UserAuth } from './context'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute({children}) {

    const {user} = UserAuth();

    if(!user) {
        return <Navigate to='/' />
    }

    return children;
}

