import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";
import Statistics from "./components/Statistics";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  font-family: "Roboto", Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <Header>Song Management App</Header>
        <ContentWrapper>
          <LeftColumn>
            <SongForm />
            <SongList />
          </LeftColumn>
          <RightColumn>
            <Statistics />
          </RightColumn>
        </ContentWrapper>
      </AppContainer>
    </Provider>
  );
};

export default App;
