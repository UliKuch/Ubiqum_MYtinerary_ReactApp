import React /*, { useState, useEffect, useRef, useCallback } */ from 'react';

// Material-UI
import {
  Grid,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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

  // commented out because ajax request to passport authentication endpoint
  // did throw CORS error. use page redirect instead.
  // ----------------------------------------------------------------------
  // const [isSending, setIsSending] = useState(false)
  // const isMounted = useRef(true)

  // // set isMounted to false when we unmount the component
  // // to avoid warning when trying to update unmounted component
  // useEffect(() => {
  //   return () => {
  //     isMounted.current = false
  //   }
  // }, [])

  // const handleGoogleClick = useCallback(async () => {
  //   // cancel if we are already sending
  //   if (isSending) return

  //   // update state
  //   setIsSending(true)
    
  //   console.log("Attempting Google Login...");

  //   // send request
  //   try {
  //     await fetch("http://localhost:5000/user/google");
  //   } catch (error) {
  //     console.error(error)
  //   }

  //   console.log("GET request performed");

  //   // after request is sent, update state again if still mounted
  //   if (isMounted.current) {
  //     setIsSending(false)
  //   }

  // }, [isSending]) // dependency, only updates is value changes
  //----------------------------------------------------------------------


  return (
    <Grid container item justify="center">
      <Button
        variant="contained"
        type="button"
        className={classes.submitButton}

        // when using AJAX req, commented out
        // button will be disabled if isSending=true
        // disabled={isSending}
        // onClick={handleGoogleClick}

        // redirect instead of GET
        // target="_blank"
        href="http://localhost:5000/user/google"
      >
        Login with Google
      </Button>
    </Grid>
  )
}

export default GoogleLogin