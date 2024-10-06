import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStatsStart } from "../store/statisticsSlice";
import styled from "@emotion/styled";
import { resetUpdateStats } from "../store/statisticsSlice";

const StatsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatSection = styled.div`
  margin-bottom: 20px;
`;

const StatTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const StatItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Statistics = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.statistics);
  const { updateStats } = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchStatsStart());
  }, [dispatch]);

  useEffect(() => {
    if (updateStats) {
      dispatch(fetchStatsStart());
      dispatch(resetUpdateStats());
    }
  }, [updateStats, dispatch]);

  if (loading) return <div>Loading statistics...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return null;

  return (
    <StatsContainer>
      <h2>Statistics</h2>
      <StatSection>
        <StatItem>Total Songs: {stats.totalSongs}</StatItem>
        <StatItem>Total Artists: {stats.totalArtists}</StatItem>
        <StatItem>Total Albums: {stats.totalAlbums}</StatItem>
        <StatItem>Total Genres: {stats.totalGenres}</StatItem>
      </StatSection>

      <StatSection>
        <StatTitle>Songs by Genre:</StatTitle>
        {stats.songsByGenre &&
          stats.songsByGenre.map((genre) => (
            <StatItem key={genre._id}>
              {genre._id}: {genre.count}
            </StatItem>
          ))}
      </StatSection>

      <StatSection>
        <StatTitle>Songs and Albums by Artist:</StatTitle>
        {stats.songsByArtist &&
          stats.songsByArtist.map((artist) => (
            <StatItem key={artist._id}>
              {artist._id}: {artist.songs} songs, {artist.albums} albums
            </StatItem>
          ))}
      </StatSection>

      <StatSection>
        <StatTitle>Songs by Album:</StatTitle>
        {stats.songsByAlbum &&
          stats.songsByAlbum.map((album) => (
            <StatItem key={album._id}>
              {album._id}: {album.count}
            </StatItem>
          ))}
      </StatSection>
    </StatsContainer>
  );
};

export default Statistics;
