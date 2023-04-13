import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchMoviesHandler = () => {
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           title: movieData.title,
  //           id: movieData.episode_id,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });

  //       setMovies(transformedMovies);
  //     });
  // };

  // const fetchMoviesHandler = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch("https://swapi.dev/api/films");

  //     if (!response.ok) {
  //       throw new Error("Something went wrong.");
  //     }

  //     const data = await response.json(); // convert JSON to JS
  //     const transformedMovies = data.results.map((movieData) => {
  //       return {
  //         title: movieData.title,
  //         id: movieData.episode_id,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       };
  //     });
  //     setMovies(transformedMovies);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-part10-http-requests-default-rtdb.firebaseio.com/movies.json"
      ); // Firebase api link

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const data = await response.json();
      console.log(data);

      let loadedMovies = [];

      for (const key in data) {
        loadedMovies = [
          ...loadedMovies,
          {
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          },
        ];
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); // since such functions may change depending on some external state (not in this example)

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-part10-http-requests-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie), // convert JS to JSON
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
