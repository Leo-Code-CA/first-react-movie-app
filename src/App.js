import React, { useState, useEffect } from "react";
import MovieCard from './movieCard';
import SearchIcon from "./search.svg";
import Filter from "./buttons";
import './app.css';

const API_URL = "http://www.omdbapi.com?apikey=da0b164d";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdown, setDropdown] = useState(false);

    const serachMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        serachMovies("action");
    }, []);

    useEffect(() => {
        serachMovies(searchTerm);
    }, [searchTerm]);

    const handleDropDownClick = (movie) => {
        setSearchTerm(movie);
        setDropdown(false);
    }

    const handleKeyDown = (e) => {
       setDropdown(true);
       e === "Enter" && setDropdown(false);
    }

    return (

        <div className="app">
            
            <h1 className="app__title">MovieLand</h1>

            <div className="app__searchbox">
            
                <div className="app__searchbox-input">
                    <input
                        className="app__searchbox-input-field"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {setSearchTerm(e.target.value)}}
                        onKeyDown={(e) => handleKeyDown(e.key)}
                    />
                    <img
                        className="app__searchbox-input-icon"
                        src={SearchIcon} 
                        alt="search"
                        onClick={() => handleDropDownClick(searchTerm)}
                    />
                </div>

            
                <div className="app__searchbox-dropdown">
                
                    <ul>
                        {dropdown 
                        ? (
                            movies?.length > 0 && (movies.map((movie) => (
                            <li
                            tabIndex="2"
                            key="movie.imdbID"
                            role="button"
                            onClick={() => handleDropDownClick(movie.Title)}>
                                {movie.Title} 
                            </li>)))
                        ) : (
                            null
                        )}
                    </ul>
                </div>

            </div>

            <div className="app__filters">

            <Filter 
            label="Content Type" 
            options={["TV shows", "Movies"]} 
            movies={movies}
            setMovies={setMovies}
            searchTerm={searchTerm}
            serachMovies={serachMovies}
            />

            <Filter 
            label="Release Date" 
            options={["Before 2000", "Between 2000 and 2020", "After 2020"]} 
            movies={movies}
            setMovies={setMovies}
            searchTerm={searchTerm}
            serachMovies={serachMovies}
            />

            </div>

            {
                movies?.length > 0 
                    ? (
                        <div className="app__gallery">
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie}/>
                            ))}
                            <div className="app__gallery-filler"></div>
                            <div className="app__gallery-filler"></div>
                        </div>
                    ) : (
                        <div className="app__empty">
                            <h2>
                               <span>No </span>
                               <span>Movies </span>
                               <span>Found</span>
                            </h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;

