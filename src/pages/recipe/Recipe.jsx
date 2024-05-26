import { Container, Grid, TextField } from "@mui/material";
import RecipeItem from "./RecipeItem";
import "./recipe.css";
import { useContext, useEffect, useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import FormControl from "@mui/joy/FormControl";
import useFetch from "../../hook/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../../components/Loader/Loader";
import useFetchInf from "../../hook/useFetchInf";

const Recipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [searchRecipeName, setSearchRecipeName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const { data, reFetch, loading } = useFetchInf(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/recipes?recipeName=${searchRecipeName}&category=${searchCategory}&country=${searchCountry}&limit=9&page=${page}`,
    page
  );
  const { data: infoData } = useFetch(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/recipes/get-all/info`
  );
  const {
    data: userData,
    loading: userLoading,
    reFetch: userReFetch,
  } = useFetch(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users/user?userEmail=${
      user?.email
    }`
  );
  const handleChange = (event) => {
    setCategory(event?.target?.outerText);
  };
  const handleSearch = () => {
    setSearchRecipeName(recipeName);
    setSearchCategory(category);
    setSearchCountry(country);
  };
  const handleClick = async (value, id) => {
    let updatedEmails;
    if (value?.includes(user?.email)) {
      updatedEmails = value?.filter((email) => email !== user.email);
    } else {
      updatedEmails = [...(value || []), user.email];
    }
    const newData = {
      fav: updatedEmails,
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/recipes/${id}`,
        newData
      );
      if (res.status === 200) {
        reFetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = () => {
    setSearchRecipeName("");
    setSearchCategory("");
    setSearchCountry("");
    setCategory("");
    setRecipeName("");
    setCountry("");
  };
  // console.log({ page });
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    reFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  console.log("comp");
  return (
    <section className="common_bg add_recipe">
      <h2 className="heading_title">Our Recipe</h2>

      <Container>
        <div className="search_bar_container">
          <div className="search_bar">
            <Grid container spacing={2}>
              <Grid item xs={12} md={9} lg={9}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      value={recipeName}
                      onChange={(e) => setRecipeName(e.target.value)}
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={4}
                      placeholder="Add recipe name"
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={(e) => setCountry(e.target.outerText)}
                        value={country}
                      >
                        <Option value="" disabled>
                          Please Select a Country
                        </Option>
                        {infoData?.countries?.map((item) => (
                          <Option value={item} key={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleChange}
                        value={category}
                      >
                        <Option value="" disabled>
                          Please Select a Category
                        </Option>
                        {infoData?.categories?.map((item) => (
                          <Option value={item} key={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <div className="search_btn_container">
                  <button className="search_btn" onClick={handleSearch}>
                    Search
                  </button>
                  <button className="search_btn" onClick={handleReset}>
                    Reset Filter
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        {loading || userLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={2}>
            {data.length > 0 ? (
              data?.map((item, i) => (
                <RecipeItem
                  key={i}
                  item={item}
                  handleClick={handleClick}
                  data={userData}
                  reFetch={userReFetch}
                />
              ))
            ) : (
              <h5 className="not_fount_text">No Result Found</h5>
            )}
          </Grid>
        )}
      </Container>
    </section>
  );
};

export default Recipe;
