import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postHistory } from '../../stores/actionCreator';
// Import the action creator

const AddHistory = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [image, setimage] = useState('');
  const [preview, setPreview] = useState('');

  const dispatch = useDispatch(); // Initialize useDispatch

  const handleimageChange = (e) => {
    const link = e.target.value;
    setimage(link);
    if (link.match(/\.(jpeg|jpg|gif|png)$/)) {
      setPreview(link);
    } else {
      setPreview('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      year,
      image,
    };
    dispatch(postHistory(formData)); // Dispatch the action with form data
   
    setName('');
    setYear('');
    setimage('');
    setPreview('');
    // Close the modal
    document.getElementById('my_modal_3').close();
  };

  return (
    <div>
      <button className="btn bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2" onClick={() => document.getElementById('my_modal_3').showModal()}>
        Add History
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById('my_modal_3').close()}>
              ✕
            </button>

            {/* Name Input */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
              />
            </div>

            {/* Year Input */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="number"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="input input-bordered"
              />
            </div>

            {/* Image Link Input */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Image Link</span>
              </label>
              <input
                type="text"
                placeholder="Enter image link"
                value={image}
                onChange={handleimageChange}
                className="input input-bordered"
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Image Preview" className="rounded-lg max-w-full h-auto" />
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddHistory;
