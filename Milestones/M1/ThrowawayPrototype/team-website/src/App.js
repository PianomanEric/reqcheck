import './App.css';
import Home from './home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberInfor from "./MemberInfor";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="member/:name" element={<MemberInfor />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
