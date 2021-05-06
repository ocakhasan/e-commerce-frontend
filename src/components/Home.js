import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useHistory } from "react-router-dom";
import "./styles/home.css";
import "./styles/Products.css";

const Home = ({ data }) => {
  const history = useHistory();
  const len = data ? (data.length % 3) + 1 : 0;
  return (
    <>
      <div className="home">
        <div className="home-header">
          <Typography variant="h3" component="h3">
            Shop from the Best
          </Typography>
          <Typography variant="h5" component="h3">
            Explore hundreds of products within seconds with perfect user
            experience
          </Typography>


          {len > 0 && (
            <Carousel 
            timeout={250} 
            navButtonsAlwaysInvisible
            animation="slide"
            className="product_container">
              {data?.slice(0, 3).map((product, i) => (
                <Card style={{marginLeft: 15, marginRight: 15}}>
                  <CardActionArea>
                    <CardMedia
                      style={{objectFit: "contain"}}
                      component="img"
                      height="200"
                      src={product.imagePath}
                      image={product.imagePath}
                      title={product.productName}
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography
                      style={{ textAlign: "center", marginTop: 14 }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {product.productName}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          )}
          
          {/* <Button
            size="large"
            style={{ marginTop: 15 }}
            variant="outlined"
            onClick={() => history.push("/products")}
            endIcon={<ExploreIcon style={{ padding: 0 }} />}
          >
            Explore
          </Button> */}
        </div>
        <img
          src={process.env.PUBLIC_URL + "/basketball.jpg"}
          alt="product"
          className="home-img"
        ></img>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Divider style={{ width: "50%", margin: 10, marginTop: 20 }} />
      </Grid>
    </>
  );
};

export default Home;
