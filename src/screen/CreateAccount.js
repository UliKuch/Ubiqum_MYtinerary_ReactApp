import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import GoogleLogin from '../component/GoogleLogin';

// redux
import { connect } from "react-redux";
import { postUser } from "../store/actions/userActions";

// Material-UI
import {
  Avatar,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Visibility, 
  VisibilityOff,
  AccountCircle
} from '@material-ui/icons';

// for countries drop down
const countries = [
  {
    value: "France",
    label: "France"
  },
  {
    value: "Germany",
    label: "Germany"
  },
  {
    value: "Netherlands",
    label: "Netherlands"
  },
  {
    value: "Ireland",
    label: "Ireland"
  },
  {
    value: "Spain",
    label: "Spain"
  },
  {
    value: "United Kingdom",
    label: "United Kingdom"
  },
  {
    value: "United States",
    label: "United States"
  },
  {
    value: "Other",
    label: "Other"
  }
]

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    maxWidth: 300
  },
  formContainer: {
    display: "flex",
    flexDirection: "column"
  },
  checkbox: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  avatar: {
    width: 300,
    height: 300,
    alignSelf: "center"
  },
  submitButton: {
    margin: theme.spacing(1),
    alignSelf: "center",
    width: "100%",
    maxWidth: 300
  }
}));

function CreateAccountForm(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    country: "",
    showPassword: false,
    checked: false,

    // set initial values to avoid uncontrolled components
    userImage: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: ""
  });
  
  const handleChangeTextField = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCheckbox = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // TODO: add client side validation (pw length, email etc.)

  return (
    <form
      className={classes.formContainer}
      onSubmit={(event) => props.handleSubmit(event, values)}
    >
    {
      values.userImage
      ?
      <Avatar
        src={values.userImage}
        imgProps={{ onError: (e) => { e.target.src = "/images/cross.png" } }}
        className={classes.avatar}
      />
      :
      <Avatar className={classes.avatar}>
        <AccountCircle style={{ fontSize: 300 }}/>
      </Avatar>
    }
      <TextField
        required
        id="UserImage"
        label="User Image"
        placeholder="Enter URL to User Image"
        className={classes.textField}
        value={values.userImage}
        onChange={handleChangeTextField("userImage")}
      />

      <TextField
        required
        id="FirstName"
        label="First Name"
        placeholder="Enter First Name"
        className={classes.textField}
        value={values.firstName}
        onChange={handleChangeTextField("firstName")}
      />

      <TextField
        required
        id="LastName"
        label="Last Name"
        placeholder="Enter Last Name"
        className={classes.textField}
        value={values.lastName}
        onChange={handleChangeTextField("lastName")}
      />

      <TextField
        required
        id="Username"
        label="Username"
        placeholder="Enter Username"
        className={classes.textField}
        value={values.username}
        onChange={handleChangeTextField("username")}
      />

      <FormControl
        required
        id="Password"
        className={classes.textField}
        placeholder="Enter Password"
      >
        <InputLabel htmlFor="adornment-password">Password</InputLabel>
        <Input
          id="adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChangeTextField("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton 
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <TextField
        required
        id="Email"
        label="E-Mail"
        placeholder="Enter E-Mail"
        className={classes.textField}
        value={values.email}
        onChange={handleChangeTextField("email")}
      />

      <TextField
        required
        select
        id="Country"
        label="Country"
        placeholder="Choose Country"
        className={classes.textField}
        value={values.country}
        onChange={handleChangeTextField("country")}
      >
        {countries.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            required
            checked={values.checked}
            onChange={handleChangeCheckbox("checked")}
            value="checked"
          />
        }
        label={<label>I agree to MYtinerary's {<Link to="#">
            Terms and Conditions</Link>}.</label>}
      />

      <Button
        variant="contained"
        color="secondary"
        className={classes.submitButton}
        type="submit"
      >
        Submit
      </Button>

    </form>
  )
}


class CreateAccount extends React.Component {
  componentDidMount() {
    // route to landing page if a user is logged in (i.e. if token exists)
    if (window.localStorage.getItem("userToken")) {
      this.props.history.push("/")
    }
  }

  async handleSubmit(event, user) {
    // prevents page reload
    event.preventDefault();

    console.log(user);
    // add user to db and, if successful, log user in
    await this.props.postUser(user)

    // reload after login (logegd in users will be rerouted to landing page)
    window.location.reload();
  }

  render() {

    return (
      <div>
        <Navbar 
          selectedMenuItem="CreateAccount"
        />
        <Grid container direction="column">
          <Grid item container direction="column">
            <Typography variant="h4">Create Account</Typography>
            <CreateAccountForm
              handleSubmit={(event, user) => this.handleSubmit(event, user)}
            />
          </Grid>
          <Typography>or</Typography>
          <GoogleLogin />
        </Grid>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    isPosting: state.postUser.isPosting,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postUser: (user) => dispatch(postUser(user)),
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CreateAccount);