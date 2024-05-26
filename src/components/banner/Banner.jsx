import "./banner.css";
import Slider from "react-slick";
import left from "../../assets/banner/arrows/left.png";
import right from "../../assets/banner/arrows/right.png";
import { Container } from "@mui/material";
import { useContext, useRef } from "react";
import { bannerData } from "../../util/StaticData";
import { AuthContext } from "../../context/AuthProvider";
import { toastError } from "../../util/Alert";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const sliderRef = useRef(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleAdd = () => {
    if (!user?.email) {
      toastError("Please login");
    } else {
      navigate("/add-recipe");
    }
  };

  const handleView = () => {
    navigate("/recipes");
  };

  return (
    <section>
      <Slider {...settings} ref={sliderRef}>
        {bannerData.map((item) => (
          <div key={item}>
            <div
              style={{
                backgroundImage: `url(${item.image}),linear-gradient(rgba(0, 19, 59, 0.452), rgba(0, 28, 70, 0.452)`,
                width: "100%",
                height: "100vh",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative",
                backgroundBlendMode: "overlay",
                zIndex: 1,
              }}
            >
              <Container>
                <div className="arrows_main">
                  <div
                    className="left_arrow"
                    onClick={() => sliderRef?.current?.slickPrev()}
                  >
                    <img src={right} alt="" />
                  </div>
                  <div className="right_arrow">
                    <img
                      src={left}
                      alt=""
                      onClick={() => sliderRef?.current?.slickNext()}
                    />
                  </div>
                </div>
                <div className="banner_text">
                  <h3 className="banner_title">{item?.title}</h3>
                  <p className="banner_para">{item?.body}</p>
                  <div className="banner_btn">
                    <button className="btn_color" onClick={handleView}>
                      View Recipe
                    </button>
                    <button className="with_out_color" onClick={handleAdd}>
                      Add Recipe
                    </button>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
