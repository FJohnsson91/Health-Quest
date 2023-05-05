import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./pages/Home";
import Registration from "./pages/Register";
import Login from "./pages/Login";
import NavigationMenu from "./components/navMenu";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard"
import RequireAuth from './components/requireAuth';
import Unauthorized from './components/Unauthorized';
import useAuth from './hooks/useAuth';
import axios from './api/axios';
import ActivityTable from './pages/adminActivity';
import AdminUsersView from './pages/adminUsers';
import UserActivityTable from './pages/userActivity';


export default function App() {
  const navigate = useNavigate();
  const {setAuth } = useAuth();



  useEffect(() => {

    try {
      const token = localStorage.getItem("token")
      if (token) {
        axios.get('/me', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        }).then((resp) => {
          // console.log(resp)
          const role = resp?.data?.role;
          setAuth({ user: resp?.data, role, token });
        })
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }
    



  }, [])

  return (

    <>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/Register" element={<Registration />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/Login" element={<Login />} />


        <Route element={<RequireAuth allowedRole="user" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRole="user" />}>
          <Route path="/activity" element={<UserActivityTable />} />
        </Route>

        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="/admin/activity" element={<ActivityTable />} />
        </Route>
        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="/admin/users" element={<AdminUsersView />} />
        </Route>

      </Routes>
    </>

  )
}
