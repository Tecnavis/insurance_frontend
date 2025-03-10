import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { allProductData } from '../../data/Data';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PaginationSection from './PaginationSection';

const AllInsuranceTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);
    const dataList = allProductData
     // Pagination logic
     const indexOfLastData = currentPage * dataPerPage;
     const indexOfFirstData = indexOfLastData - dataPerPage;
     const currentData = dataList.slice(indexOfFirstData, indexOfLastData);
   
     const paginate = (pageNumber) => {
       setCurrentPage(pageNumber);
     };
   
     // Calculate total number of pages
     const totalPages = Math.ceil(dataList.length / dataPerPage);
     const pageNumbers = [];
     for (let i = 1; i <= totalPages; i++) {
       pageNumbers.push(i);
     }
   
  return (
    <>
    <OverlayScrollbarsComponent>
        <Table className="table table-dashed table-hover digi-dataTable all-product-table table-striped" id="allProductTable">
            <thead>
                <tr>
                    <th className="no-sort">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="markAllProduct"/>
                        </div>
                    </th>
                    <th>Product</th>
                    <th>ID</th>
                    <th>Stock</th>
                    <th>InStock</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Modal Number</th>
                    {/* <th>Rating</th> */}
                    <th>Added Date</th>
                    <th>Status </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((data)=>(
                <tr key={data.id}>
                    <td>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox"/>
                        </div>
                    </td>
                    <td>
                        <div className="table-product-card">
                            <div className="part-img">
                                <img src={data.image} alt={data.product_name}/>
                            </div>
                            <div className="part-txt">
                                <span className="product-name">{data.product_name}</span>
                                <span className="product-category">Category: {data.category}</span>
                            </div>
                        </div>
                    </td>
                    <td>{data.sku}</td>
                    <td>{data.stock}</td>
                    <td>10</td>
                    <td>Blue</td>
                    <td>6</td>
                    <td>${data.price}</td>
                    <td>{data.sales}</td>
                    <td>{data.published}</td>
                  <td>In Stock</td>
                    <td>
                        <div className="btn-box">
                            <button><i className="fa-light fa-eye"></i></button>
                            <button><i className="fa-light fa-pen"></i></button>
                            <button><i className="fa-light fa-trash"></i></button>
                        </div>
                    </td>
                </tr>  
                ))}
            
            </tbody>
        </Table>
    </OverlayScrollbarsComponent>
    <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers}/>
    </>
  )
}

export default AllInsuranceTable