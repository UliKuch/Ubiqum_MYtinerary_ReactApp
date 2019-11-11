import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: 200,
    height: 200,
    // if screen size is smaller than 600px (xs), change height to 100px
    [theme.breakpoints.down('xs')]: {
      height: 100,
    },
    width: "100%",
    marginTop: theme.spacing(2)
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",
  }
}));

function Logo() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <img className={classes.img}
        alt="MYtinerary Logo"
        src="/images/MYtineraryLogo.png"
      />
    </Container>
  )
}

export default Logo;