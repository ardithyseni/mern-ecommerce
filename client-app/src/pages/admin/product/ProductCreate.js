import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {createProduct} from '../../../functions/product'

const ProductCreate = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          product create form
        </div>
      </div>
    </div>
  )
}

export default ProductCreate