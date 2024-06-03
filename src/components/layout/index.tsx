import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths } from "../../utilities/constant/appRoutes";
import ForgetPassword from "../pages/auth/forgetPassword";
import Login from "../pages/auth/login";
import ResetPassword from "../pages/auth/resetPassword";
import Signup from "../pages/auth/signUp";
import Dashboard from "../pages/dashboard";
import AuthLayout from "./AuthLayout";
import DashBoardLayout from "./DashboardLayout";
import { LOCAL_STORAGE_KEYS } from "../../utilities/constant/localStorageKeys";


const Layout = () => {
  
  const getUser = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER);
  const loginUser = getUser ? JSON.parse(getUser) : null;

  return (
    <Routes>
      {(loginUser) ? (
        <Route path={RoutePaths.Dashboard.INDEX} element={<DashBoardLayout />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      ) : (
        <>

          <Route path="" element={<AuthLayout />}>
            <Route path={RoutePaths.Auth.LOGIN} element={<Login />} />
             <Route path={RoutePaths.Auth.SIGN_UP} element={<Signup />} />
             <Route path={RoutePaths.Auth.FORGOT_EMAIL} element={<ForgetPassword />} />
              <Route path={RoutePaths.Auth.RESET_PASSWORD} element={<ResetPassword />} />
          </Route>
        </>
      )}

      
      <Route
        path="*"
        element={
          <Navigate
            to={
              (loginUser) ? "/dashboard" : "/"
            }
          />
        }
      />
    </Routes>
  );
};

export default Layout;
