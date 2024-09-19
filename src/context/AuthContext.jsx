import { useContext, createContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(false)
  const login = (userData) => {
    setUser(userData);
  console.log(user);

  };

  const logout = () => {
    setLoading(true)
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false)

  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loading}}>
      {children}
    </AuthContext.Provider>
  );
};
