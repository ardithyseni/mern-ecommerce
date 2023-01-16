import React from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'

const UserRoute = ({ children, ...rest }) => {
  const {user} = useSelector((state) => ({ ...state}));

    return user && user.token ? (
    <Route {...rest} render={() => children}/>
  ) : (
    <LoadingOutlined />
  )
}

export default UserRoute