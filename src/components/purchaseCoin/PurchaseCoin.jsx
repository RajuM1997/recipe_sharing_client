import { Container, Grid } from "@mui/material";
import "./purchaseCoin.css";
import PurchaseModal from "./PurchaseModal";
import { useContext, useState } from "react";
import { addSuccessfully } from "../../util/Alert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

const PurchaseCoin = () => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleOpen = (coinValue) => {
    setOpen(true);
    setValue(coinValue);
  };
  const handleClick = async () => {
    const newData = {
      // coin: Number(userData.coin || 0) + value,
      email: user?.email,
    };
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users`,
        newData
      );
      if (res.status === 200) {
        // refetchUser();
        addSuccessfully(
          value === 100
            ? "Congratulations! You've successfully purchased 100 coins for $1."
            : value === 500
            ? "Fantastic! You've successfully purchased 500 coins for $5."
            : value === 1000
            ? "Awesome! You've successfully purchased 1000 coins for $10."
            : "Transaction completed successfully."
        );
        setOpen(false);
        navigate("/recipes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="purchaseCoin">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <div className="purchase_coin">
              <h5 className="sub_title">Buy 100 Coins</h5>
              <p className="common_para">Get 100 coins by spending just $1.</p>
              <button className="submit_btn" onClick={() => handleOpen(100)}>
                Buy Now
              </button>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <div className="purchase_coin">
              <h5 className="sub_title">Buy 500 Coins</h5>
              <p className="common_para">Get 500 coins by spending just $5.</p>
              <button className="submit_btn" onClick={() => handleOpen(500)}>
                Buy Now
              </button>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <div className="purchase_coin">
              <h5 className="sub_title">Buy 1000 Coins</h5>
              <p className="common_para">
                Get 1000 coins by spending just $10.
              </p>
              <button className="submit_btn" onClick={() => handleOpen(1000)}>
                Buy Now
              </button>
            </div>
          </Grid>
        </Grid>
        <PurchaseModal
          setOpen={setOpen}
          open={open}
          handleClick={handleClick}
          value={value}
        />
      </Container>
    </section>
  );
};

export default PurchaseCoin;
