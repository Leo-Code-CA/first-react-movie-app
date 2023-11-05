import React, { useState } from 'react';

const Filter = ({ label, options, movies, setMovies, searchTerm, serachMovies }) => {

    const [select, setSelect] = useState(false);
    const [click, setClick] = useState(true);
    const [classNameTvShows, setClassNameTvShows] = useState(false)
    const [classNameMovies, setClassNameMovies] = useState(false)
    const [classNameOld, setClassNameOld] = useState(false)
    const [classNameInBetween, setClassNameInBetween] = useState(false)
    const [classNameNew, setClassNameNew] = useState(false)

    const handleNoFilterClick = (filterParameter) => {
        
        serachMovies(searchTerm);
        setSelect(false);
        setClick(!click)

        if (filterParameter === "TV shows") {
            setClassNameTvShows(!classNameTvShows)
        } else if (filterParameter === "movie") {
            setClassNameMovies(!classNameMovies)
        } else if (filterParameter === "Before 2000") {
            setClassNameOld(!classNameOld)
        } else if (filterParameter === "Between 2000 and 2020") {
            setClassNameInBetween(!classNameInBetween)
        } else {
            setClassNameNew(!classNameNew)
        }
    }

    const handleFilterClick = (filterParameter, whichButton) => {
        
        if (whichButton === "Content Type") {

            if (movies?.length > 0) {
            
                const filterMovies = movies.filter((movie) => 
                filterParameter === "TV shows" ? movie.Type === "series" : movie.Type === "movie");
                
                setSelect(false)
                setClick(!click)
                setMovies(filterMovies);
          
                if (filterParameter === "TV shows") {
                    setClassNameTvShows(!classNameTvShows)
                } else {
                    setClassNameMovies(!classNameMovies)
                }
            }

        } else {

            if (movies?.length > 0) {
            
                const filterMovies = movies.filter((movie) => 
                
                filterParameter === "Before 2000" 
                ? Number((movie.Year).slice(-4)) < 2000
                : filterParameter === "After 2020"
                ? Number((movie.Year).slice(-4)) > 2020
                : Number((movie.Year).slice(-4)) >= 2000 && Number((movie.Year).slice(-4)) <= 2020);
                
                setSelect(false)
                setMovies(filterMovies);
                setClick(!click)
             
                if (filterParameter === "Before 2000") {
                    setClassNameOld(!classNameOld)
                } else if (filterParameter === "Between 2000 and 2020") {
                    setClassNameInBetween(!classNameInBetween)
                } else {
                    setClassNameNew(!classNameNew)
                }
            }

        }
    }
     
    const handleClassName = (filterParameter) => {

        if (filterParameter === "TV shows") {
         return classNameTvShows ? "app__filters-filter--active" : "app__filters-filter--neutral" 
        } else if (filterParameter === "movie") {
         return classNameMovies ? "app__filters-filter--active" : "app__filters-filter--neutral" 
        } else if (filterParameter === "Before 2000") {
           return classNameOld ? "app__filters-filter--active" : "app__filters-filter--neutral"
        } else if (filterParameter === "Between 2000 and 2020") {
           return classNameInBetween ? "app__filters-filter--active" : "app__filters-filter--neutral"
        } else {
           return classNameNew ? "app__filters-filter--active" : "app__filters-filter--neutral" 
        }
    }
        
    return (
        
        <div className='app__filters-filter'>
            
            <button 
            type='button' 
            onClick={() => {select ? setSelect(false) : setSelect(true)}}
            className="app__filters-filter-btn">
                {label}
            </button>
            
            {select &&
            (<ul>
                {options.map((option) => 
                (<li
                key={option}
                value={option} 
                onClick={() => click ? handleFilterClick(option, label) : handleNoFilterClick(option)}
                className={handleClassName(option)}>
                    {option}
                </li>))}
            </ul>)}
        </div>
    );
}

export default Filter;