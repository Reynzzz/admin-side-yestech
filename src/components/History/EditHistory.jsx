import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { updateHistoryYestech } from '../../stores/actionCreator';
import { toast } from 'react-toastify';
export default function EditHistory({id,history}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name : history.name,
    year : history.year,
    image : history.image

  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
    const closeModal = () => {
        const modal = document.getElementById(`my_modal_${id}`);
        if (modal) {
          modal.close();
        }
      };
      async function handleSubmit(e) {
        try {
          e.preventDefault()
          await dispatch(updateHistoryYestech(formData,id))
          document.getElementById(`my_modal_${id}`).close()
          toast.success('Updated Successfuly')
        } catch (error) {
          console.log(error);
          toast.error(error)
        }
      }
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
        <form  onSubmit={handleSubmit}>
          <div className="">
            <div className="font-bold text-lg">Edit Data</div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name :</span>
              </label>
              <input
                type="text"
                name="name"
               value={formData.name}
               onChange={handleInputChange}
                className="input input-bordered input-info"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">year :</span>
              </label>
              <textarea
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="textarea textarea-info"
               
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Link Image :</span>
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="input input-bordered input-info"
              />
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
  )
}
