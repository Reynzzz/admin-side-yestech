import Header from "../Header";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, deleteWarehouse, fetchBanner, fetchWarehouse } from "../../stores/actionCreator";
import AddWarehouses from "./AddWarehouses";

export default function Warehouse() {
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const { Warehouses } = useSelector((state) => state.Warehouses);
  console.log(Warehouses);

  useEffect(() => {
    dispatch(fetchWarehouse());
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.getElementById("my_modal_image").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("my_modal_image").close();
    setSelectedImage(null);
  };

  const filteredBanner = Warehouses?.filter(el =>
    (el.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (el.alamat?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );
  

  async function handleDelete(id) {
    try {
        await dispatch(deleteWarehouse(id));
        toast.success('Delete Successfully', {
            position: 'bottom-right',
            autoClose: 2000
        });
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className="lg:p-4 p-2 bg-slate-100 h-full relative">
        <div className="flex flex-col lg:flex-row justify-between mt-8 mb-2">
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <div className="flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 lg:w-24 text-gray-300">
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
                placeholder="Search something.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-5 mt-2 lg:mt-0">
            <AddWarehouses/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto rounded-none bg-white w-full">
            <thead className="border-b-2 border-gray-300">
              <tr className="text-sm">
                <th className="px-2 py-1">No</th>
                <th className="px-2 py-1">Name</th>
                <th className="px-2 py-1">Image</th>
                <th className="px-2 py-1">Alamat</th>
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanner.map((el, i) => (
                <tr key={i} className="text-sm">
                  <td className="px-2 py-1">{i + 1}</td>
                  <td className="px-2 py-1">{el.name}</td>
                  <td className="px-2 py-1">
                    <div className="relative w-auto h-auto">
                      <div className="rounded-md w-20 lg:w-[200px] lg:h-28 h-20 overflow-hidden group">
                        <img
                          src={`https://api-v1.yestech.id/${el.image[0]?.link}`}
                          alt="Banner Image"
                          className="rounded-lg w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-md w-20 lg:w-[200px] lg:h-28 h-20   bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span
                            onClick={() =>
                              handleImageClick(
                                `https://api-v1.yestech.id/${el.image}`
                              )
                            }
                            className="text-white text-sm cursor-pointer"
                          >
                            lihat
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-1">{el.alamat}</td>
                 
                  <td className="px-2 py-1">
                    <div className="flex gap-2">
                      {/* <EditBanner id={el.id} banner={el} /> */}
                      <button
                        onClick={() => handleDelete(el.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="my_modal_image" className="modal">
        <div className="modal-box w-full max-w-5xl bg-gray-200 p-4">
          <button
            className="absolute top-0 right-2 m-2 text-white text-2xl focus:outline-none"
            onClick={handleCloseModal}
          >
            &times;
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full Screen"
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>
      </dialog>
    </div>
  )
  }
