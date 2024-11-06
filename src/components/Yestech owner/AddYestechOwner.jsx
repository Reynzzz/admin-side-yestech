import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryYestechOwner, postYestechOwner } from '../../stores/actionCreator';
import { toast } from 'react-toastify';

export default function AddYestechOwner() {
  const { categoryYestech } = useSelector((state) => state.categoryYestech);  
  console.log(categoryYestech);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategoryYestechOwner());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    categoryYestechOwnerId: null,
    details: '',
    instagram: '',
    tiktok: '',
    linkWeb: '',
    noHp : '',
    alamat : '',
    facebook : '',
    youtube : '',

  });

  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the file object directly
    } else {
      setImage(null);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
  
    const formDataObj = new FormData();
    
    // Append form data
    for (const [key, value] of Object.entries(formData)) {
      formDataObj.append(key, value);
    }
    
    // Append image file if available
    if (image) {
      formDataObj.append('image', image);
    }
  
    try {
      console.log(formDataObj);
  
      await dispatch(postYestechOwner(formDataObj));
      document.getElementById('my_modal_3').close();
      toast.success('Added Successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Reset form data and image
      setFormData({
        name: '',
        email: '',
        categoryYestechOwnerId: null,
        details: '',
        instagram: '',
        tiktok: '',
        linkWeb: '',
        noHp: '',
        alamat: '',
        facebook: '',
        youtube: ''
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error('Error adding Yestech owner', {
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
      <button className="btn bg-blue-500 text-white hover:bg-blue-500 hover:text-black" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Yestech</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="space-y-4">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
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
                type="noHp"
                name="noHp"
                value={formData.noHp}
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
                <option value="" disabled selected hidden >Choose a Region</option>
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
              <label className="label">
                <span className="label-text">Facebook URL:</span>
              </label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://www.facebook.com/yourusername"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Youtube URL:</span>
              </label>
              <input
                type="text"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://www.youtube.com/yourusername"
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
                <span className="label-text">website URL:</span>
              </label>
              <input
                type="text"
                name="linkWeb"
                value={formData.linkWeb}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://www.websiteUrl.com"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Address:</span>
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="jl palem"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image (Aspect Ratio 1:1):</span>
              </label>
              <div className="relative w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
                <input
                  type="file"
                  name="image"
                  id="imageInput"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {image ? (
                  <img
                    src={URL.createObjectURL(image)} // Use URL.createObjectURL to display image preview
                    alt="Image Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-40 text-gray-400">
                    <span>Upload Image</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">Aspect Ratio: 1:1</p>
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
