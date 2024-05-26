import { Container, Grid, TextField, TextareaAutosize } from "@mui/material";
import "./addRecipe.css";
import { useContext, useState } from "react";
import FileUpload from "../../components/fileUpload/FileUpload";
import { recipeCategory } from "../../util/StaticData";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import FormControl from "@mui/joy/FormControl";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import useFetch from "../../hook/useFetch";
import { addSuccessfully, toastError } from "../../util/Alert";

const AddRecipe = () => {
  const [category, setCategory] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [video, setVideo] = useState("");
  const [country, setCountry] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("");
  const [files, setFiles] = useState(null);
  const { user } = useContext(AuthContext);
  const { data } = useFetch(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users/user?userEmail=${
      user?.email
    }`
  );

  const handleChange = (event) => {
    setCategory(event?.target?.outerText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", files);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_REACT_APP_IMGBB_API_KEY
        }`,
        formData
      );

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        const newData = {
          category,
          recipeName,
          video,
          country,
          photo: imageUrl,
          prepTime,
          cookTime,
          ingredient,
          description,
          servings,
          creatorEmail: data?.email,
        };

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/recipes`,
            newData
          );

          if (res.status === 201) {
            addSuccessfully("Added Successfully");
            setCategory("");
            setRecipeName("");
            setVideo("");
            setCountry("");
            setFiles(null);
            setPrepTime("");
            setCookTime("");
            setIngredient("");
            setDescription("");
            setServings("");
          }
        } catch (error) {
          toastError("Something went wrong, please try again.");
          console.error("Error submitting recipe:", error);
        }
      } else {
        console.error("Image upload failed:", response.data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <section className="add_recipe common_bg">
      <h2 className="heading_title">Add Recipe</h2>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <FileUpload files={files} setFiles={setFiles} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
              <label htmlFor="" className="input_label">
                Recipe Name
              </label>
              <TextField
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <label htmlFor="" className="input_label">
                Video Link
              </label>
              <TextField
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <label htmlFor="" className="input_label">
                Country
              </label>
              <TextField
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <label htmlFor="" className="input_label">
                Prep time
              </label>
              <TextField
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <label htmlFor="" className="input_label">
                Cook time
              </label>
              <TextField
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <label htmlFor="" className="input_label">
                Servings
              </label>
              <TextField
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <label htmlFor="" className="input_label">
                Category
              </label>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChange}
                  value={category}
                  // defaultValue="Please Select a Category"
                >
                  <Option value="" disabled>
                    Please Select a Category
                  </Option>
                  {recipeCategory?.map((item) => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <p htmlFor="" className="input_label">
                Description
              </p>
              <br />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={6}
                variant="outlined"
                id="desc"
                required
                className="text_area"
                placeholder="add <br> if you need line break"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <p htmlFor="" className="input_label">
                Ingredients
              </p>
              <br />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={6}
                variant="outlined"
                id="desc"
                required
                className="text_area"
                placeholder="add <br> if you need line break"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
            </Grid>
          </Grid>
          <button className="submit_btn">Submit</button>
        </form>
      </Container>
    </section>
  );
};

export default AddRecipe;
