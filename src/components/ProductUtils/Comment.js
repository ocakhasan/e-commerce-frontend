import React from 'react'
import { Avatar, Grid} from "@material-ui/core";

const Comment = ({ comment }) => {

    const imgLink =
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
    return (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt="Remy Sharp" >{comment.owner.slice(0, 1)}</Avatar>
            </Grid>
            <Grid  item xs spacing={4} zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{comment.owner}</h4>
                <p style={{ textAlign: "left" }}>
                    {comment.content}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                </p>
            </Grid>
        </Grid>
    )
}

export default Comment
