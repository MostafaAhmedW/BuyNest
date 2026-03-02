import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(null);

  useEffect(function () {
    const savedToken = localStorage.getItem("userToken");

    if (savedToken) {
      setIsLoggedIn(true);
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  function login(userToken) {
    localStorage.setItem("userToken", userToken);
    setIsLoggedIn(true);
    setToken(userToken);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    setToken(null);
  }

  return (
    <authContext.Provider value={{ login, logOut, isLoggedIn, token, loading }}>
      {children}
    </authContext.Provider>
  );
}
