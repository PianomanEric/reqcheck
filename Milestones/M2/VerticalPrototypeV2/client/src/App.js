import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import './App.css';
import theme from "./assets/theme";
import Home from "./pages/Home";
import About from "./pages/About";
import MemberInfo from "./pages/MemberInfo";
import BasicLayout from './layouts/BasicLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<Home />}/>
              <Route path="about">
                <Route index element={<About />} />
                <Route path=":name" element={<MemberInfo />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
