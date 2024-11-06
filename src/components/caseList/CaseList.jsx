import Header from "../Header";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { deleteCaseList, fetchCaseList } from "../../stores/actionCreator";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from "react-toastify";
export default function CaseList() {
  const dispatch = useDispatch()
  const {CaseLists} = useSelector(state => state.CaseLists)
  console.log(CaseLists);
  useEffect(() => {
    dispatch(fetchCaseList())
  },[])
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
    const Navigate = useNavigate()
    async function HandleDelete(id) {
      try {
        // e.preventDefault()
        await dispatch(deleteCaseList(id))
        toast.success('Delete Sucessfuly')
      } catch (error) {
        console.log(error);
        
      }
    }
    return (
    <div className="flex flex-col  w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
        <Header/>
        <div className="lg:p-4 px-4 bg-slate-100 h-full relative">
            <div className="flex flex-col lg:flex-row justify-between   mt-8 mb-2">
            <div class=''>
    <div class=" flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div class="grid place-items-center h-full w-24 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search something.." /> 
    </div>
</div>
                <div className="flex justify-end gap-5 mt-2 lg:mt-0">

            <div className="w-full lg:w-[300px] mt-1">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Select a Category"
      />
    </div>
            <button onClick={() => Navigate('/add-caselist')} className=" btn  bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2">
                Add Case
            </button>
                </div>
            </div>
            
        <div className="overflow-x-auto bg-white">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="">
        <th>No</th>
        <th>image</th>
        <th>Name</th>
        <th>Location</th>
        <th>Product</th>
        <th>details</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {CaseLists && CaseLists.length > 0 ? (
        CaseLists.map((el,i) => {
          return (
            <tr className="hover">
            <th>{i+1}</th>
            <td className="w-[150px]">
                                            {el.image.length > 0 ? (
                                                <img
                                                    src={`https://api-v1.yestech.id/${el.image[0].link}`}
                                                    alt={`${el.name} main image`}
                                                    className="w-20 lg:w-auto rounded-lg"
                                                />
                                            ) : (
                                                'No image available'
                                            )}
                                        </td>
            <td>{el.name}</td>
            <td>{el.location}</td>
            <td>{el.product}</td>
            <td className="line-clamp-3 py-1" dangerouslySetInnerHTML={{__html : el.details}}/>
            <td> <div className="flex flex-col space-y-2">
                                                <button onClick={() => HandleDelete(el.id)}  className="flex items-center justify-center bg-red-500 text-white py-1 px-3 rounded w-full">
                                                    <FaTrash className="mr-2" /> Delete
                                                </button>
                                                <button onClick={() => Navigate(`/edit-case/${el.id}`)} className="flex items-center justify-center bg-sky-600 text-white py-1 px-3 rounded w-full">
                                                    <FaEdit className="mr-2" /> Edit
                                                </button>
                                            </div></td>
          </tr>
          )
        })
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
    )
}