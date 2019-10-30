import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

// redux
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/userActions";

const DropDownMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

// pass selectedMenuItem="Pagename" as props
function Navbar(props) {
  // for drop down functionality
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick = (event, setAnchorEl) => {;
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (setAnchorEl) => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.logoutUser(window.localStorage.getItem("userToken"))
  }

  // use props to set which element in drop down navigation is
  // displayed as selected
  const selectedMenuItem = props.selectedMenuItem;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ width: '100%' }}
          >
            <IconButton
              aria-label="account"
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={(event) => {handleClick(event, setAnchorEl1)}}
            >
              {
                props.userImage
                ? <Avatar src={props.userImage} />
                : <AccountCircle fontSize="large" />
              }
            </IconButton>
            <DropDownMenu
              id="account-menu"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={() => handleClose(setAnchorEl1)}
            >
              {
                !props.userEmail
                ? 
                <div>
                  <MenuItem
                    component={Link}
                    to="/user/create-account"
                    selected={selectedMenuItem === "CreateAccount"}
                    onClick={() => handleClose(setAnchorEl1)}
                  >
                    Create Account
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/user/login"
                    selected={selectedMenuItem === "Login"}
                    onClick={() => handleClose(setAnchorEl1)}
                  >
                    Login
                  </MenuItem>
                </div>
                :
                <MenuItem
                  onClick={() => {
                    handleLogout(props.userEmail);
                    handleClose(setAnchorEl1);
                  }}
                >
                  Logout
                </MenuItem>
              }
            </DropDownMenu>
            <IconButton
              aria-label="menu"
              aria-controls="hamburger-menu"
              aria-haspopup="true"
              onClick={(event) => {handleClick(event, setAnchorEl2)}}
            >
              <MenuIcon />
            </IconButton>
            <DropDownMenu
              id="hamburger-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={() => handleClose(setAnchorEl2)}
            >
              <MenuItem
                component={Link}
                to="/"
                selected={selectedMenuItem === "Home"}
              >
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/cities"
                selected={selectedMenuItem === "Cities"}
              >
                Cities
              </MenuItem>
            </DropDownMenu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userEmail: state.user.userEmail,
    userImage: state.user.userImage,
    userId: state.user.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: token => dispatch(logoutUser(token))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Navbar);