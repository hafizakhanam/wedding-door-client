import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/manageItems/manageItems";
import UpdateItem from "../pages/Dashboard/EditBioData/EditBioData"; 
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
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

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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
          path: '/menu',
          element: <Menu></Menu>
        },
        {
          path: '/order/:category',
          element: <Order></Order>
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
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },

        // Admin routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'manageItems',
          element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
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
          path: 'updateItem/:id',
          element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        }
      ]
    },
]);