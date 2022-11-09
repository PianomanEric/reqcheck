import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  MenuItem,
  Select,
  TextField, 
  InputBase,
  Typography,
  Autocomplete
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import axios from "axios";

// This is hard-coded for now, but we can use the backend to grab our filters later
// Not sure what things we should include in the dropdown filter
// Feel free to change these
const filters = [
  "Courses",
  "Instructors",
  "Degrees"
];


export default function Navbar() {

  const [titles, setTitles] = useState([]);
  const [showTitles, setShowTitles] = useState([]);

  useEffect(() => {
    async function fetchSearchData(){
      try{
        const response = await axios.get("/dbtest");
        const title = response.data.map((item) => item.title);
        setTitles([...new Set(title)]);
      }catch(error) {
          console.log(error)
      }
    }
    fetchSearchData();
  },[])

  const onChangeSearch = (e) => {
    const show = titles.filter((item) => {
      return item.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setShowTitles(show);
  }

  return (
    <AppBar position="sticky" elevation={3} sx={{
      p: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Link to="/">
          <Typography variant="h5" align="center" color="initial" sx={{
            px: 2,
            py: 1,
          }}>
            ReqCheck
          </Typography>
        </Link>
      </Box>
      <Box sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Link to="/">
          <Typography variant="body1" align="center" color="initial" sx={{
            px: 2,
            py: 1,
          }}>
            Home
          </Typography>
        </Link>
        <Link to="/about">
          <Typography variant="body1" align="center" color="initial" sx={{
            px: 2,
            py: 1,
          }}>
            About Us
          </Typography>
        </Link>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

      }}>
        {/* <TextField placeholder={"Search Courses"}
        onChange={(e) => onChangeSearch(e)}
        sx={{
          width: "200px",
          // bgcolor: "common.white",
          // padding: 1,
          // border: "1px solid #aaa",
        }}/> */}
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          size="small"
          options={showTitles}
          sx={{
            mx: 1,
            width: "200px",
            // bgcolor: "common.white",
            // padding: 1,
            // border: "1px solid #aaa",
          }}
          renderInput={(params) => <TextField {...params} onChange={(e) => onChangeSearch(e)} label="Search" />}
        />
        <Button variant="contained" onClick={() => {alert("The registration page will be implemented in Milestone 3")}} sx={{
          mx: 1,
          color: "common.white",
        }}>
            Register
        </Button>
        <Button variant="contained" onClick={() => {alert("The login page will be implemented in Milestone 3")}} sx={{
          mx: 1,
          color: "common.white",
        }}>
            Login
        </Button>
      </Box>
    </AppBar> 
  );
}