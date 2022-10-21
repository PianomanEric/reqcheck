import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BasicLayout(props) {
  return (
    <Box elevation={0} sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    }}>
      <Box sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}>
        <Navbar />
        <Outlet />
      </Box>
      <Footer/>
    </Box>
  );
}