import { Route, Routes, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";
import { logout, fetchUserAccount } from "./UserSlice";
import Category from "./Category";
import Product from "./Product";
import UnAuthorized from "./UnAuthorized";
import UserList from "./UserList";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import ApproveProducts from "./ApprovedProducts";
import ActivateUsers from "./ActivateUsers";
import ProductForm from "./ProductForm";
import CategoryForm from "./CategoryForm";
import MyProducts from "./MyProducts";
import ShowProduct from "./ShowProduct";
import "../App.css";

export default function ClassifiedApp() {
  const { isLoggedIn, data } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserAccount());
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        

        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Classified App</h2>
          </div>

          <div className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/account"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  Account
                </Link>

                {data.role === "admin" && (
                  <Link
                    to="/category"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    Category
                  </Link>
                )}

                {data.role === "admin" && (
                  <Link
                    to="/approveproducts"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    ApprovedProducts
                  </Link>
                )}
                {data.role === "admin" && (
                  <Link
                    to="/activateusers"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    ActivateUsers
                  </Link>
                )}
                {data.role === "admin" && (
                  <Link
                    to="/userlist"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    UserList
                  </Link>
                )}

                
                  <Link
                    to="/product"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    Product
                  </Link>
                

                <button
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route
            path="/category"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={['admin']}>
                  <Category />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/product"
            element={
              <Product />
            }
          />
          <Route
            path="/myproducts"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={['seller']}>
                  <MyProducts />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/approveproducts" element={<ApproveProducts />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/categoryform" element={<CategoryForm />} />
          <Route path="/showproduct/:id" element={<ShowProduct />} />
          
    

          <Route path="/activateusers" element={<ActivateUsers />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
        </Routes>
      </div>
    </div>
  );
}
