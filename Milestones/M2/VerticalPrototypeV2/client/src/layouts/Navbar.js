import { AppBar, Box, IconButton, Link, MenuItem, Select, TextField, InputBase, Typography,Autocomplete } from "@mui/material";
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
        const response = await axios.get("http://localhost:4000/dbtest");
        const title = response.data.map((item) => item.title);
        setTitles(title);
    }catch(error) {
        console.log(error)
    }
    }
    fetchSearchData();
  },[])

  const onChangeSearch = (e) => {
    const show = titles.filter((item) => item.includes(e.target.value));
    setShowTitles(show);
  }

  return (
    <AppBar position="sticky" elevation={3} sx={{
      p: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      bgcolor: "common.white",
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
          options={showTitles}
          sx={{
            width: "200px",
            // bgcolor: "common.white",
            // padding: 1,
            // border: "1px solid #aaa",
          }}
          renderInput={(params) => <TextField {...params} onChange={(e) => onChangeSearch(e)} label="Search" />}
        />
        <Link to="/">
          <Typography onClick={() => {alert("The registration page will be implemented in Milestone 3")}} variant="body1" align="center" color="initial" sx={{
            px: 2,
            py: 1,
          }}>
            Register
          </Typography>
        </Link>
        <Link to="/">
          <Typography onClick={() => {alert("The login page will be implemented in Milestone 3")}} variant="body1" align="center" color="initial" sx={{
            px: 2,
            py: 1,
          }}>
            Login
          </Typography>
        </Link>
      </Box>
    </AppBar> 
  );
}