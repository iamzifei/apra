import * as React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useAlbumsContext } from "context/AlbumsContext";
import { API_URL, PAGE_LIMIT, TOTAL_IMAGES } from "appConstants";

export default function SearchBox() {
  const { setAlbums, keyword, setKeyword } = useAlbumsContext();
  const [search, setSearch] = React.useState(keyword);

  const handleSearch = () => {
    setKeyword(search);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <Paper
      sx={{
        p: "2px 4px",
        m: "24px 0",
        display: "flex",
        alignItems: "center",
        width: {
          xs: 300,
          sm: 400,
        },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search album"
        inputProps={{ "aria-label": "search album" }}
        onChange={handleChange}
        value={search}
      />
      <IconButton sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
