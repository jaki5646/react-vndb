import { createContext, useEffect, useState } from "react";
import Kana from "vndb-api-kana";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./App.css";

const kana = new Kana({
  baseURL: "https://api.vndb.org/kana",
});

const AppProvider = createContext();

function App() {
  const fetchData = () => {
    
  };


  const [novel, setNovel] =useState([])
  const [count, setCount] = useState(0);


  const getData = () => {
    
  }
  
  
  console.log(novel)


  return (
    <>
      <AppProvider.Provider value={novel}>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </AppProvider.Provider>
    </>
  );
}

export default App;
