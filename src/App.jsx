import { createContext, useEffect, useState } from "react";
import Kana from "vndb-api-kana";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const kana = new Kana({
  baseURL: "https://api.vndb.org/kana",
});

export const AppProvider = createContext();

function App() {

  const [isLogin, setIsLogin] =useState(false)
  const [count, setCount] = useState(0);


  const getData = () => {
    
  }
  


  return (
    <>
      <AppProvider.Provider value={isLogin}>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/sign-up' element={<SignUp/>}></Route>
          <Route path='/sign-in' element={<SignIn/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </AppProvider.Provider>
    </>
  );
}

export default App;
