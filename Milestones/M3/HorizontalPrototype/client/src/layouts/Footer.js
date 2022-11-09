import { Box, Link, Typography } from "@mui/material";

const links = [
  "Privacy Policy",
  "Cookies",
  "Terms of Use",
  "Contact Us",
];

function GenerateLinks() {
  return links.map((label) => (
    <Link key={label} to="/" onClick={() => {alert(`This will redirect to ${label} page`)}} sx={{
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