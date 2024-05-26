import "./navbar.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { AuthContext } from "../../../context/AuthContext";
// import image from "../../../assets/logo.jpeg";
// import useFetch from "../../../hooks/useFetch";
// import userImg from "../../../assets/user_img.jpg";
import logo from "../../../assets/logo.png";
import userImg from "../../../assets/user_img.jpg";
import { AuthContext } from "../../../context/AuthProvider";
import google from "../../../assets/google.png";
import axios from "axios";
import useUser from "../../../hook/useUser";

const drawerWidth = 300;

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { signInWithGoogle, logout, user } = React.useContext(AuthContext);
  const { userData } = useUser(user?.email);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        googleSaveToDB(res.user.displayName, res.user.email, res.user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const googleSaveToDB = async (displayName, email, photo) => {
    const newData = {
      displayName,
      email,
      photo,
    };
    try {
      await axios
        .put(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users`, newData)
        .then(() => {});
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };
  console.log({ userData });
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ display: "flex", flexDirection: "column" }}
      className="mobile_nav_container"
    >
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button sx={{ color: "#fff" }}>
          <Link to={"/home"}>Home</Link>
        </Button>
        <Button sx={{ color: "#fff" }}>
          <Link to={"/recipes"}>Recipe</Link>
        </Button>
        {!userData?.email && (
          <Button className="google_sign_btn" onClick={handleGoogleSignIn}>
            <img src={google} alt="" /> Sign in Google
          </Button>
        )}
        {userData?.email && (
          <Button sx={{ color: "#fff" }}>
            <Link to={"/add-recipe"}>Add Recipe</Link>
          </Button>
        )}

        {userData?.email && (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="userIconNav"
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <img
                src={userData?.photo ? userData?.photo : userImg}
                alt="user"
                className="userImg"
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              sx={{ display: { xs: "block", sm: "none" } }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>Coin: {userData?.coin}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Box className="nav_main_container">
        <CssBaseline />
        <AppBar className="nav_container">
          <Container component="nav">
            <Toolbar style={{ padding: "0px", margin: "0px" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontSize: "18px",
                  fontWeight: "700",
                  display: { xs: "block", sm: "block" },
                }}
              >
                <Link to={"/"}>
                  <div className="logo">
                    <img src={logo} alt="" />
                    <div>
                      <h5>Recipe Haven</h5>{" "}
                      <span className="logo_subtitle">
                        Share and find recipes.
                      </span>
                    </div>
                  </div>
                </Link>
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button sx={{ color: "#fff" }}>
                  <Link to={"/"}>Home</Link>
                </Button>
                <Button sx={{ color: "#fff" }}>
                  <Link to={"/recipes"}>Recipes</Link>
                </Button>{" "}
                {userData?.email && (
                  <Button sx={{ color: "#fff" }}>
                    <Link to={"/add-recipe"}>Add Recipes</Link>
                  </Button>
                )}
                {!userData?.email && (
                  <Button
                    className="google_sign_btn"
                    onClick={handleGoogleSignIn}
                  >
                    <img src={google} alt="" /> Sign in Google
                  </Button>
                )}
                {userData?.email && (
                  <>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      className="userIconNav"
                    >
                      <img
                        src={userData?.photo ? userData?.photo : userImg}
                        alt="user"
                        className="userImg"
                      />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem>Coin: ${userData?.coin}</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </div>
  );
};
Navbar.propTypes = {
  window: PropTypes.any.isRequired,
};
export default Navbar;
