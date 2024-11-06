import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryProducts, fetchTypes } from '../../stores/actionCreator';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AddProducts = () => {
  const [sections, setSections] = useState([]);
  const [imageSections, setImageSections] = useState([]);
  const [activeTab, setActiveTab] = useState('section'); // Default to 'section' tab
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [parameters, setParameters] = useState([{ tHead: '', tBody: [''] }]);
  const [mainImg, setMainImg] = useState([]);
  const [categoryId,setCategoryId] = useState(null)
  const [typeId,setTypeId] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {categoryProducts} = useSelector((state) => state.categoryProducts)
  const {Types} = useSelector(state => state.Types)
  useEffect(() => {
    dispatch(fetchCategoryProducts())
    dispatch(fetchTypes())
  },[])
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
    // console.log(imagesArray,'ni log');
    
    setMainImg(imagesArray);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(mainImg);
    // console.log(parameters);
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('detailsHome', productDescription);
    formData.append('categoryId', categoryId);
    formData.append('typeId', typeId);
    formData.append('parameters', JSON.stringify(parameters));

    mainImg.forEach((img) => {
      // console.log(img);
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
      const response = await fetch('https://api-v1.yestech.id/products', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      // console.log(response)
      const data = await response.json();
      console.log('Saved Product:', data);
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

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
      <div className="lg:p-4 p-3 bg-slate-100 h-full relative">
        <div className="bg-white px-10 pt-10 pb-5 rounded-lg shadow-lg">
          <div className="flex flex-col  mb-5">
            <div>
              <label className="label">
                <span className="label-text text-lg font-semibold">Name:</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="input input-bordered w-full border-black focus:ring focus:ring-black"
              />
            </div>
            <div>
            <label className="label">
                <span className="label-text text-lg font-semibold">Category :</span>
              </label>
            <select 
    name="categoryId"
    onChange={(e) => setCategoryId(e.target.value)}
    value={categoryId}
    className="w-full focus:outline-none border border-black bg-transparent p-3  rounded-lg transition-opacity focus:border-black"
    style={{ 
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>')`, 
        backgroundRepeat: `no-repeat`, 
        backgroundPosition: `calc(100% - 10px) center`, 
        appearance: `none`,
        paddingRight: `30px` 
    }}
>
    <option value="" disabled selected hidden>Choose a Category</option>
    {categoryProducts.map(el => (
        <option 
            className="border text-base border-black bg-transparent p-2 option-animation hover:bg-gray-900" 
            value={el.id} 
            key={el.id}
        >
            {el.name}
        </option>
    ))}
</select>
            </div>
            <div>
            <label className="label">
                <span className="label-text text-lg font-semibold">Type :</span>
              </label>
            <select 
    name="typeId"
    onChange={(e) => setTypeId(e.target.value)}
    value={typeId}
    className="w-full focus:outline-none border border-black bg-transparent p-3  rounded-lg transition-opacity focus:border-black"
    style={{ 
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>')`, 
        backgroundRepeat: `no-repeat`, 
        backgroundPosition: `calc(100% - 10px) center`, 
        appearance: `none`,
        paddingRight: `30px` 
    }}
>
    <option value="" disabled selected hidden>Choose a Type</option>
    {Types.map(el => (
        <option 
            className="border text-base border-black bg-transparent p-2 option-animation hover:bg-gray-900" 
            value={el.id} 
            key={el.id}
        >
            {el.name}
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
              <label className="label">
                <span className="label-text text-lg font-semibold">Main Image:</span>
              </label>
              <input
                id='mainImg'
                type="file"
                multiple
                onChange={handleMainImageChange}
                className="file-input file-input-bordered w-full max-w-xs cursor-pointer focus:ring focus:ring-black"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {mainImg.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Main Image ${index}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="mb-4 space-y-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">Parameter Produk</label>
  {parameters.map((parameter, paramIndex) => (
    <div key={paramIndex} className="border border-gray-200 rounded p-4">
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={parameter.tHead}
          onChange={(e) => handleParameterChange(paramIndex, 'tHead', undefined, e.target.value)}
          className="block w-1/2 mr-2 px-2 py-1 border-gray-300 rounded-md shadow-sm focus:outline-none border text-sm"
          placeholder="Key"
          required
        />
        <button
          type="button"
          onClick={() => addParameterValue(paramIndex)}
          className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
        >
          Tambah Value
        </button>
      </div>
      {parameter.tBody.map((value, valueIndex) => (
        <div key={valueIndex} className="flex items-center mb-2">
          <input
            type="text"
            value={value}
            onChange={(e) => handleParameterChange(paramIndex, 'tBody', valueIndex, e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:outline-none border-b px-3 py-1 sm:text-sm mb-2"
            placeholder={`Value ${valueIndex + 1}`}
            required
          />
          <button
            type="button"
            onClick={() => removeParameterValue(paramIndex, valueIndex)}
            className="text-sm text-red-600 hover:text-red-700 focus:outline-none focus:underline ml-2"
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  ))}
  <button
    type="button"
    onClick={() => setParameters([...parameters, { tHead: '', tBody: [''] }])}
    className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
  >
    Tambah Parameter
  </button>
</div>





          </div>
          <div className="tabs tabs-bordered mb-5">
            <button
              className={`tab tab-bordered text-base ${activeTab === 'section' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('section')}
            >
              Upload Section
            </button>
            <button
              className={`tab tab-bordered ${activeTab === 'images' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('images')}
            >
              Upload Image
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              {activeTab === 'section' && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold">Add Section</p>
                    <button
                      type="button"
                      className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition duration-300"
                      onClick={addSection}
                    >
                      Add Section
                    </button>
                  </div>
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                      <div className="mb-4">
                        <label className="label">
                          <span className="label-text font-semibold">Title:</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Section Title"
                          name="title"
                          value={section.title}
                          onChange={(e) => handleInputChange(sectionIndex, e)}
                          className="input input-bordered w-full border-black focus:ring focus:ring-black"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="label">
                          <span className="label-text font-semibold">Description:</span>
                        </label>
                        <textarea
                          placeholder="Section Description"
                          name="description"
                          value={section.description}
                          onChange={(e) => handleInputChange(sectionIndex, e)}
                          className="textarea textarea-bordered w-full border-black focus:ring focus:ring-black"
                        ></textarea>
                      </div>
                      
                      <div className="mb-4">
                        <label className="label">
                          <span className="label-text font-semibold">Layout:</span>
                        </label>
                        <select
                          placeholder="Section Backround"
                          name="layout"
                          value={section.layout}
                          onChange={(e) => handleInputChange(sectionIndex, e)}
                          className="textarea textarea-bordered w-full border-black focus:ring focus:ring-black"
                        >
                          <option value="" disabled>
                    Select your Layout
                </option>
                <option value="teks-details-and-image-center"> teks-details and image center</option>
                <option value="teks-details-left-and-image-right">teks details left and image right</option>
                <option value="teks-details-right-and-image-left">teks details right and image left</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="label">
                          <span className="label-text font-semibold">Backround:</span>
                        </label>
                        <select
                          placeholder="Section Backround"
                          name="background"
                          value={section.background}
                          onChange={(e) => handleInputChange(sectionIndex, e)}
                          className="textarea textarea-bordered w-full  border-black focus:ring focus:ring-black"
                        >
                          <option value="" disabled>
                    Select your backround
                </option>
                <option value="bg-white">bg-white</option>
                <option value="bg-blue-800">bg-blue</option>
                        </select>
                      </div>
                      <div className="mb-4">
                     
                        <div className="flex flex-wrap gap-2 mt-2">
                          {section.images.map((image, imageIndex) => (
                            <div key={imageIndex} className="relative">
                              <img
                                src={image.url}
                                alt={`Section ${sectionIndex} Image ${imageIndex}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full hover:bg-red-800 transition duration-300"
                                onClick={() => removeImage(sectionIndex, imageIndex)}
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="label">
                          <span className="label-text font-semibold">Image Link:</span>
                        </label>
                        {section.images.map((image, imageIndex) => (
                          <input
                            key={imageIndex}
                            type="text"
                            placeholder="Image URL"
                            value={image.url}
                            onChange={(e) =>
                              handleImageLinkChange(sectionIndex, imageIndex, e.target.value)
                            }
                            className="input input-bordered w-full border-black focus:ring focus:ring-black mt-2"
                          />
                        ))}
                        <button
                          type="button"
                          className="mt-2 bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition duration-300"
                          onClick={() => addImageLink(sectionIndex)}
                        >
                          Add Image Link
                        </button>
                      </div>
                      <button
                        type="button"
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition duration-300"
                        onClick={() => removeSection(sectionIndex)}
                      >
                        Remove Section
                      </button>
                    </div>
                  ))}
                </>
              )}
              {activeTab === 'images' && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold">Add Image Section</p>
                    <button
                      type="button"
                      className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition duration-300"
                      onClick={addImageSection}
                    >
                      Add Image Section
                    </button>
                  </div>
                  {imageSections.map((imageSection, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                      <div className="mb-4">
                     
                        <div className="flex flex-wrap gap-2 mt-2">
                          {imageSection.images.map((image, imageIndex) => (
                            <div key={imageIndex} className="relative">
                              <img
                                src={image.url}
                                alt={`Image Section ${sectionIndex} Image ${imageIndex}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full hover:bg-red-800 transition duration-300"
                                onClick={() => removeImage(sectionIndex, imageIndex, true)}
                              >
                                X
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="label">
                          <span className="label-text font-semibold">Image Link:</span>
                        </label>
                        {imageSection.images.length > 0 && (
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={imageSection.images[0].url} // Allow only one image link
                            onChange={(e) =>
                              handleImageLinkChange(sectionIndex, 0, e.target.value)
                            }
                            className="input input-bordered w-full border-black focus:ring focus:ring-black mt-2"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition duration-300"
                        onClick={() => removeSection(sectionIndex, true)}
                      >
                        Remove Image Section
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300"
            >
              Save Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
