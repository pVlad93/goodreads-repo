import { Route, Router, Routes } from "react-router"
import BooksScreen from "./components/BooksScreen"
import LoginComponent from "./components/LoginComponent"
import ButtonAppBar from "./components/layout/ButtonAppBar"
import LoginFinal from "./components/LoginFinal"
import { useEffect, useState } from "react"
import AddBook from "./components/AddBook"

function App() {

  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("jwtToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    }
  }, [])

  return (
    <>
        <ButtonAppBar token={token} setToken={setToken} />
        <Routes>
          <Route path="/login" element={<LoginComponent setToken={setToken}/>} />
          <Route path="/login2" element={<LoginFinal setToken={setToken}/>} />
          <Route path="/" element={<BooksScreen token = {token}/>} />
          <Route path="/book" element={<AddBook token = {token}/>} />
        </Routes>
    </>
  )
}

export default App
