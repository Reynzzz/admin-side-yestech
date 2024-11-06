import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCaseList = () => {
  const [details, setDetails] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const name = e.target.name.value;
    const location = e.target.location.value;
    const product = e.target.product.value;
    formData.append('name', name);
    formData.append('location', location);
    formData.append('product', product);

    const image = e.target.image.files;
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i]);
    }
    
    formData.append('details', details);

    try {
      const response = await fetch('https://api-v1.yestech.id/caseList', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/case-list');
        toast.success('Success Add Case');
      } else {
        console.error('Failed to submit form:', response.statusText);
        toast.error('Failed to Add Case');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting form');
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    
    const newImagePreviews = fileArray.map((file) =>
      URL.createObjectURL(file)
    );
    
    setImagePreviews(newImagePreviews);
  };

  return (
    <div className='flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0'>
      <Header />
      <div className='lg:p-4 p-3 bg-slate-100 h-full relative'>
        <form className="px-20 py-5 w-full mx-auto bg-white rounded-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
              Product Name:
            </label>
            <input
              type="text"
              id="product"
              name="product"
              
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
              Details Case:
            </label>
            <ReactQuill
              value={details}
              onChange={(value) => setDetails(value)}
              className="bg-white text-gray-700 rounded-lg h-32"
            />
          </div>
          <div className="mb-4 mt-20">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Main Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              multiple
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 mt-4">
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`preview-${index}`}
                    className="w-full h-auto object-cover"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              onClick={() => navigate('/case-list')}
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCaseList;
