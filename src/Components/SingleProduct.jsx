import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getProduct } from '../Store/ActionCreators/ProductActionCreators'

export default function SingleProduct() {
  let [data, setData] = useState({})
  let { id } = useParams()
  let [qty, setQty] = useState(1)

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let ProductStateData = useSelector((state) => state.ProductStateData)
  function getAPIData() {
    dispatch(getProduct())
    if (ProductStateData.length) {
      let item = ProductStateData.slice(1).find((x) => x.id === Number(id))
      if (item)
        setData(item)
      else {
        navigate('/shop')
      }
    }
  }
  useEffect(() => {
    getAPIData()
  }, [ProductStateData.length])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            <div class="row">
            <img src={`/products/${data.pic1}`} alt={data.name} className="img-fluid" style={{width:"250px", height:"320px"}} />
            <img src={`/products/${data.pic2}`} alt={data.name} className="img-fluid" style={{width:"250px", height:"320px"}} />
            </div>
          </div>
          <div className="col-md-6">
            <h4 className='bg-primary text-center p-2 text-light'>{data.name}</h4>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Category</th>
                    <td>{data.maincategory} / {data.subcategory}</td>
                  </tr>
                  <tr>
                    <th>Brand</th>
                    <td>{data.brand}</td>
                  </tr>
                  <tr>
                    <th>Color/Size</th>
                    <td>{data.color} / {data.size}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td><del className='text-danger'>&#8377;{data.baseprice}</del> &#8377;{data.finalprice} <sup>{data.discount}% Off</sup></td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>{data.stock}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{data.description}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className='d-flex'>
                        <button className='btn btn-primary' onClick={() => {
                          if (qty > 1)
                            setQty(qty - 1)
                        }}><i className='fa fa-minus'></i></button>
                        <p className='text-center fs-4' style={{width:"10%"}}>{qty}</p>
                        <button className='btn btn-primary' onClick={() => setQty(qty + 1)}><i className='fa fa-plus'></i></button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button className='btn btn-primary w-50'><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                      <button className='btn btn-success w-50'><i className='fa fa-heart'></i> Add to Wishlist</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
