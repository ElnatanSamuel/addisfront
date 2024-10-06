import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongStart } from "../store/songSlice";
import styled from "@emotion/styled";

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #0074d9;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SongForm = () => {
  const dispatch = useDispatch();
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const handleChange = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSongStart(song));
    setSong({ title: "", artist: "", album: "", genre: "" });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Add New Song</h2>
      <StyledForm>
        <StyledInput
          type="text"
          name="title"
          value={song.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <StyledInput
          type="text"
          name="artist"
          value={song.artist}
          onChange={handleChange}
          placeholder="Artist"
          required
        />
        <StyledInput
          type="text"
          name="album"
          value={song.album}
          onChange={handleChange}
          placeholder="Album"
        />
        <StyledInput
          type="text"
          name="genre"
          value={song.genre}
          onChange={handleChange}
          placeholder="Genre"
        />
        <SubmitButton type="submit">Add Song</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default SongForm;
