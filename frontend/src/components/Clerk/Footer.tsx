import { Box, Typography, Link, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Footer.css";
import { SiHuawei } from "react-icons/si";
import { IoLogoWindows } from "react-icons/io";
import { FaAppStore, FaGooglePlay } from "react-icons/fa";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: { xs: 2, sm: 0 } }}>
            <SiHuawei size={25} />
            <IoLogoWindows size={25} />
            <FaGooglePlay size={25} />
            <FaAppStore size={25} />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              underline="hover"
            >
              About
            </Link>
            <Link
              component={RouterLink}
              to="/features"
              color="inherit"
              underline="hover"
            >
              Features
            </Link>
            <Link
              component={RouterLink}
              to="/pricing"
              color="inherit"
              underline="hover"
            >
              Pricing
            </Link>
            <Link
              component={RouterLink}
              to="/gallery"
              color="inherit"
              underline="hover"
            >
              Gallery
            </Link>
            <Link
              component={RouterLink}
              to="/team"
              color="inherit"
              underline="hover"
            >
              Team
            </Link>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            En
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © 2024 All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
