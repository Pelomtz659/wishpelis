import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillPlayCircle } from 'react-icons/ai';
import { Container } from "./NavBar";
import '../Styles/Videos.css';
import NoImg from '../images/NoImage.png';
import { ClipLoader } from 'react-spinners';

function Movies() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cachedData, setCachedData] = useState({});

  const Shown = input ? 'search' : 'discover';
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const Images = 'https://image.tmdb.org/t/p/w500/';
  const apiKey = "14ff91a863b8e17b55a1d3a9b47f4b7a";

  const MovieCall = async () => {
    if (cachedData[currentPage]) {
      setMoviesData(cachedData[currentPage]);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const { data } = await axios.get(Api, {
          params: {
            api_key: apiKey,
            query: input,
            page: currentPage,
          }
        });

        setTotalPages(data.total_pages);

        const forbiddenWordsRegex = /\b(porn|hot|sex|sexo|xxx|sexy|x|adult|nude|erotic|naked|sensual|explicit|kinky|naughty|desnudo|erótico|sensual|explícito|atrevido|caliente|picante|lujurioso|porno|pron|pr0n|seks|성인용품|色情|色情|порн|सेक्स|अश्लील|เพศ|جنسي|პორნო|gay|lesbian|homosexual|homofobia|homophobe|nazis|hitler|hater|nazi|negro|racist|race|white power|hate|abuse|molest|violence|terror|genocide|dictator|atrocity|evil|inhuman|barbaric|cruel)\b/i;
        const hasForbiddenWords = forbiddenWordsRegex.test(input);

        if (hasForbiddenWords) {
          setMoviesData([]);
        } else {
          const filteredMovies = data.results.map((movie) => ({
            ...movie,
            adult: forbiddenWordsRegex.test(movie.title) || forbiddenWordsRegex.test(movie.overview) || movie.adult,
          })).filter((movie) => !movie.adult);

          setCachedData(prev => ({
            ...prev,
            [currentPage]: filteredMovies
          }));

          setMoviesData(filteredMovies);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching the movie data:", error);
        setLoading(false);
      }
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    MovieCall();
  }, [input]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className={`movies-container ${loading ? 'loading' : ''}`}>
          {loading ? (
            <div className="spinner-container">
              <ClipLoader color="#EE9800" size={50} />
            </div>
          ) : moviesData.length === 0 ? (
            <img src={NoImg} alt="No Results" />
          ) : (
            moviesData.map((movie) => (
              <Fragment key={movie.id}>
                <div id='container'>
                  <AiFillPlayCircle id="playIcon" />
                  <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt={movie.title} />
                  <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''}>{movie.title}</h3>
                </div>
              </Fragment>
            ))
          )}
        </div>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={prevPage} className="prevButton">
              Prev
            </button>
          )}
          <span className="pageInfo">Page {currentPage} of {totalPages}</span>
          {currentPage < totalPages && (
            <button onClick={nextPage} className="nextButton">
              Next
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Movies;
