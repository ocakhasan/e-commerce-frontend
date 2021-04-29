import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DeleteIcon from "@material-ui/icons/Delete";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import commentService from "../services/commentService";
import productService from "../services/productService";
import ProductForm from "./ProductForm";
import "./styles/dashboard.css";

const Dashboard = () => {
  const [productData, setProductData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [allowed, setAllowed] = useState(0);
  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const handleNotification = (message, isSuccess) => {
    setNotification(message);
    setSuccess(isSuccess);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    async function fetchData() {
      const logged = JSON.parse(window.localStorage.getItem("logged"));

      if (!logged) {
        history.push("/login");
      } else if (logged.userType === 0) {
        handleNotification("You are not allowed for the admin panel", false);
      } else {
        setAllowed(logged.userType);
        try {
          const response = await productService.getAllProduct();
          if (response.status) {
            console.log(response);
            setProductData(response.products);
          } else {
            handleNotification(
              "Product did not fetched. There is a problem",
              false
            );
          }
        } catch (exception) {
          handleNotification(
            "Product did not fetched. There is a problem",
            false
          );
        }
        /* productService
                    .getAllProduct()
                    .then(response => {
                        console.log(response)
                        setProductData(response.products)
                    }) */
      }
    }
    fetchData();
  }, [history]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await commentService.getAllComments();
        if (response.status) {
          setCommentData(response.comments);
        } else {
          handleNotification(
            "Comments did not fetched. There is a problem",
            false
          );
        }
      } catch (exception) {
        handleNotification(
          "Comments did not fetched. There is a problem",
          false
        );
      }

      /*  commentService
                 .getAllComments()
                 .then(response => {
                     console.log("comments", response)
                     setCommentData(response.comments)
                 }) */
    }

    fetchData();
  }, []);

  const addProduct = async (values) => {
    const toSend = { userType: 2, ...values };
    try {
      const response = await productService.addProduct(toSend);
      if (response.status) {
        handleNotification("New Product Added", true);
        setProductData(productData.concat(response.product));
      } else {
        handleNotification("Adding Product Unsuccessful", true);
      }
    } catch (exception) {
      handleNotification("Adding Product Unsuccessful", true);
    }

    /* productService
            .addProduct(toSend)
            .then(response => {
                if (response.status) {
                    setNotification("New Product Added")
                    setSuccess(true)
                    setTimeout(() => setNotification(null), 3000)
                    setProductData(productData.concat(response.product))
                } else {
                    setNotification("Product did not added")
                    setSuccess(false)
                    setTimeout(() => setNotification(null), 3000)
                }

            })
            .catch(error => {
                setNotification("Product did not added")
                setSuccess(false)
                setTimeout(() => setNotification(null), 3000)
            }) */
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    var result = window.confirm("You sure about deleting?");
    if (result) {
      try {
        const response = await productService.deleteProduct(id);
        if (response.status) {
          handleNotification(`Product ${id} is deleted`, true);
          setProductData(
            productData.filter((product) => product._id !== response.id)
          );
        } else {
          handleNotification(`Product ${id} is not deleted`, false);
        }
      } catch (exception) {
        handleNotification(`Product ${id} is not deleted`, false);
      }

      /* productService
                .deleteProduct(id)
                .then(response => {
                    if (response.status) {
                        setNotification(`Product ${id} is deleted`)
                        setSuccess(true)
                        setTimeout(() => setNotification(null), 3000)
                        setProductData(productData.filter(product => product._id !== response.id))
                    } else {
                        setNotification(`Product ${id} is not deleted`)
                        setSuccess(false)
                        setTimeout(() => setNotification(null), 3000)
                    }
                }).catch(_error => {
                    setNotification(`Product ${id} is not deleted`)
                    setSuccess(false)
                    setTimeout(() => setNotification(null), 3000)
                }) */
    }
  };

  const approveComment = async (comment) => {
    console.log("I am here");
    try {
      const response = await commentService.approveComment(comment);
      if (response.status) {
        handleNotification(`Operation successful`, true);
        setCommentData(
          commentData.map((com) =>
            com._id === comment._id
              ? { ...comment, approval: !comment.approval }
              : com
          )
        );
      } else {
        handleNotification(`Approval did not happen`, false);
      }
    } catch (exception) {
      handleNotification(`Approval did not happen`, false);
    }

    /* commentService
            .approveComment(comment)
            .then(response => {
                console.log("comment approval", response)
                console.log("comments", commentData)
                if (response.status) {
                    setNotification(`Operation successfull`)
                    setTimeout(() => setNotification(null), 3000)
                    setSuccess(true)
                    setCommentData(commentData.map(com => com._id === comment._id ? { ...comment, approval: !comment.approval } : com))
                } else {
                    setNotification(`Approval did not happen`)
                    setSuccess(false)
                    setTimeout(() => setNotification(null), 3000)
                }
            })
            .catch(_error => {
                setNotification(`Approval did not happen`)
                setSuccess(false)
                setTimeout(() => setNotification(null), 3000)
            }) */
  };

  const Comments = () => {
    if (commentData) {
      return (
        <TableContainer component={Paper}>
          <Typography variant="h4" component="h2" gutterBottom>
            Comments
          </Typography>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Comment</TableCell>
                <TableCell align="right">Product</TableCell>
                <TableCell align="right">Owner</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Approve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commentData.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell component="th" scope="row">
                    {comment.content}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={"/product/" + comment.product}>
                      {comment.product}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{comment.owner}</TableCell>
                  <TableCell align="right">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => approveComment(comment)}
                    >
                      {comment.approval ? (
                        <div className="approveIcon">
                          <ThumbDownIcon /> Disapprove
                        </div>
                      ) : (
                        <div className="approveIcon">
                          <ThumbUpIcon />
                          Approve
                        </div>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    return <p>Loading</p>;
  };

  const Products = () => (
    <TableContainer component={Paper}>
      <Typography variant="h4" component="h2" gutterBottom>
        Products
      </Typography>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            {allowed === 2 ? (
              <TableCell align="right">Rate</TableCell>
            ) : (
              <TableCell align="right">Previous Price</TableCell>
            )}

            {allowed === 2 ? (
              <TableCell align="right">Delete</TableCell>
            ) : (
              <TableCell align="right">Set Price</TableCell>
            )}

            {allowed === 2 ? <TableCell align="right">Update</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((product) => (
            <TableRow key={product._id}>
              <TableCell component="th" scope="row">
                {product.productName}
              </TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">{product.unitPrice}</TableCell>
              {allowed === 2 ? (
                <TableCell align="right">{product.rate}</TableCell>
              ) : (
                <TableCell align="right">{product.previousPrice}</TableCell>
              )}

              {allowed === 2 ? (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => handleDelete(e, product._id)}
                  >
                    <DeleteIcon />
                    Delete
                  </Button>
                </TableCell>
              ) : (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    href={"/update/product/" + product._id}
                  >
                    <AttachMoneyIcon />
                    Set Price
                  </Button>
                </TableCell>
              )}

              {allowed === 2 ? (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    href={"/update/product/" + product._id}
                  >
                    <SystemUpdateAltIcon />
                    Update
                  </Button>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      {
        notification && (
          <Snackbar open={notification} autoHideDuration={6000}>
            <Alert severity={success ? "success" : "error"}>
              {notification}
            </Alert>
          </Snackbar>
        )

        //<Alert severity={success? "success": "error"}>{notification}</Alert>
      }

      {allowed === 2 ? (
        <Tabs>
          <TabList>
            <Tab>Products</Tab>
            <Tab>Comments</Tab>
          </TabList>

          <TabPanel>
            <Products />
            <ProductForm addProduct={addProduct} />
          </TabPanel>
          <TabPanel>
            <Comments />
          </TabPanel>
        </Tabs>
      ) : (
        <Products />
      )}
    </div>
  );
};

export default Dashboard;
