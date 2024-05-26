import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useFetch from "../../hook/useFetch";
import axios from "axios";
import { toastError } from "../../util/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const RecipeItem = ({ item, handleClick, data, reFetch }) => {
  const { user } = useContext(AuthContext);

  const { data: creatorUser } = useFetch(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users/user?userEmail=${
      item?.creatorEmail
    }`
  );
  const navigate = useNavigate();
  const handleView = async (id) => {
    if (!data?.email) {
      toastError("Please login to view this recipe");
    } else if (item?.purchased_by?.includes(data?.email)) {
      navigate(`/recipes/${id}`);
    } else if (item?.creatorEmail === data?.email) {
      navigate(`/recipes/${id}`);
    } else if (data?.coin > 9) {
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure you want to spending 10 coins?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const newData = {
                purchased_by: [...item.purchased_by, data?.email],
                watchCount: Number(item?.watchCount) + 1,
              };
              const updateUser = {
                email: data?.email,
                coin: Number(data?.coin) - 10,
              };
              const updateCreator = {
                coin: creatorUser.coin + 1,
                email: creatorUser.email,
              };
              try {
                const res = await axios.put(
                  `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users`,
                  updateUser
                );
                if (res.status === 200) {
                  reFetch();
                }
              } catch (error) {
                console.log(error);
              }
              try {
                await axios.put(
                  `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users`,
                  updateCreator
                );
              } catch (error) {
                console.log(error);
              }
              try {
                const res = await axios.put(
                  `${
                    import.meta.env.VITE_REACT_APP_BASE_URL
                  }/api/recipes/${id}`,
                  newData
                );
                if (res.status === 200) {
                  navigate(`/recipes/${id}`);
                }
              } catch (error) {
                console.log(error);
              }
            },
          },
          {
            label: "No",
            onClick: () => console.log("Cancel"),
          },
        ],
      });
    } else if (data?.coin < 10) {
      toastError("Sorry, you don't have enough balance. Please buy some coin");
      setTimeout(() => {
        navigate("/purchase-coin");
      }, 2000);
    }
  };

  return (
    <Grid item xs={12} md={4} lg={4}>
      <div className="recipe_card">
        <div className="recipe_card_img">
          <img src={item?.photo} alt="" />
          {item?.fav?.length > 0 ? (
            item?.fav?.map((favItem, i) => {
              if (favItem !== user?.email) {
                return (
                  <span className="heart_icon_border" key={i}>
                    <FavoriteBorderIcon
                      onClick={() => handleClick(item?.fav, item._id)}
                    />
                  </span>
                );
              } else {
                return (
                  <span className="heart_icon" key={i}>
                    <FavoriteIcon
                      onClick={() => handleClick(item?.fav, item._id)}
                    />
                  </span>
                );
              }
            })
          ) : (
            <span className="heart_icon_border">
              <FavoriteBorderIcon
                onClick={() => handleClick(item?.fav, item._id)}
              />
            </span>
          )}
          <span className="view_icon">
            <VisibilityIcon /> {item?.watchCount}
          </span>
        </div>

        <div className="all_recipe_content">
          <h5>{item?.recipeName}</h5>
          <Grid container spacing={0}>
            <Grid item xs={6} md={6} lg={6}>
              <p className="recipe_info_main">Owner Email</p>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <p className="recipe_info_main">Purchased By</p>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={6} md={6} lg={6}>
              <div>
                <p className="recipe_info_content"> {item?.creatorEmail}</p>
              </div>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              {item?.purchased_by?.map((purchased, i) => (
                <p key={purchased + i} className="recipe_info_content">
                  {purchased}
                </p>
              ))}
            </Grid>
          </Grid>
          <div className="recipe_customer_details">
            <div className="purchased_info"></div>
          </div>
          <div className="recipe_btn_container">
            <button className="" onClick={() => handleView(item._id)}>
              View The Recipe
            </button>
            <p className="location">
              <LocationOnIcon />
              {item?.country}
            </p>
          </div>
        </div>
      </div>
    </Grid>
  );
};
RecipeItem.propTypes = {
  item: PropTypes.any.isRequired,
  handleClick: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  reFetch: PropTypes.any.isRequired,
};
export default RecipeItem;
