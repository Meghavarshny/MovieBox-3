import { useState, useEffect } from "react";
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=b169cf0";
const movieTypes = [
  { value: "", label: "All Types" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "TV Series" },
  { value: "episode", label: "Episodes" }
];
function App() {
  const [movies, setMovies] = useState([])
  const [serachTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const searchMovies = async (title, type = "") => {
  if (!title.trim()) return;
  
  try {
    let apiurl ='${API_URL}&s=${title}';
    if(type) {
      apiurl += '&type=${type}';
    }
    const response = await fetch(apiurl);
    const data = await response.json();
    setMovies(data.Search || []);
  }catch (err) {
    setMovies([]);
  }
};

  useEffect(() => {
    searchMovies("Batman");
  const handleTypeChange = (newType) => {
  setSelectedType(newType);
  if (searchTerm.trim()) {
    searchMovies(searchTerm, newType);
  }
};
  }, []);


  return (
    <>
      <div className="app">
        <h1>MovieBox</h1>

        <div className="search">
          <input placeholder="Search for movies"
          
            value={BatMan}
            onClick={() => searchMovies(searchTerm)}/>

          <img src={SearchIcon} alt="search"  onClick={() => searchMovies(searchTerm, selectedType)} />
        </div>
        <div className="search">
  <select 
    value={selectedType} 
    onChange={(e) => handleTypeChange(e.target.value)}
    style={{color: '#a1a1a1', background: '#1f2123', border: 'none', padding: '10px', borderRadius: '5px'}}
  >
    {movieTypes.map((type) => (
      <option key={type.value} value={type.value}>{type.label}</option>
    ))}
  </select>
</div>

        {movies?.length > 0 ? (
          <div className="container">
          {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
           ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}

      </div>
    </>
  )
}

export default App;