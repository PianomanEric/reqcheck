import './App.css';
import {
  useParams,
} from "react-router-dom";
function MemberInfo() {

  const { name } = useParams();
  console.log("name", name)
  const returnAbout =  () => {
    
    if(name === "vivek") {
      return<>
      <h4>
          Neme:- Vivek Santoki
        </h4>
        <h4>
        About:- Hello All, My name is Vivek Santoki and I am team lead of team 6.My responsibility to handle the team across the technology and project and I will managing the deployments for the projects
        </h4>
      </>

    }
    else if(name === "ericR") {
      return <>
      <h4>
          Name:- Erik Rodriguez
        </h4>
        <h4>
        About:- Hello My name is Erik Rodriguez and I am part of the front end. 
        </h4>
      </>
    }
    else if(name === "ericF") {
      return <>
      <h4>
          Neme:- Eric Falk
        </h4>
        <h4>
        About:- Hello! My name is Eric and I am one of the front-end developers for the team. I've only used vanilla JavaScript for past web projects, but I will be learning how to use React and Material UI for this course.
        </h4>
      </>
    }
    else if(name === "syed") {
      return <>
      <h4>
          Neme:- Your Name
        </h4>
        <h4>
        About:- Your Description
        </h4>
      </>
    }
    else if(name === "victoria") {
      return <>
      <h4>
          Neme:- Your Name
        </h4>
        <h4>
        About:- Your Description
        </h4>
      </>
    }else if(name === "alex") {
      return <>
      <h4>
          Neme:- Your Name
        </h4>
        <h4>
        About:- Your Description
        </h4>
      </>
    }
    else {
      return <>
        {'not found any team mamber'}
      </>
    }
  }
  return (
    <div className="App">
     <header className="App-header">
      {returnAbout()}
      </header>
    </div>
  );
}

export default MemberInfo;
