import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
  const [value, setValue] = React.useState(0);

  // TODO: show home button as active on home,
  // back as active if there is a previous page
  // alternatively display all or no buttons as active

  // TODO: move adjustments in index.css to theme

  return (
    <BottomNavigation
      className={classes.stickToBottom}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        aria-label="Back"
        icon={<ArrowLeftIcon />}

        // TODO: Link to previous page

        component={Link}
        to="."
      />
      <BottomNavigationAction
        aria-label="Home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
      
      // TODO: remove this element & position properly

       aria-label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  )
}

export default Footer;