import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../Header';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineFileAdd } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { FaImage } from 'react-icons/fa';

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract news ID from URL params if editing
  const [details, setDetails] = useState([{ text: '', image: [] }]);
  const [name, setName] = useState('');
  const [imageNews, setimageNews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch existing news data if editing
      fetch(`https://api-v1.yestech.id/news-detail/${id}`)
        .then(response => response.json())
        .then(data => {
          setName(data.name);
          setDetails(data.details.map(detail => ({
            text: detail.text,
            image: detail.image,
          })));
          setimageNews(data.imageNews.map(img => `https://api-v1.yestech.id/${img.link}`));
          setIsEditing(true);
        })
        .catch(error => {
          toast.error('Failed to fetch news data.');
          console.error('Error:', error);
        });
    }
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prevFiles => [...prevFiles, ...files]); // Menambahkan gambar baru ke state yang ada
  };
  
  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { text: '', image: [''] }]);
  };

  const handleRemoveDetail = (index) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  const handleDetailImageChange = (index, imgIndex, value) => {
    const newDetails = [...details];
    newDetails[index].image[imgIndex] = value;
    setDetails(newDetails);
  };

  const handleAddImageLink = (index) => {
    const newDetails = [...details];
    newDetails[index].image.push('');
    setDetails(newDetails);
  };

  const handleRemoveImageLink = (index, imgIndex) => {
    const newDetails = [...details];
    newDetails[index].image = newDetails[index].image.filter((_, i) => i !== imgIndex);
    setDetails(newDetails);
  };

// console.log(imageNews);
  
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Append the name
  formData.append('name', name);

  // Append existing images
  imageNews.forEach((img) => {
    // Assuming that `img` is a URL or a path, you might need to manage how these are sent
    formData.append('existingImages', img); // Update with correct field name or handling
  });

  // Append new images
  imageFiles.forEach((file) => {
    formData.append('mainImages', file);
  });

  // Append detail images
  const processedDetails = details.map(detail => ({
    text: detail.text,
    image: detail.image.map(img => img.replace('https://api-v1.yestech.id/', ''))
  }));
  formData.append('details', JSON.stringify(processedDetails));

  try {
    const url = id ? `https://api-v1.yestech.id/news/${id}` : 'https://api-v1.yestech.id/news';
    const method = id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      toast.success(`Success! News ${id ? 'updated' : 'added'}.`);
      navigate('/news');
    } else {
      toast.error(`Failed to ${id ? 'update' : 'add'} news.`);
    }
  } catch (error) {
    toast.error('Error occurred while saving news.');
    console.error('Error:', error);
  }
};

const handleRemoveImage = async (index) => {
  const imageToRemove = imageNews[index];
  console.log(imageToRemove);
  
  const filename = imageToRemove.split('/').pop(); // Ambil nama file dari URL
  console.log(filename);
  
  try {
    // Hapus gambar dari server
    await fetch(`https://api-v1.yestech.id/news-image/${filename}`, {
      method: 'DELETE',
    });
    toast.success('Delete Image Success')
    // Hapus gambar dari state
    const updatedImages = imageNews.filter((_, i) => i !== index);
    setimageNews(updatedImages);
  } catch (error) {
    console.error('Error deleting image:', error);
    toast.error('Failed to delete image');
  }
};

  return (
    <div className='flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0'>
      <Header />
      <div className='lg:p-8 p-4 bg-slate-100 h-full relative'>
        <form className="px-8 py-6 w-full mx-auto bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="image">
              Main Images
            </label>
            <input
              type="file"
              id="image"
              multiple
              onChange={handleImageChange}
              className="shadow-sm border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            />
            <div className="mt-4">
              {imageNews.map((image, index) => (
                <div key={index} className="relative mb-4">
                  <img src={image}  className="w-full h-auto object-cover rounded-lg" />
                  {/* <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    <MdDelete size={20} />
                  </button> */}
                </div>
              ))}
            </div>
          </div>

          {details.map((detail, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Detail {index + 1}</h3>
              <label htmlFor={`detail-text-${index}`} className='block text-gray-700 text-base font-semibold mb-2'>
                Details Text :
              </label>
              <ReactQuill
                value={detail.text}
                onChange={(value) => handleDetailChange(index, 'text', value)}
                className="bg-white text-gray-700 rounded-lg h-40"
              />
              <div className='mt-16'>
                <label className='block text-gray-700 text-base font-semibold mb-2'>
                  Detail Images Links :
                </label>
                {detail.image.map((image, imgIndex) => (
                  <div key={imgIndex} className="flex items-center mb-3">
                    <input
                      type="text"
                      id={`detail-image-${index}-${imgIndex}`}
                      name="detailImage"
                      value={image}
                      onChange={(e) => handleDetailImageChange(index, imgIndex, e.target.value)}
                      className="shadow-sm border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImageLink(index, imgIndex)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline ml-3"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddImageLink(index)}
                  className="bg-blue-500 flex flex-row gap-2 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Add More link Image <AiOutlinePlus className='mt-1 font-bold' size={20} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveDetail(index)}
                className="bg-red-500 flex flex-row gap-2 hover:bg-red-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline mt-3"
              >
                Delete Detail {index + 1}  <MdDelete className='mt-[2px]' size={20} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddDetail}
            className="bg-blue-500 flex gap-1 hover:bg-blue-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline mb-6"
          >
            Add More Details <AiOutlinePlus className='mt-[2px]' size={20} />
          </button>

          <div className="mt-6 flex gap-5">
            <button
              type="submit"
              className="bg-green-500 flex gap-2 hover:bg-green-700 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
            >
              Upload News <FaImage className='mt-[3px]' size={20} />
            </button>
            <button
              onClick={() => navigate('/news')}
              className="bg-black flex gap-2 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;