import './App.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
      <h4>
          Software Engineering class SFSU 
        </h4>
        <h4>
          Fall 2022
        </h4>
        <h4>
          Section 1
        </h4>
        <h4>
          Team 6
        </h4>
        <h4>
          Team mambers:-
        </h4>
        <Link to={`member/${'ericR'}`}>{'Erik Rodriguez'}</Link>
        <Link to={`member/${'ericF'}`}>{'Eric Falk'}</Link>
        <Link to={`member/${'syed'}`}>{'Syed Faiz'}</Link>
        <Link to={`member/${'victoria'}`}>{'Victoria Wilson'}</Link>
        <Link to={`member/${'alex'}`}>{'Alex Sanchez'}</Link>
        <Link to={`member/${'vivek'}`}>{'Vivek Santoki'}</Link>
      </header>
    </div>
  );
}

export default Home;
