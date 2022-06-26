import React, { useContext, useEffect, useState } from "react";

const Api_url = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setisError] = useState({ show: "false", msg: "" });
  const [query, setquery] = useState("titanic");
  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setisLoading(false);
        setMovie(data.Search);
      } else {
        setisError({ show: true, msg: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // if query is undefined, then get the default movie
    let timerout=setTimeout(() => {
      if (query === undefined) {
        getMovies(Api_url);
      } else {
        getMovies(`${Api_url}&s=${query}`);
      }
    }, 1000);
    return () => clearTimeout(timerout)
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie, query, setquery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
