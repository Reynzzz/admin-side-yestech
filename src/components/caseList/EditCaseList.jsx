import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../Header';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCaseList = () => {
  const [details, setDetails] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [product, setProduct] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  
  const { id } = useParams(); // Mendapatkan ID dari parameter URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data untuk mengisi form
    const fetchCaseDetails = async () => {
      try {
        const response = await fetch(`https://api-v1.yestech.id/caseList/${id}`);
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setLocation(data.location);
          setProduct(data.product);
          setDetails(data.details);
          setExistingImages(data.image || []);
        } else {
          console.error('Failed to fetch case details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching case details:', error);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('product', product);
    const image = e.target.image.files;
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i]);
    }
    formData.append('details', JSON.stringify(details));

    try {
      const response = await fetch(`https://api-v1.yestech.id/caseList/${id}`, {
        method: 'PUT', // Gunakan method PUT untuk mengedit data
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        navigate('/case-list');
        toast.success('Success Edit Case');
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
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
console.log(existingImages);

  return (
    <div className='flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0'>
      <Header />
      <div className='lg:p-4 p-3 bg-slate-100 h-full relative'>
        <form className="px-20 py-5 w-full mx-auto bg-white rounded-lg " onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location :
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Product Name :
            </label>
            <input
              type="text"
              id="product"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
              Details Case :
            </label>
            <ReactQuill
              value={details}
              onChange={(value) => setDetails(value)}
              className="bg-white text-gray-700 rounded-lg h-32"
            />
          </div>
          <div className="mb-4 mt-12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mainImage">
              Main Image
            </label>
            <input
              type="file"
              id="image"
              multiple
              name="image"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 mt-4">
            {existingImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {existingImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={`https://api-v1.yestech.id/${imgUrl.link}`}
                    alt={`existing-image-${index}`}
                    className="w-full h-auto object-cover"
                  />
                ))}
              </div>
            )}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4">
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
          <div className="mt-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCaseList;
