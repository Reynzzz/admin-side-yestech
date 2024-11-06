import Header from "../Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { deleteYestechOwner, fetchCategoryYestechOwner, fetchYestechOwner } from "../../stores/actionCreator";
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddYestechOwner from "./AddYestechOwner";
import EditYestechOwner from "./EditYestechOwner";
import { toast } from "react-toastify";

export default function YestechOwner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryYestech } = useSelector(state => state.categoryYestech);
  const { Yestechs } = useSelector(state => state.Yestechs);

  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredYestechs, setFilteredYestechs] = useState(Yestechs);

  useEffect(() => {
    dispatch(fetchYestechOwner());
    dispatch(fetchCategoryYestechOwner());
  }, [dispatch]);

  useEffect(() => {
    let filtered = Yestechs;

    if (selectedOption) {
      if (selectedOption.value !== 'all') {
        filtered = filtered.filter(yestech => yestech.categoryYestechOwner.id === selectedOption.value);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(yestech =>
        yestech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        yestech.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredYestechs(filtered);
  }, [selectedOption, searchTerm, Yestechs]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const categoryOptions = [
    { value: 'all', label: 'All' },
    ...categoryYestech.map(category => ({
      value: category.id,
      label: category.name,
    })),
  ];
  async function HandleDelete(id) {
    try {
      // e.preventDefault()
      await dispatch(deleteYestechOwner(id))
      toast.success('Delete Sucessfuly')
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="flex flex-col w-full lg:ml-[250px] ml-0 mt-20 lg:mt-0">
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
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2 lg:mt-0">
            <div className="w-full lg:w-[300px] mt-1">
              <Select
                value={selectedOption}
                onChange={handleCategoryChange}
                options={categoryOptions}
                placeholder="Select a Category"
              />
            </div>
            <button
              onClick={() => navigate("/yestech-owner/region")}
              className="btn px-6 bg-[rgb(0,195,10)] text-white hover:bg-white hover:text-[rgb(0,195,10)] hover:border-[rgb(0,195,10)] border-2"
            >
              Region
            </button>
            <AddYestechOwner/>
          </div>
        </div>

        <div className="overflow-x-auto bg-white">
          <div className="overflow-y-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Media</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredYestechs && filteredYestechs.length > 0 ? (
                  filteredYestechs.map((el, i) => (
                    <tr className="hover:bg-gray-100" key={el.id}>
                      <td className="px-4 py-2 text-sm">{i + 1}</td>
                      <td className="px-4 py-2 w-full">
                        <img
                          src={`https://api-v1.yestech.id/${el.image}`}
                          alt={`${el.name} main image`}
                          className="w-20 lg:w-20 lg:h-10 rounded"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm">{el.name}</td>
                      <td className="px-4 py-2 text-sm">{el.email}</td>
                      <td className="px-4 py-2 text-sm">{el?.noHp}</td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex flex-col">
                          <div className="py-1">{el.instagram}</div>
                          <div className="py-1">{el.facebook}</div>
                          <div className="py-1">{el.tiktok}</div>
                          <div className="py-1">{el.youtube}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm">{el?.linkWeb}</td>
                      <td className="px-4 py-2 text-sm line-clamp-3">{el.details}</td>
                      <td className="px-4 py-2 text-sm">{el.categoryYestechOwner.name}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-col space-y-2">
                          <button onClick={() => HandleDelete(el.id)} className="flex items-center justify-center bg-red-500 text-white py-1 px-3 rounded">
                            <FaTrash className="mr-2" /> Delete
                          </button>
                         <EditYestechOwner id={el.id} yestech={el}/>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-4 py-2 text-center text-sm text-gray-500">No data Available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
