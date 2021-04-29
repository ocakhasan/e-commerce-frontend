import React from 'react'
import { Avatar, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));

const Comment = ({ comment }) => {
    const classes = useStyles();

    
    return (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar alt="Remy Sharp" className={classes.orange}>{comment.owner.slice(0, 1)}</Avatar>
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
