import React, { useState, useEffect } from 'react';
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { UserAuth } from '../../../context/AuthContext';

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { user, logOut } = UserAuth();
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/welcome');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      {user && (
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      )}

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">
            {user ? `Welcome, ${user.username || user.email}` : "Welcome to TheatreX"}
          </span>
          <span className="subTitle">
            {user ? "Discover your next favorite movie or TV show" : "Sign in to explore our collection"}
          </span>

          <div className="searchInput">
            <input
              type="text"
              placeholder='Search for movie or TV show...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={() => query.length > 0 && navigate(`/search/${query}`)}>
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;