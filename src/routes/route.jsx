import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/home";
import AddRecipe from "../pages/addRecipe/addRecipe";
import Recipe from "../pages/recipe/Recipe";
import RecipeDetails from "../pages/recipeDetails/recipeDetails";
import PrivateRoute from "../privateRoute/PrivateRoute";
import BuyCoin from "../pages/buyCoin/buyCoin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipes",
        element: <Recipe />,
      },
      {
        path: "/recipes/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase-coin",
        element: <BuyCoin />,
      },
    ],
  },
]);
export default router;
