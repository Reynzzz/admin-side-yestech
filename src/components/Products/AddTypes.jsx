import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCategoryProducts, postCategoryYestech, postTypes } from '../../stores/actionCreator';
import { toast } from 'react-toastify';

export default function AddTypes() {
  const [data, setData] = useState({ name: '' });
  const dispatch = useDispatch();

  const HandleAddChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(postTypes(data));
      document.getElementById('my_modal_add').close();
      setData('')
      toast.success('Category added successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add category!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <div>
      <button
        onClick={() => document.getElementById('my_modal_add').showModal()}
        className="btn bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2"
      >
        Add Type
      </button>
      <dialog id="my_modal_add" className="modal">
        <div className="modal-box">
          <button
            onClick={() => document.getElementById('my_modal_add').close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="font-bold text-lg">Add Type</div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name :</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
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
