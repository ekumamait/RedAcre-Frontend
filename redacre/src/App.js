import React, { useState }  from 'react';
import './App.css';
import Map from './components/Map';
import { Oval } from "react-loader-spinner";
import styled from 'styled-components';

const LoaderContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to right top, #161c0a, #24342e, #3e4c4e, #616569, #808080);
    top: 0;
    left: 0;
`;

export const Title = styled.span`
    font-size: ${props => props.fSize || '36px'};
    margin-bottom: ${props => props.mb || '15px'};
    font-weight: bold;
    color: #fff;
`

function App() {
  const [isGifLoading, SetisGifLoading] = useState(true);
  setTimeout(() => {
      SetisGifLoading(false)
  }, 1000)

  return (
    <>
      {
        isGifLoading ?
          <LoaderContainer >
              <Oval color="#eb7924" />
              <div> <Title>RedAcre Locator</Title> </div>
          </LoaderContainer>
      :
        <>
          <div>
            <Map />
          </div>
        </>
      }
    </>
  );
}

export default App;
