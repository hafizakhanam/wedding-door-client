import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import BioDatas from "../pages/BioDatas/BioDatas";
import BioDataDetails from "../pages/BioDataDetails/BioDataDetails";
import Favourite from "../pages/Dashboard/Favourite/Favourite";
import EditBioData from "../pages/Dashboard/EditBioData/EditBioData";
import AddBioData from "../pages/Dashboard/AddBioData/AddBioData";
import ViewBioData from "../pages/Dashboard/ViewBioData/ViewBioData";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import Checkout from "../pages/Dashboard/Checkout/Checkout";
import ContactReq from "../pages/Dashboard/ContactReq/ContactReq";
import ApprovedContact from "../pages/Dashboard/ApprovedContact/ApprovedContact";
import ApprovedPremium from "../pages/Dashboard/ApprovedPremium/ApprovedPremium";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/bioData',
          element: <BioDatas></BioDatas>
        },
        {
          path: '/about',
          element: <AboutUs></AboutUs>
        },
        {
          path: '/contact',
          element: <ContactUs></ContactUs>
        },
        {
          path: "/bioData/:id",
          element: <PrivateRoute><BioDataDetails></BioDataDetails></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/bioData/${params.id}`)
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'addBioData',
          element: <AddBioData></AddBioData>
        },
        {
          path: 'editBioData/email/:email',
          element: <EditBioData></EditBioData>,
          loader: ({params}) => fetch(`http://localhost:5000/bioData/email/${params.email}`)
        },
        {
          path: 'viewBioData/email/:email',
          element: <ViewBioData></ViewBioData>,
          loader: ({params}) => fetch(`http://localhost:5000/bioData/email/${params.email}`)
        },
        {
            path: 'favourite',
            element: <Favourite></Favourite>
        },
        {
            path: 'contactReq',
            element: <ContactReq></ContactReq>
        },
        {
          path: 'checkout',
          element: <Checkout></Checkout>
        },


        // Admin routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'approvedPremium',
          element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>
        },
        {
          path: 'approvedContact',
          element: <AdminRoute><ApprovedContact></ApprovedContact></AdminRoute>
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    },
]);