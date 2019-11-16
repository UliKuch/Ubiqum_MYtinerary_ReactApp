import React /*, { useState, useEffect, useRef, useCallback } */ from 'react';

// Material-UI
import {
  Grid,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const url = require("../config.js");

const useStyles = makeStyles(theme => ({
  submitButton: {
    margin: theme.spacing(1),
    alignSelf: "center",
    width: "100%",
    maxWidth: 300
  }
}));

function GoogleLogin() {
  const classes = useStyles()

  return (
    <Grid container item justify="center">
      <Button
        variant="contained"
        type="button"
        className={classes.submitButton}
        href={`${url}/user/google`}
      >
        Login with Google
      </Button>
    </Grid>
  )
}

export default GoogleLogin