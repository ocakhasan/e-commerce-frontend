import React, { useState, useEffect } from 'react'
import orderService from '../../services/orderService'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {
    Typography,
    Button,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    Select
} from "@material-ui/core";

import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Alert from "@material-ui/lab/Alert";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const Refunds = () => {
    const [refundData, setRefundData] = useState(null)
    const [notification, setNotification] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleNotification = (message, success) => {
        setNotification(message)
        setSuccess(success)
        setTimeout(() => setNotification(null), 3000);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await orderService.getAllRefund()
                if (response.status) {
                    setRefundData(response.refunds)
                    console.log(response.refunds)

                } else {
                    // TODO: handle error, show notification
                    console.log("error")
                }
            } catch (exception) {
                // TODO: handle error, show notification
                console.log("error")
            }
        }
        fetchData()
    }, [])

    const handleRefund = async (id, refund_num) => {
        try {
            const response = await orderService.refundOrder(id, refund_num)
            if (response.status) {
                setRefundData(refundData.map(ref => ref._id === id ? response.order : ref))
                handleNotification("Refund Operation Successful", true)
            } else {
                handleNotification("Refund Operation UnSuccessful", false)
            }
        } catch (exception) {
            handleNotification("Refund Operation UnSuccessful", false)
        }
    }

    function getTotalPrice(order) {
        let totalPrice = 0
        console.log("order ", order)
        let i
        for (i = 0; i < order.products.length; i++) {
            /* product = order.products[i]
            console.log("product", product) */
            totalPrice += order.products[i].previousPrice ? order.products[i].previousPrice : order.products[i].unitPrice
        }
        return totalPrice
    }

    function getStatus(refund) {
        if (refund == 1) {
            return <p><HourglassEmptyIcon /> Pending</p>
        } else if (refund == 2) {
            return <p><CheckIcon /> Approved</p>
        } else if (refund == 3) {
            return <p><ClearIcon /> Rejected</p>
        }
    }

    if (!refundData) {
        return <p>Data Loading</p>
    } else {
        return (
            <div>
                {notification ? <Alert>{notification}</Alert> : null}
                <TableContainer component={Paper}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Refunds
                    </Typography>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Refund</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Approve</TableCell>
                                {/* <TableCell align="right">Owner</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Approve</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {refundData.map((refund) => (
                                <TableRow key={refund._id}>
                                    <TableCell component="th" scope="row">
                                        {refund._id}
                                    </TableCell>
                                    <TableCell align="right">
                                        {/* <Link to={"/product/" + comment.product}>
                                            {comment.product}
                                        </Link> */}
                                        {getTotalPrice(refund)} $
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        {refund.date}
                                    </TableCell>

                                    <TableCell align="right" component="th" scope="row">
                                        {getStatus(refund.refund)}
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <div>
                                            <Button variant="outlined" color="primary"
                                                disabled={refund.refund !== 1} onClick={() => handleRefund(refund._id, 2)}><ThumbUpIcon /></Button>
                                            <Button variant="outlined" color="seconday"
                                                disabled={refund.refund !== 1} onClick={() => handleRefund(refund._id, 3)}><ThumbDownIcon /></Button>
                                        </div>
                                    </TableCell>
                                    {/* <TableCell align="right">{comment.owner}</TableCell>
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
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }


}

export default Refunds