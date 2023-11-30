import './App.css';
import Login from "./HomePage/Login";
import HomePage from "./HomePage/HomePage";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import ExchangePage from "./ExchangePage/ExchangePage";
import StatPage from "./StatsPage/StatPage";
import WagerPage from "./WagerPage/WagerPage";
import EventPage from "./EventPage/EventPage";

function App() {
  return (
      <div className={'phone-container'}>
          <Router>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/home" element={<HomePage />}/>
                  <Route path="/exchange" element={<ExchangePage />} />
                  <Route path="/stats" element={<StatPage />} />
                  <Route path="/wager" element={<WagerPage />} />
                  <Route path="/events" element={<EventPage />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
