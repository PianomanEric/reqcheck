import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import theme from './assets/theme';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Equivalencies from './pages/Equivalencies';
import Roadmap from './pages/Roadmap';
import MemberInfo from './pages/MemberInfo';
import BasicLayout from './layouts/BasicLayout';
import { AuthProvider } from './context/AuthProvider';
import { RequireAuth } from './components/RequireAuth';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<BasicLayout />}>
                <Route index element={<Home />}/>
                <Route path='about'>
                  <Route index element={<About />} />
                  <Route path=':name' element={<MemberInfo />} />
                </Route>
                <Route path='equivalencies' element={<Equivalencies />}/>
                <Route element={<RequireAuth />}>
                  <Route path='courses' element={<Courses />}/>
                  <Route path='profile' element={<Profile />}/>
                  <Route path='roadmap' element={<Roadmap />}/>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
