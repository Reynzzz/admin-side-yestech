import React, { useState } from 'react';
import axios from 'axios'; // Tambahkan axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddWarehouses() {
  const [formData, setFormData] = useState({
    name: '',
    alamat: '',
    image: [], // Array untuk menyimpan banyak gambar
  });
  const [previews, setPreviews] = useState([]); // Array untuk menyimpan preview gambar

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const selectedFiles = Array.from(files);
      const validFiles = selectedFiles.filter(file => validImageTypes.includes(file.type));

      if (validFiles.length !== selectedFiles.length) {
        toast.error('Only image files are allowed');
        return;
      }

      setFormData({
        ...formData,
        [name]: validFiles,
      });

      // Generate preview untuk setiap gambar
      const previewsArray = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(previewsArray);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.alamat || formData.image.length === 0) {
      toast.error('Please fill out all fields', {
        position: 'top-right',
        autoClose: 2000
      });
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('alamat', formData.alamat);

    for (let i = 0; i < formData.image.length; i++) {
      data.append('image', formData.image[i]);
    }

    try {
      // Kirim data ke backend menggunakan Axios
      const response = await axios.post('https://api-v1.yestech.id/warehouse', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Berikan feedback kepada user
      toast.success('Warehouse added successfully', {
        position: 'top-right',
        autoClose: 2000
      });

      // Reset form
      setFormData({
        name: '',
        alamat: '',
        image: [],
      });
      setPreviews([]);
    } catch (error) {
      console.error('Error adding warehouse:', error);
      toast.error('Failed to add warehouse', {
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
        Add Warehouse
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
                  <span className="label-text">name :</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered input-info"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">alamat :</span>
                </label>
                <textarea
                  name="alamat"
                  className="textarea textarea-info"
                  value={formData.alamat}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Images :</span>
                </label>
                <div className="relative w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
                  <input
                    type="file"
                    name="image"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleChange}
                  />
                  {previews.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {previews.map((preview, index) => (
                        <img key={index} src={preview} alt={`Preview ${index}`} className="object-cover w-full h-full rounded-md" />
                      ))}
                    </div>
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
                      <p className="text-sm">Upload Images</p>
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
