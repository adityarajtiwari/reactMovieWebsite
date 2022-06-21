import React, { useContext, useEffect, useState } from "react";

const Api_url = `http://www.omdbapi.com/?i=tt3896198&apikey=8d2763c6&s=titanic`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setisError] = useState({ show: "false", msg: "" });
  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === 'True') {
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
    getMovies(Api_url);
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
