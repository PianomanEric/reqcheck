import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const links = [
  "Privacy Policy",
  "Cookies",
  "Terms of Use",
  "Contact Us",
];

function GenerateLinks() {
  return links.map((label) => (
    <Link key={label} component={RouterLink} to="/" onClick={() => {alert(`${label} page is low priority and will not be implemented this semester`)}} sx={{
      m: 1,
    }}>
      <Typography>
        {label}
      </Typography>
    </Link>
  ));
}

export default function Footer() {
  return (
    <Box component="footer" elevation={0} sx={{
      px: 1,
      py: 1,
    }}>
      <Box width="100%" sx={{
        p: 1,
        display: "flex",
        justifyContent: "center",
      }}>
        {GenerateLinks()}
      </Box>
    </Box> 
  );
}