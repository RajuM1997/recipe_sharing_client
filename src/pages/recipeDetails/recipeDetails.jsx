import { Box, Container, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./recipeDetails.css";
import SimilarItem from "./SimilarItem";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/recipes/${id}`
  );
  return (
    <section className="common_bg add_recipe">
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Box sx={{ py: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={5} lg={5}>
                <div className="product_img">
                  <img src={data?.photo} alt="" />
                </div>
              </Grid>
              <Grid item xs={12} md={7} lg={7}>
                <div className="content">
                  <div className="title">
                    <h4>{data?.recipeName}</h4>
                  </div>
                  <div className="time">
                    <div className="time_content">
                      <h6>Prep Time</h6>
                      <p>
                        <AccessTimeIcon /> {data?.prepTime}
                      </p>
                    </div>
                    <div className="time_content">
                      <h6>Cook time</h6>
                      <p>
                        <AccessTimeIcon />
                        {data?.cookTime}
                      </p>
                    </div>
                  </div>

                  <div className="ingredients">
                    <h5>Ingredients</h5>
                    <Grid container spacing={2}>
                      {data?.ingredient?.split("<br>")?.map((item, i) => (
                        <Grid item xs={6} md={6} lg={6} key={i}>
                          <p>{item}</p>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                  <div className="servings">
                    <h6>Servings:</h6>
                    <p>{data?.servings}</p>
                  </div>

                  <div className="servings">
                    <h6>Category:</h6>
                    <p>{data?.category}</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <div className="description">
                <h5>Description</h5>
                {data?.description?.split("<br>")?.map((item, i) => (
                  <p key={i + 1}>{item}</p>
                ))}
              </div>
              <div className="video_player">
                <iframe
                  className="video"
                  width="80%"
                  height="350"
                  src={`https://www.youtube.com/embed/${data?.video}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Grid>
          </Grid>
          <SimilarItem category={data?.category} id={id} />
        </Container>
      )}
    </section>
  );
};

export default RecipeDetails;
