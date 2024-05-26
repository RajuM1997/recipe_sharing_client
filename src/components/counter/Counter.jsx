/* eslint-disable react/no-unescaped-entities */
import { Container, Grid } from "@mui/material";
import CounterItem from "./CounterItem";
import "./counter.css";

const Counter = () => {
  return (
    <section className="common_bg">
      <Container>
        <h2 className="heading_title">Success Stories</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <h4 className="sub_title">Why should I use Recipe Haven</h4>
            <p className="common_para">
              Recipe Haven offers a unique platform where you can not only buy
              delicious recipes from our extensive collection but also add your
              own recipes after logging in. Additionally, you can earn money by
              sharing your culinary creations with our community. It's a great
              way to explore new dishes, share your cooking expertise, and
              monetize your recipes.
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <CounterItem end={94} title={"Total Recipes"} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <CounterItem end={52} title={"Total Users"} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Counter;
