import { createBrowserRouter,redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Banner from "../components/Banner/Banner";
import AddProducts from "../components/Products/AddProducts";
import Products from "../components/Products/Products";
import News from "../components/news/News";
import CaseList from "../components/caseList/CaseList";
import YestechOwner from "../components/Yestech owner/YestechOwner";
import  LoginAuth  from "../components/auth/LoginAuth";
import AddNews from "../components/news/Add-News";
import MainLayout from "../MainLayout";
import EditNews from "../components/news/EditNews";
import EditProduct from "../components/Products/EditProduct";
import CategoryYestech from "../components/Yestech owner/CategoryYestech";
import AddCaseList from "../components/caseList/AddCaseList";
import EditCaseList from "../components/caseList/EditCaseList";
import CategoryProducts from "../components/Products/CategoryProducts";
import TypeProducts from "../components/Products/TypeProducts";
import Warehouse from "../components/Warehouse/Warehouse";
import History from "../components/History/History";
const checkAuth = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");
    if (!isAuthenticated) {
        return redirect("/");
    }
    return null;
};


const router = createBrowserRouter([
    {
        element : <MainLayout/>,
        children : [
            {
                element : <Dashboard/>,
                path : '/dashboard',
                loader: checkAuth,
            },
            {
                element : <Banner/>,
                path : '/Banner',
                loader: checkAuth,
            },
            {
                element : <AddProducts/>,
                path : '/Add-Product',
                loader: checkAuth,
            },
            {
                element : <Products/>,
                path : '/products',
                loader: checkAuth,
            },
            {
                element : <News/>,
                path : '/news',
                loader: checkAuth,
            },
            {
                element : <CaseList/>,
                path : '/case-list',
                loader: checkAuth,
            },
            {
                element : <EditCaseList/>,
                path : '/edit-case/:id',
                loader: checkAuth,
            },
            {
                element : <YestechOwner/>,
                path : '/yestech-owner',
                loader: checkAuth,
            },
            {
                element : <AddNews/>,
                path : '/addnews',
                loader: checkAuth,
            },
            {
                element : <EditNews/>,
                path : '/edit-news/:id',
                loader: checkAuth,
            },
            {
                element : <EditProduct/>,
                path : '/edit-product/:id',
                loader: checkAuth,
            },
            {
                element : <CategoryYestech/>,
                path : '/yestech-owner/region',
                loader: checkAuth,
            },
            {
                element : <AddCaseList/>,
                path : '/add-caselist',
                loader: checkAuth,
            },
            {
                element : <CategoryProducts/>,
                path : '/products/categories',
                loader: checkAuth,
            },
            {
                element : <TypeProducts/>,
                path : '/products/types',
                loader: checkAuth,
            },
            {
                element : <Warehouse/>,
                path : '/warehouse',
                loader: checkAuth,
            },
            {
                element : <History/>,
                path : '/history',
                loader: checkAuth,
            }
        ]
    },
    {
        element : <LoginAuth/>,
        path : '/',
        loader: () => {
            if (localStorage.getItem("access_token")) {
                // Redirect to home if already logged in
                return redirect("/dashboard");
            }
            return null;
        },
    }
])

export default router