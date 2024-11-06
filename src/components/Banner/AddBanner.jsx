import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postBanner } from '../../stores/actionCreator';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBanner() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    details: '',
    link: '',
    imageBanner: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        toast.error('Only image files are allowed');
        return;
      }
      setFormData({
        ...formData,
        [name]: file,
      });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.details || !formData.link || !formData.imageBanner) {
      toast.error('Please fill out all fields', {
        position: 'top-right',
        autoClose: 2000
      });
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('details', formData.details);
    data.append('link', formData.link);
    data.append('imageBanner', formData.imageBanner);

    try {
      console.log(' form data:', data);
      await dispatch(postBanner(data));
      document.getElementById("my_modal_3").close();

      toast.success('Add Banner Successfully', {
        position: 'top-right',
        autoClose: 2000
      });
      setFormData({
        title: '',
        details: '',
        link: '',
        imageBanner: null,
      });
      setPreview(null);
    } catch (error) {
      console.error('Error posting banner:', error);
      toast.error('Failed to add banner', {
        position: 'top-right',
        autoClose: 2000
      });
    }
  };

  return (
    <div>
      <button 
        className="btn bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add Banner
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative" style={{ zIndex: 9998 }}>
          <form onSubmit={handleSubmit}>
            <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById("my_modal_3").close()}>
              ✕
            </button>
            <div className="">
              <div className="font-bold text-lg">Isi Data</div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title :</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered input-info"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Details :</span>
                </label>
                <textarea
                  name="details"
                  className="textarea textarea-info"
                  value={formData.details}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Link :</span>
                </label>
                <input
                  type="text"
                  name="link"
                  className="input input-bordered input-info"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
      <label className="label">
        <span className="label-text">Image :</span>
        <p className='text-red-600 text-sm'>Max Upload File 5mb !</p>
      </label>
      <div className="relative w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
        <input
          type="file"
          name="imageBanner"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleChange}
        />
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-sm">Upload Image</p>
            <p className="text-xs text-gray-400 font-bold mt-1">1:1 Aspect Ratio Required</p>
          </div>
        )}
      </div>
    </div>
              <button
                type="submit"
                className="btn bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2 w-full mt-4"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
