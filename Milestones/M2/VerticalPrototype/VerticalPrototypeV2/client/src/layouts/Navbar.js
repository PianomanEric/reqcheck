import { AppBar, Box, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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
        <TextField size="small" InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }} sx={{
          borderRadius: 1,
          px: 2,
        }}/>
        <Link to="/">
          <Typography onClick={() => {alert("This will redirect to the registration page")}} variant="body1" align="center" color="initial" sx={{
            px: 2,
            py: 1,
          }}>
            Register
          </Typography>
        </Link>
        <Link to="/">
          <Typography onClick={() => {alert("This will redirect to the login page")}} variant="body1" align="center" color="initial" sx={{
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