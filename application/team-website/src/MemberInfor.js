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
          Neme:- Your Name
        </h4>
        <h4>
        About:- Your Description
        </h4>
      </>
    }
    else if(name === "ericF") {
      return <>
      <h4>
          Neme:- Your Name
        </h4>
        <h4>
        About:- Your Description
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
          Neme:- Victoria Wilson-Anumudu
        </h4>
        <h4>
        About:- Hi everyone! My name is Victoria Wilson-Anumudu and I am will be working in Github as well as the backend for my Team 6. 
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
