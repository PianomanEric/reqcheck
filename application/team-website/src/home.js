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
          Project Description
        </h4>
        <h2>
          Students across North America oftentimes find the need to transfer between schools throughout 
          their university career for various reasons. Unfortunately, since most colleges have their own 
          course curriculums for their programs, students find it quite difficult to make these transfers due 
          to discrepancies between their courses. It typically takes about 2 to 3 weeks to finalize/approve a 
          transfer due to demand and a lack of cohesivity between school programs and course codes.
          This is why we built this software Req Check, where we typically solve this problem by strategically 
          creating value to save time and provide knowledge to both students and school administrators on how to handle transfers.

          The Req Check software takes one school's course code and matches it with the other schools' courses.
          An automated system like Req Check will efficiently map out when a student will graduate as well as ensure 
          they are on the right track as a new transfer student. Req Check will alleviate stress for students and faculty 
          as well as save time and money. At the end of the day, the goal is to help both parties and stakeholders plan 
          and handle the transfers beforehand seamlessly.

        </h2>
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
