import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import './Footer.scss';

const Footer = () => {
  const { user } = UserAuth();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <Link to="/" className="logo">
              <span className="logo-text">Theatre</span>
              <span className="logo-dot">.</span>
            </Link>
            <p className="footer-slogan">
              Your ultimate destination for movies and TV shows
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-title">Navigation</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/explore/movie">Movies</Link></li>
                <li><Link to="/explore/tv">TV Shows</Link></li>
                {!user && <li><Link to="/welcome">Sign In</Link></li>}
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Legal</h3>
              <ul>
                <li><Link to="/">Terms of Use</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
                <li><Link to="/">Cookie Policy</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Connect</h3>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Theatre.com. All rights reserved.
          </p>
          <div className="footer-credits">
            <span>Powered by TMDB API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;