import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryYestechOwner, fetchYestechOwner, postYestechOwner } from '../../stores/actionCreator';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

export default function EditYestechOwner({id,yestech}) {
  const { categoryYestech } = useSelector((state) => state.categoryYestech);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategoryYestechOwner());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: yestech.name || '',
    noHp: yestech.noHp || '',
    email: yestech.email || '',
    categoryYestechOwnerId: yestech.categoryYestechOwnerId || '',
    details: yestech.details || '',
    instagram: yestech.instagram || '',
    tiktok: yestech.tiktok || '',
    linkWeb: yestech.linkWeb || '',
    alamat: yestech.alamat || '',
    facebook: yestech.facebook || '',
    youtube: yestech.youtube || '',
    image: null,
    imagePreview: yestech.image ? `https://api-v1.yestech.id/${yestech.image}` : null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
  
    const formDataObj = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataObj.append(key, value);
    }
    
    try {
      const response = await fetch(`https://api-v1.yestech.id/yestechOwner/${id}`, {
        method: 'PUT',
        body: formDataObj,
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      dispatch(fetchYestechOwner())
      document.getElementById(`edit_modal_${id}`).close();
      toast.success('Updated Successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error updating Yestech owner', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <div>
     <button onClick={() => document.getElementById(`edit_modal_${id}`).show()} className="flex items-center justify-center bg-sky-600 text-white py-1 px-3 rounded w-full">
                          <FaEdit className="mr-2" /> Edit
                        </button>
      <dialog id={`edit_modal_${id}`} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="space-y-4">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById(`edit_modal_${id}`).close()}>✕</button>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="noHp" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="noHp"
                type="text"
                name="noHp"
                value={formData.noHp}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Adress</label>
              <input
                id="alamat"
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="categoryYestechOwnerId" className="block text-sm font-medium text-gray-700 mb-2">Region :</label>
              <select
                id="categoryYestechOwnerId"
                name="categoryYestechOwnerId"
                value={formData.region}
                onChange={handleChange}
                className="w-full focus:outline-none border border-gray-300 bg-transparent p-3 rounded-lg transition-opacity"
              >
                <option value="" disabled hidden >Choose a Region</option>
                {categoryYestech.map(el => (
                  <option
                    key={el.id}
                    value={el.id}
                    className="border text-base border-black bg-transparent p-2 option-animation hover:bg-gray-900"
                  >
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Instagram URL:</span>
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://www.instagram.com/yourusername"
              />
            </div>
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook</label>
              <input
                id="facebook"
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="youtube" className="block text-sm font-medium text-gray-700">Youtube</label>
              <input
                id="youtube"
                type="text"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">TikTok URL:</span>
              </label>
              <input
                type="text"
                name="tiktok"
                value={formData.tiktok}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://www.tiktok.com/@yourusername"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Website URL:</span>
              </label>
              <input
                type="text"
                name="linkWeb"
                value={formData.linkWeb}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://www.yourwebsite.com"
              />
            </div>
          <div>
              <label className="label">
                <span className="label-text">Image :</span>
              </label>
              <input type="file" onChange={handleImageChange} className="file-input file-input-bordered file-input-info w-full" />
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Image Preview"
                  className="mt-2"
                />
              )}
            </div>
            <button
              type="submit"
              className="btn bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2 w-full mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
