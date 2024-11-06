import React, { useState } from 'react';
import vidoeBackround from '../../assets/LED Countdown.mp4';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { HandleLogin } from '../../stores/actionCreator';
import { useNavigate } from 'react-router-dom';
const LoginAuth = () => {
  const dispact = useDispatch()
  const navigation = useNavigate()
  const input = {
    email : "",
    password : ""
  }
  const [data,setData] = useState(input)
  const handleChangeLogin = (event) => {
    const {name,value} = event.target
    setData({
        ...data,
        [name] : value
    })
    // console.log(value);
}
async function handleLogin(event){
  try {

  event.preventDefault()
  await dispact(HandleLogin(data))
   navigation('/dashboard')
toast.success('Berhasil Login')
} catch (error) {
  // console.log(error,'ni error');
  toast.error(error.message, {
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
    <section className="min-h-screen flex items-stretch text-white">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/low-angle-view-illuminated-lights_1048944-19728138.jpg?ga=GA1.1.102671986.1715597657&semt=ais_hybrid)",
        }}
      >
        {/* Overlay with black opacity */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="w-full px-24 z-10 text-gray-100">
          <h1 className="text-5xl font-bold text-left tracking-wide">
            Yestech Admin
          </h1>
          <p className="text-3xl my-4">
            This is the admin side for uploading data.
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-gray-900">
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/h8zb3jmn4/Desktop%200.jpg?updatedAt=1708492114240);",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        
        <div className="w-full py-6 z-20">
          <h1 className="my-6 ml-28">
            <img
              className="w-[240px]"
              src="https://www.yes-led.com/dist/images/logo2.png"
              alt="Logo"
            />
          </h1>

          <form onSubmit={handleLogin} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
            <div className="pb-2 pt-4">
              <input
                 type="email"
                 onChange={handleChangeLogin}
                 value={data.email}
                 name="email"
                 id="email"
                 placeholder="Email"
                className="block w-full p-3 text-base rounded-lg focus:outline-none bg-black"
              />
            </div>
            <div className="pb-2 pt-4 relative">
              <input
                className="block w-full p-3 pr-12 text-base rounded-lg focus:outline-none bg-black"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChangeLogin}
                value={data.password}
              />
              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400 focus:outline-none"
                type="button"
              >
                {/* Password toggle icon goes here */}
              </button>
            </div>

            <div className="px-2 pb-2 pl-20 pt-4">
              <button
                type="submit"
                className="uppercase block font-semibold w-[150px] p-2 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginAuth;
