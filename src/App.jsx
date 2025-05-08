import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {fetchDataFromApi} from "./utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { AuthContextProvider } from './context/AuthContext';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Welcome from './pages/auth/Welcome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state)=>state.home);
  console.log(url);

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res)=>{
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url))
      });
  };

  const genresCall = async ()=>{
    let promises = [];
    let endPoints = ["tv","movie"];
    let allGenres = {};

    endPoints.forEach((url) =>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres}) =>{
      return genres.map((item)=>(allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/:mediaType/:id' element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          } />
          <Route path='/search/:query' element={
            <ProtectedRoute>
              <SearchResult />
            </ProtectedRoute>
          } />
          <Route path='/explore/:mediaType' element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          } />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App;