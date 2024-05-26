/* eslint-disable no-irregular-whitespace */
import { Box, Container, Grid, Typography } from "@mui/material";
import "./footer.css";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailIcon from "@mui/icons-material/Mail";
import facebook from "../../../assets/social/facebook.png";
import github from "../../../assets/social/github.png";
import linkedin from "../../../assets/social/linkedin.png";
import inst from "../../../assets/social/instagram.png";

const Footer = () => {
  return (
    <footer>
      <Box className="footer_main">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
              <h5 className="common_footer_title">Recipe Haven</h5>
              <p className="common_footer_para">
                Your ultimate destination for discovering, sharing, and enjoying
                the best recipes. Join our community and explore a world of
                culinary delights.
              </p>
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <h5 className="common_footer_title">Explore</h5>
              <Box className="footer_item">
                <Link to={"/home"}>Home</Link>
                <Link to={"/recipes"}>Recipes</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <h5 className="common_footer_title">Get in touch</h5>

              <Box className="contact_info">
                <Box className="call_icon">
                  <AddIcCallIcon />
                </Box>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}
                  component={"h6"}
                >
                  01967582421
                </Typography>
              </Box>
              <Box className="contact_info">
                <Box className="call_icon">
                  <LocationOnOutlinedIcon />
                </Box>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}
                  component={"h6"}
                >
                  Dighalia, Khulna, Bangladesh
                </Typography>
              </Box>
              <Box className="contact_info">
                <Box className="call_icon">
                  <MailIcon />
                </Box>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}
                  component={"h6"}
                >
                  mraju5797@gmail.com
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <h5 className="common_footer_title">Social</h5>
              <Box className="footer_item">
                <div className="footer_img_contain">
                  <a
                    href="https://www.facebook.com/mdRajuMolla44?mibextid=ZbWKwL"
                    target="_blank"
                  >
                    <img src={facebook} alt="" />
                  </a>
                  <a href="https://github.com/RajuM1997" target="_blank">
                    <img src={github} alt="" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rajumolla/"
                    target="_blank"
                  >
                    <img src={linkedin} alt="" />
                  </a>
                  <a
                    href="https://www.instagram.com/km.raju.3557?igsh=ZzdoaWp2b2JhdmJi"
                    target="_blank"
                  >
                    <img src={inst} alt="" />
                  </a>
                </div>
              </Box>
            </Grid>
          </Grid>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "14px",
              color: "#fff",
              fontWeight: "400",
              pt: 3,
            }}
            component={"p"}
          >
            © 2024 Recipe Haven. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
