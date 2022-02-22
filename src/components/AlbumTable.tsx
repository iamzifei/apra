import * as React from "react";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Album } from "types/Album";
import { useAlbumsContext } from "context/AlbumsContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { API_URL, PAGE_LIMIT, TOTAL_IMAGES } from "appConstants";

interface Column {
  id: "id" | "title" | "thumbnailUrl";
  label: string;
  width?: number;
  align?: "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Id", width: 120 },
  { id: "title", label: "Title" },
  { id: "thumbnailUrl", label: "Thumbnail", width: 180 },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AlbumTable() {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(PAGE_LIMIT);

  const [selectedAlbum, setSelectedAlbum] = React.useState<Album | undefined>(
    undefined
  );

  const { albums, setAlbums, keyword } = useAlbumsContext();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    const url = `${API_URL}?_page=${page + 1}&_limit=${rowsPerPage}`;
    axios
      .get(keyword ? `${url}&q=${keyword}` : url)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => console.log(error));
  }, [rowsPerPage, page, keyword, setAlbums]);

  const handleThumbnailOpen = (album: Album) => {
    setSelectedAlbum(album);
  };

  const handleThumbnailClose = () => {
    setSelectedAlbum(undefined);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: {
          xs: 300,
          sm: 400,
          md: "90%",
        },
        overflow: "hidden",
      }}
    >
      <Dialog
        fullScreen={fullScreen}
        open={!!selectedAlbum}
        onClose={handleThumbnailClose}
        aria-labelledby="responsive-thumbnail-dialog"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {selectedAlbum && selectedAlbum.title}
          <IconButton
            aria-label="close"
            onClick={handleThumbnailClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box>
          <img
            src={selectedAlbum && selectedAlbum.url}
            alt="thumbnail-preview"
            style={{ maxWidth: "100%" }}
          />
        </Box>
      </Dialog>
      <TableContainer sx={{ maxHeight: 640 }}>
        {albums.length > 0 ? (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {albums.map((album: Album) => {
                return (
                  <StyledTableRow
                    hover
                    tabIndex={-1}
                    key={album.id}
                    style={{ minHeight: 200 }}
                  >
                    {columns.map((column) => {
                      const value = album[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.id === "thumbnailUrl" ? (
                            <Box
                              sx={{
                                cursor: "pointer",
                              }}
                              onClick={() => handleThumbnailOpen(album)}
                            >
                              <img src={`${String(value)}`} alt={album.title} />
                            </Box>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 640,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        count={TOTAL_IMAGES}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
