import React from 'react'

const ProductTableRow = ({p}) => {
  return (
    <tr>
        <td>
            Image
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>{p.color}</td>
        <td>{p.count}</td>
        <td>{p.shipping}</td>
        <td>Delete Icon</td>
    </tr>
  )
}

export default ProductTableRow