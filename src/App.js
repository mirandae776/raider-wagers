import './App.css';
import Login from "./HomePage/Login";
import HomePage from "./HomePage/HomePage";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import ExchangePage from "./ExchangePage/ExchangePage";
import BetPage from "./BetHistory/BetPage";
import WagerPage from "./WagerPage/WagerPage";
import EventPage from "./EventPage/EventPage";
import NavBar from "./NavBar/NavBar";
import React, { useEffect, useState } from "react";


function App() {
    const [currDoubloons, setCurrDoubloons] = useState(parseInt(localStorage.getItem('dabloons'))); 


return (
    <div className={'phone-container'}>
        <NavBar
            currDoubloons={currDoubloons}
        />
          <Router>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<HomePage />}/>
                  <Route path="/exchange" element={<ExchangePage />} />
                  <Route path="/betHistory" element={<BetPage 
                        setCurrDoubloons={setCurrDoubloons}
                    />} />
                  <Route path="/wager" element={<WagerPage
                        currDoubloons={currDoubloons}
                        setCurrDoubloons={setCurrDoubloons}
                  />} />
                  <Route path="/events" element={<EventPage />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
