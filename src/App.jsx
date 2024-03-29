import { createContext, useEffect, useState } from "react";
import Kana from "vndb-api-kana";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Detail from "./components/Detail";
import Search from "./components/Search";
import SearchDev from "./components/SearchDev";
import About from "./components/About";
import Footer from "./Footer";
import SearchTag from "./components/SearchTag";
import SearchDevice from "./components/SearchDevice";
import Rating from "./components/Rating";

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
          <Route path="/vn/:id" element={<Detail/>}></Route>
          <Route path="/producer/:id" element={<SearchDev/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/tag" element={<SearchTag/>}></Route>
          <Route path="/platform" element={<SearchDevice/>}></Route>
          <Route path="/rating" element={<Rating/>}></Route>
        </Routes>
        <Footer></Footer>
      </AppProvider.Provider>
    </>
  );
}

export default App;
