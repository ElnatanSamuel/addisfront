import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSongsStart,
  deleteSongStart,
  setFilter,
} from "../store/songSlice";
import styled from "@emotion/styled";

const SongListContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SongItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const SongTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const SongInfo = styled.p`
  margin: 5px 0;
  color: #666;
`;

const DeleteButton = styled.button`
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc352d;
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SongList = () => {
  const dispatch = useDispatch();
  const { filteredSongs, loading, error, filter } = useSelector(
    (state) => state.songs
  );

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSongStart(id));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <SongListContainer>
      <h2>Song List</h2>
      <FilterInput
        type="text"
        placeholder="Filter by genre"
        value={filter}
        onChange={handleFilterChange}
      />
      {filteredSongs.map((song) => (
        <SongItem key={song._id}>
          <SongTitle>{song.title}</SongTitle>
          <SongInfo>Artist: {song.artist}</SongInfo>
          <SongInfo>Album: {song.album}</SongInfo>
          <SongInfo>Genre: {song.genre}</SongInfo>
          <DeleteButton onClick={() => handleDelete(song._id)}>
            Delete
          </DeleteButton>
        </SongItem>
      ))}
    </SongListContainer>
  );
};

export default SongList;
