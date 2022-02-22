export type Album = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type AlbumsContextState = {
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
};
