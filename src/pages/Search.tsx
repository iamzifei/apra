import React from "react";
import Box from "@mui/material/Box";
import SearchBox from "components/SearchBox";
import AlbumTable from "components/AlbumTable";
import { AlbumsContextProvider } from "context/AlbumsContext";

function Search() {
  return (
    <AlbumsContextProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          height: "100vh",
        }}
      >
        <Box sx={{ typography: "h3" }}>Search album</Box>
        <SearchBox />
        <AlbumTable />
      </Box>
    </AlbumsContextProvider>
  );
}

export default Search;
