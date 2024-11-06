import Header from "../Header";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { deleteProducts, fetchProducts } from "../../stores/actionCreator";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from "react-toastify";

export default function Products() {
    const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'date', label: 'Date' },
        { value: 'elderberry', label: 'Elderberry' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { Products } = useSelector((state) => state.Products)
    console.log(Products);
    
    async function HandleDelete(id) {
        try {
          // e.preventDefault()
          await dispatch(deleteProducts(id))
          toast.success('Delete Sucessfuly')
        } catch (error) {
          console.log(error);
          
        }
      }
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
            <Header />
            <div className="lg:p-4 px-4 bg-slate-100 h-full relative">
                <div className="flex flex-col lg:flex-row justify-between mt-8 mb-2">
                    <div className="mb-4 lg:mb-0">
                        <div className="flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search something.." 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-end gap-5">
                        <div className="w-full lg:w-[300px] mt-1">
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                options={options}
                                placeholder="Select a Category"
                            />
                        </div>
                        <button 
                            onClick={() => navigate('/add-product')} 
                            className="btn bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2 mt-2 lg:mt-0"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Title Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products.data && Products.data.length > 0 ? (
                                Products.data.map((product, index) => (
                                    <tr key={product.id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>
                                            {product.mainImg.length > 0 ? (
                                                <img
                                                    src={`https://api-v1.yestech.id/${product.mainImg[0].link}`}
                                                    alt={`${product.name} main image`}
                                                    className="w-20 lg:w-40 rounded-lg"
                                                />
                                            ) : (
                                                'No image available'
                                            )}
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.categoryProduct.name}</td>
                                        <td className="line-clamp-4 py-1 h-full" dangerouslySetInnerHTML={{__html : product.detailsHome}}/>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-2">
                                                <button onClick={() => HandleDelete(product.id)} className="flex items-center justify-center bg-red-500 text-white py-1 px-3 rounded w-full">
                                                    <FaTrash className="mr-2" /> Delete
                                                </button>
                                                <button onClick={() => navigate(`/edit-product/${product.id}`)} className="flex items-center justify-center bg-sky-600 text-white py-1 px-3 rounded w-full">
                                                    <FaEdit className="mr-2" /> Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
