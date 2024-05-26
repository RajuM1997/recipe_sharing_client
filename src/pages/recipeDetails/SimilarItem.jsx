import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PropTypes from "prop-types";
import useFetch from "../../hook/useFetch";

const SimilarItem = ({ category, id }) => {
  const { data } = useFetch(
    `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/api/recipes?category=${category}`
  );
  console.log({ data });
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const settings = {
    dots: false,
    nextArrow: <ArrowBackIcon />,
    prevArrow: <ArrowForwardIcon />,
    infinite: true,
    speed: 500,
    slidesToShow: data?.length > 3 ? 3 : data?.length,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrow: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleClick = (id) => {
    navigate(`/holiday/${id}`);
  };
  const filterItem = data?.filter((item) => item._id !== id);
  return (
    <div className="activitiesItem" style={{ marginTop: "30px" }}>
      <h3 className="heading_title">Similar Item</h3>
      <div className="promotion">
        <Slider {...settings} ref={sliderRef}>
          {filterItem?.map((item) => (
            <div
              className="activities_image"
              onClick={() => handleClick(1)}
              key={item?._id}
            >
              <img src={item?.photo} alt="" />
              <h5>{item?.recipeName}</h5>
            </div>
          ))}
        </Slider>
        <div className="promotion_main">
          <div
            className="promotion_left"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <ArrowBackIcon />
          </div>
          <div
            className="promotion_right"
            onClick={() => sliderRef.current.slickNext()}
          >
            <ArrowForwardIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
SimilarItem.propTypes = {
  category: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
};
export default SimilarItem;
