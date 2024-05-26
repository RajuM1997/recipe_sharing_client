import "./App.css";
import { RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import router from "./routes/route";

function App() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
