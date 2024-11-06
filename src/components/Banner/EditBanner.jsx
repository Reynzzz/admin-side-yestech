import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchBanner } from '../../stores/actionCreator';

export default function EditBanner({ id, banner }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: banner.title,
    link: banner.link,
    details: banner.details,
    imageBanner: null,
    imagePreview: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imageBanner: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append('title', formData.title);
    updatedFormData.append('link', formData.link);
    updatedFormData.append('details', formData.details);
    if (formData.imageBanner) {
      updatedFormData.append('imageBanner', formData.imageBanner);
    }

    try {
      const response = await axios.put(`https://api-v1.yestech.id/banner/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful response
      console.log('Banner updated successfully', response.data);
      // Show success toast
      toast.success('Edit Success', {
        autoClose: 2000
      });
      // Fetch the updated banner data
      dispatch(fetchBanner());

    } catch (error) {
      console.error('Error updating banner', error);
      // Show error toast
      toast.error('Error updating banner', {
        autoClose: 2000
      });
    }

    closeModal();
  };

  const closeModal = () => {
    const modal = document.getElementById(`my_modal_${id}`);
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  return (
    <div>
      <div className="relative group">
        <button onClick={() => document.getElementById(`my_modal_${id}`).showModal()} className="text-blue-500 hover:text-blue-700">
          <FaEdit size={28} />
        </button>
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
          Edit
        </span>
      </div>
      <dialog id={`my_modal_${id}`} className="modal">
        <div className="modal-box">
          <button onClick={closeModal} className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <form onSubmit={handleEditSubmit} method="dialog">
            <div className="">
              <div className="font-bold text-lg">Edit Data</div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name :</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input input-bordered input-info"
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
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Link :</span>
                </label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="input input-bordered input-info"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image :</span>
                </label>
                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-info w-full" />
                {formData.imagePreview ? (
                  <img
                    src={formData.imagePreview}
                    alt="New Banner Preview"
                    className="mt-2"
                  />
                ) : (
                  banner.imageBanner && (
                    <img
                      src={`https://api-v1.yestech.id/${banner.imageBanner}`}
                      alt="Current Banner Image"
                      className="mt-2"
                    />
                  )
                )}
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
