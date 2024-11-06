import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryProducts, fetchTypes,  fetchProductsByid } from '../../stores/actionCreator';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const EditProduct = () => {
  const { id } = useParams();
  console.log(id); // Get the id from URL params
  const [sections, setSections] = useState([]);
  const [imageSections, setImageSections] = useState([]);
  const [activeTab, setActiveTab] = useState('section'); // Default to 'section' tab
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [parameters, setParameters] = useState([{ tHead: '', tBody: [''] }]);
  const [mainImg, setMainImg] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [typeId, setTypeId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryProducts } = useSelector((state) => state.categoryProducts);
  const { Types } = useSelector((state) => state.Types);
  const { product } = useSelector((state) => state.Products);
  console.log(product); // Assuming you store the product in the state
  useEffect(() => {
    dispatch(fetchCategoryProducts());
    dispatch(fetchTypes());
    
    if (id) {
      dispatch(fetchProductsByid(id));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    if (product.data) {
      setProductName(product.data.name || '');
      setProductDescription(product.data.detailsHome || '');
      setCategoryId(product.data.categoryId || '');
      setTypeId(product.data.typeId || '');
      setParameters(product.data.parameters || [{ tHead: '', tBody: [''] }]);
      setSections(product.data.sections || []);
      setImageSections(product.data.imageSections || []);
      setMainImg(product.data.mainImg || []);
    }
  }, [product.data]);
  // console.log(name);
  const addSection = () => {
    const newSection = {
      type: 'section',
      title: '',
      description: '',
      background: '',
      layout: '',
      images: [],
    };
    setSections((prevSections) => [...prevSections, newSection]);
  };
  
  const handleParameterChange = (index, field, valueIndex, value) => {
    const updatedParameters = [...parameters];
    if (field === 'tBody' && valueIndex !== undefined) {
      updatedParameters[index].tBody[valueIndex] = value;
    } else {
      updatedParameters[index][field] = value;
    }
    setParameters(updatedParameters);
  };
  
  // console.log(productName,'nilog');
  const addParameterValue = (index) => {
    const updatedParameters = [...parameters];
    updatedParameters[index].tBody.push('');
    setParameters(updatedParameters);
  };

  const removeParameterValue = (paramIndex, valueIndex) => {
    const updatedParameters = [...parameters];
    updatedParameters[paramIndex].tBody.splice(valueIndex, 1);
    setParameters(updatedParameters);
  };

  const addImageSection = () => {
    const newImageSection = { type: 'imageSection', images: [{ url: '' }] }; // Initialize with one empty link
    setImageSections((prevImageSections) => [...prevImageSections, newImageSection]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [name]: value };
    setSections(newSections);
  };

  const removeSection = (index, isImageSection = false) => {
    if (isImageSection) {
      setImageSections((prevImageSections) => {
        const newImageSections = [...prevImageSections];
        newImageSections.splice(index, 1);
        return newImageSections;
      });
    } else {
      setSections((prevSections) => {
        const newSections = [...prevSections];
        newSections.splice(index, 1);
        return newSections;
      });
    }
  };

  const removeImage = (sectionIndex, imageIndex, isImageSection = false) => {
    if (isImageSection) {
      setImageSections((prevImageSections) => {
        const newImageSections = [...prevImageSections];
        newImageSections[sectionIndex].images.splice(imageIndex, 1);
        return newImageSections;
      });
    } else {
      setSections((prevSections) => {
        const newSections = [...prevSections];
        newSections[sectionIndex].images.splice(imageIndex, 1);
        return newSections;
      });
    }
  };

  const handleMainImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file, // store the file itself for upload
    }));
    setMainImg(imagesArray);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('detailsHome', productDescription);
    formData.append('categoryId', categoryId);
    formData.append('parameters', JSON.stringify(parameters));

    mainImg.forEach((img) => {
      formData.append('mainImg', img.file);
    });

    sections.forEach((section, sectionIndex) => {
      formData.append(`sections[${sectionIndex}][type]`, section.type);
      formData.append(`sections[${sectionIndex}][title]`, section.title);
      formData.append(`sections[${sectionIndex}][description]`, section.description);
      formData.append(`sections[${sectionIndex}][background]`, section.background);
      formData.append(`sections[${sectionIndex}][layout]`, section.layout);
      section.images.forEach((image, imageIndex) => {
        formData.append(`sections[${sectionIndex}][images][${imageIndex}][url]`, image.url);
        formData.append(`sections[${sectionIndex}][images][${imageIndex}][file]`, image.file);
      });
    });

    imageSections.forEach((imageSection, sectionIndex) => {
      formData.append(`sections[${sections.length + sectionIndex}][type]`, imageSection.type);
      imageSection.images.forEach((image, imageIndex) => {
        formData.append(`sections[${sections.length + sectionIndex}][images][${imageIndex}][url]`, image.url);
        formData.append(`sections[${sections.length + sectionIndex}][images][${imageIndex}][file]`, image.file);
      });
    });

    try {
      const url = id
        ? `https://api-v1.yestech.id/products/${id}`
        : 'https://api-v1.yestech.id/products';

      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      const data = await response.json();
      console.log('Saved Product:', data);
      navigate('/products');
      toast.success('Updated Successfuly')
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
// console.log(mainImg,'main');
  const addImageLink = (sectionIndex) => {
    if (activeTab === 'section') {
      const newSections = [...sections];
      newSections[sectionIndex].images.push({ url: '' }); // Add a new object with an empty link
      setSections(newSections);
    } else if (activeTab === 'images') {
      const newImageSections = [...imageSections];
      newImageSections[sectionIndex].images.push({ url: '' }); 
      setImageSections(newImageSections);
    }
  };

  const handleImageLinkChange = (sectionIndex, imageIndex, value) => {
    if (activeTab === 'section') {
      const newSections = [...sections];
      newSections[sectionIndex].images[imageIndex].url = value;
      setSections(newSections);
    } else if (activeTab === 'images') {
      const newImageSections = [...imageSections];
      newImageSections[sectionIndex].images[imageIndex].url = value;
      setImageSections(newImageSections);
    }
  };

  return (
    <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className="lg:p-4 p-2 bg-slate-100 rounded-2xl shadow-md">
        <div className='bg-white p-5'> 
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Category:</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                
              >
                <option value="">Select a category</option>
                {categoryProducts.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
      <label className="label">
        <span className="label-text text-lg font-semibold">Description:</span>
      </label>
      <ReactQuill
        theme="snow"
        value={productDescription}
        onChange={setProductDescription}
        className="w-full border-black focus:ring focus:ring-black"
        placeholder="Product Description"
      />
    </div>

            <div>
              <label className="block font-medium mb-2">Product Type:</label>
              <select
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                
              >
                <option value="">Select a type</option>
                {Types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Parameters:</label>
              {parameters.map((param, paramIndex) => (
                <div key={paramIndex} className="mb-4">
                  <input
                    type="text"
                    value={param.tHead}
                    onChange={(e) => handleParameterChange(paramIndex, 'tHead', null, e.target.value)}
                    placeholder="Table Header"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    
                  />
                  {param.tBody.map((value, valueIndex) => (
                    <div key={valueIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleParameterChange(paramIndex, 'tBody', valueIndex, e.target.value)}
                        placeholder="Table Body"
                        className="w-full p-2 border border-gray-300 rounded"
                        
                      />
                      <button
                        type="button"
                        onClick={() => removeParameterValue(paramIndex, valueIndex)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addParameterValue(paramIndex)}
                    className="text-blue-500"
                  >
                    Add Parameter Value
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block font-medium mb-2">Main Images:</label>
              <input
                type="file"
                multiple
                onChange={handleMainImageChange}
                className="mb-2"
              />
              <div className="flex flex-wrap">
                {mainImg.map((img, index) => (
                  // console.log()
                  <img
                    key={index}
                    src={`https://api-v1.yestech.id/${img.link}`}
                    alt={`Main Image ${index + 1}`}
                    className="w-24 h-24 object-cover mr-2 mb-2"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Sections:</label>
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-4 border p-4 rounded">
                  <input
                    type="text"
                    name="title"
                    value={section.title}
                    onChange={(e) => handleInputChange(sectionIndex, e)}
                    placeholder="Section Title"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <textarea
                    name="description"
                    value={section.description}
                    onChange={(e) => handleInputChange(sectionIndex, e)}
                    placeholder="Section Description"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    rows="2"
                  />
                  <input
                    type="text"
                    name="background"
                    value={section.background}
                    onChange={(e) => handleInputChange(sectionIndex, e)}
                    placeholder="Background URL"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <input
                    type="text"
                    name="layout"
                    value={section.layout}
                    onChange={(e) => handleInputChange(sectionIndex, e)}
                    placeholder="Layout"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <div>
                    {section.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={image.url}
                          onChange={(e) => handleImageLinkChange(sectionIndex, imageIndex, e.target.value)}
                          placeholder="Image URL"
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(sectionIndex, imageIndex)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addImageLink(sectionIndex)}
                      className="text-blue-500"
                    >
                      Add Image Link
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="text-red-500 mt-2"
                  >
                    Remove Section
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSection}
                className="text-blue-500"
              >
                Add Section
              </button>
            </div>

            <div>
              <label className="block font-medium mb-2">Image Sections:</label>
              {imageSections.map((imageSection, sectionIndex) => (
                <div key={sectionIndex} className="mb-4 border p-4 rounded">
                  <div>
                    {imageSection.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={image.url}
                          onChange={(e) => handleImageLinkChange(sectionIndex, imageIndex, e.target.value)}
                          placeholder="Image URL"
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(sectionIndex, imageIndex, true)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addImageLink(sectionIndex)}
                      className="text-blue-500"
                    >
                      Add Image Link
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex, true)}
                    className="text-red-500 mt-2"
                  >
                    Remove Image Section
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageSection}
                className="text-blue-500"
              >
                Add Image Section
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {id ? 'Update Product' : 'Add Product'}
          </button>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 px-4 py-2 ml-2 bg-gray-800 text-white rounded"
          >
            Cancel
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
