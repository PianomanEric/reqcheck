import { AppBar, Box, IconButton, Link, MenuItem, Select, TextField, InputBase, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// This is hard-coded for now, but we can use the backend to grab our filters later
// Not sure what things we should include in the dropdown filter
// Feel free to change these
const filters = [
  "Courses",
  "Instructors",
  "Degrees"
];

const handleSearchKeyPressed = (key) => {
  if (key.code === "Enter") {
    handleSearch();
  }
}

const handleSearch = (key) => {
  console.log(key);
  // Make a call to the backend, maybe redirect to a results page?
  alert("Search not implemented");
}

export default function Navbar() {
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
        <TextField placeholder={"Search Courses"} onKeyDown={handleSearchKeyPressed} sx={{
          width: "200px",
          //bgcolor: "common.white",
          //padding: 1,
          //border: "1px solid #aaa",
        }}/>
        <Select sx={{
          width: "150px",
        }}>
          <MenuItem value="">
            None
          </MenuItem>
          {
          filters.map((filter) => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
          ))
          }
        </Select>
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
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