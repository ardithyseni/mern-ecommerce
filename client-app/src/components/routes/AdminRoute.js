import React, { useEffect, useState } from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UnauthorizedRedirect from './UnauthorizedRedirect'
import { getCurrentAdmin } from '../../functions/authFunctions'

const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [okay, setOkay] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            getCurrentAdmin(user.token)
            .then(res => {
                console.log('CURRENT ADMIN RESPONSE', res)
                setOkay(true);
            })
            .catch(error => {
                console.log("ADMIN ROUTE ERROR: ", error);
                setOkay(false);
            })
        }
    }, [user])

    return okay ? (
        <Route {...rest} />
    ) : (
        <UnauthorizedRedirect />
    )
}

export default AdminRoute