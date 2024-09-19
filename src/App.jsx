import "./App.css";
import { Login } from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { UpdateClinic } from "./pages/UpdateClinic";
import { Navigate } from "react-router-dom";
import { CreateAdmin } from "./pages/CreateAdmin";
import { AdminDashboard } from "./pages/AdminDaghboard";

function App() {
  const { user } = useAuth();
  console.log(user);
  const isSuperAdmin = user && user.role.id === 1;
  return (
    <>
 <Routes>
        <Route
          path="/login"
          element={
            user ? (
              isSuperAdmin ? (
                <Navigate to="/Dashboard" />
              ) : (
                <Navigate to="/admin" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route path="/CreateAdmin" element={<CreateAdmin/>}/>
        <Route
          path="/Dashboard"
          element={
            user ? (
              isSuperAdmin ? (
                <Dashboard />
              ) : (
                <Navigate to="/admin" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* <Route path="/CreateAdmin" element={<CreateAdmin />} /> */}
        <Route path="*" element={<Navigate to={user ? "/Dashboard" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
