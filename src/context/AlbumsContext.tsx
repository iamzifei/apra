import * as React from "react";
import { Album, AlbumsContextState } from "types/Album";
import { API_URL, PAGE_LIMIT, TOTAL_IMAGES } from "appConstants";
import mockData from "fixtures/mockAlbums.json";

// create a context for albums
const AlbumsContext = React.createContext<AlbumsContextState>({
  albums: [],
  setAlbums: () => {},
  keyword: "",
  setKeyword: () => {},
});

// create a context provider for albums
const AlbumsContextProvider: React.FC = ({ children }) => {
  // create a state for albums
  const [albums, setAlbums] = React.useState<Album[]>([]);

  const [keyword, setKeyword] = React.useState<string>("");

  // return a provider for albums
  return (
    <AlbumsContext.Provider value={{ albums, setAlbums, keyword, setKeyword }}>
      {children}
    </AlbumsContext.Provider>
  );
};

const useAlbumsContext = () => React.useContext(AlbumsContext);

export { AlbumsContextProvider, AlbumsContext, useAlbumsContext };
