
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import store from './stores';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router}/>
    <ToastContainer/>
    </Provider>
    </>


  )
}

export default App
