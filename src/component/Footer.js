import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: 50,
  },
});

function Footer() {
  const classes = useStyles();

  // TODO: move adjustments in index.css to theme

  let history = useHistory();

  function handleGoBack() {
    // not sure if this is save; especially with login and google login routes
    history.goBack();
  }

  return (
    <BottomNavigation
      className={classes.stickToBottom}
    >
      <BottomNavigationAction
        aria-label="Back"
        icon={<ArrowLeftIcon />}
        onClick={handleGoBack}
      />
      <BottomNavigationAction
        aria-label="Home"
        icon={<HomeIcon />}
        onClick={() => history.push("/")}
      />
      <BottomNavigationAction

      // TODO: remove this element & position properly

      />
    </BottomNavigation>
  )
}

export default Footer;