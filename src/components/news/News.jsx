import Header from "../Header";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditNews from "./EditNews";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, fetchNews } from "../../stores/actionCreator";
import { toast } from "react-toastify";
export default function News() {
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
    const dispatch = useDispatch()
    const {News} = useSelector((state) => state.News)
        console.log(News);
        async function HandleDelete(id) {
          try {
            // e.preventDefault()
            await dispatch(deleteNews(id))
            toast.success('Delete Sucessfuly')
          } catch (error) {
            console.log(error);
            
          }
        }
    useEffect(() => {
      dispatch(fetchNews())
    },[])
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
            <button onClick={() => Navigate('/addnews')} className=" btn  bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2">
                Add News
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
        <th>Details</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     {News.map((el,i) => {
      return (
      <tr className="hover ">
        <th>{i+1}</th>
        <td className="w-20 sm:w-[150px]">
          {el.imageNews.length > 0 ? (
             <img
             src={`https://api-v1.yestech.id/${el.imageNews[0].link}`}
             alt={`${el.name} main image`}
             className="w-full rounded-lg"
         />
          ) : (
             'No image available'
          )}
        </td>
        <td>{el.name}</td>
        <td className="line-clamp-3 py-1" dangerouslySetInnerHTML={{__html: el.details.map(detail => detail.text).join(' ')}} />


        <td>
          <div className="flex flex-col gap-4">
          <div className="relative group">
              <button onClick={() => Navigate(`/edit-news/${el.id}`)}  className="text-blue-600 hover:text-blue-700">
                <FaEdit size={25} />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Edit
              </span>
            </div>
            <div className="relative group">
              <button onClick={() => HandleDelete(el.id)}  className="text-red-500 hover:text-red-700">
                <FaTrash size={25} />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
                Delete
              </span>
            </div>
          </div>
        </td>
      </tr>
      )
     })}
      {/* row 2 */}
    
    </tbody>
  </table>
</div>
        </div>
    </div>
    )
}