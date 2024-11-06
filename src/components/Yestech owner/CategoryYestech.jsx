import React, { useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { deleteCategoryYestech, fetchCategoryYestechOwner } from "../../stores/actionCreator";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import EditCategoryYestech from "./EditCategoryYestech";
import AddCategoryYestech from "./AddCategoryYestech";
import { toast } from "react-toastify";

export default function CategoryYestech() {
  const { categoryYestech } = useSelector((state) => state.categoryYestech);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategoryYestechOwner());
  },[]);
  async function handleDelete(id) {
    try {
      await dispatch(deleteCategoryYestech(id))
      toast.success('Delete Successfuly')
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }
  return (
    <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className="lg:p-4 px-4 bg-slate-100 h-full relative">
        <div className="flex flex-col lg:flex-row justify-between mt-8 mb-2">
          <div>
            <div className="flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-24 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Search Owner"
                // value={searchTerm}
                // onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2 lg:mt-0">
          <AddCategoryYestech/> 
          </div>
        </div>

        <div className="overflow-x-auto bg-white">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th className="flex justify-end pr-20">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryYestech && categoryYestech.length > 0 ? (
                categoryYestech.map((el, i) => (
                  <tr className="hover" key={el.id}>
                    <th>{i + 1}</th>
                    <th>{el.name}</th>
                    <td className="px-6 py-4">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleDelete(el.id)} className="flex items-center justify-center bg-red-500 text-white text-xs py-1.5 px-4 rounded">
                          <FaTrash className="mr-1 font-bold text-base" /> Delete
                        </button>
                        {/* <button
                          onClick={() => navigate(`/edit-product/${el.id}`)}
                          className="flex items-center justify-center bg-sky-600 text-white text-xs py-1.5 px-4 rounded"
                        >
                          <FaEdit className="mr-1 font-bold text-base" /> Edit
                        </button> */}
                        <EditCategoryYestech categoryId={el.id} category={el} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
