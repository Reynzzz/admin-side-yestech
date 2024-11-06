import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateCategoryYestech } from "../../stores/actionCreator";
import { toast } from "react-toastify";
export default function EditCategoryYestech({categoryId,category}) {
  const dispatch = useDispatch()
  const [formData,setFormData] = useState({
    name : category.name
  })
  const HandleAddChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  async function handleSubmit(e) {
    try {
      e.preventDefault()
      await dispatch(updateCategoryYestech(formData,categoryId))
      document.getElementById(`my_modal_${categoryId}`).close()
      toast.success('Updated Successfuly')
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }
  return (
    <div>
      <button
       onClick={()=>document.getElementById(`my_modal_${categoryId}`).showModal()}
        className="flex items-center justify-center bg-sky-600 text-white text-xs py-1.5 px-4 rounded"
      >
        <FaEdit className="mr-1 font-bold text-base" /> Edit
      </button>
      <dialog id={`my_modal_${categoryId}`} className="modal">
        <div className="modal-box">
            <button onClick={() =>  document.getElementById(`my_modal_${categoryId}`).close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          <form onSubmit={handleSubmit}>
            <div className="">
            <div className="font-bold text-lg">Edit Region</div>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name Region :</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={formData.name}
                  onChange={HandleAddChange}
                  className="input input-bordered input-info"
                />
              </div>
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
