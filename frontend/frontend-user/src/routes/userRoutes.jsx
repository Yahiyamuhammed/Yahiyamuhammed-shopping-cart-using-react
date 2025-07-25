import { Route, Routes } from "react-router-dom";
import Login from '../pages/Login.jsx'
import Navbar from "../components/navbar.jsx";
import Signup from "../pages/user/SignUp.jsx";
import Products from "../pages/user/products.jsx";
import ProductDetails from "../pages/user/ProductDetails.jsx";
import VerifyOtp from "../pages/user/VerifyOtp.jsx";
import HomePage from "@/pages/user/HomePage.jsx";
// import TestGoogleLogin from "../pages/user/TestGoogle.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="mb-18">
        <Navbar />
      </div>
      {children}
    </>
  );
};

const UserRoutes=()=>(
<Routes>
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/login" element={
        <MainLayout>
            <Login />
        </MainLayout>
    } />
    {/* <Route path="/login" element={<Login />} /> */}
    <Route path="/signup" element={
        <MainLayout>
            <Signup />
        </MainLayout>
        } />
    <Route path="/verify-otp/:email" element={
        <MainLayout>
            <VerifyOtp />
        </MainLayout>
        } />
    <Route path="/" element={
        <MainLayout>
            <HomePage />
        </MainLayout>
        } />
    <Route path="/products" element={
        <MainLayout>
            <Products />
        </MainLayout>
        } />
    <Route path="/products/:id/:brand" element={
        <MainLayout>
            <ProductDetails />
        </MainLayout>
        } />
</Routes>
)
export default UserRoutes