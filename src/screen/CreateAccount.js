import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

// redux
// import { connect } from "react-redux";
import {  } from "../store/actions/cityActions";

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
    alignSelf: "center"
  }
}));

function CreateAccountForm() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    country: "",
    showPassword: false,
    checked: false
  });
  
  const handleChangeTextField = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCountry = name => event => {
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

  const handleSubmit = event => {
    console.log(values);
    event.preventDefault();
  }

  return (
    <form
      className={classes.formContainer}
      onSubmit={handleSubmit}
    >
      <Avatar className={classes.avatar}>
        <AccountCircle style={{ fontSize: 300 }}/>
      </Avatar>

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
        onChange={handleChangeCountry("country")}

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

  render() {

    return (
      <div>
        <Navbar 
          selectedMenuItem="CreateAccount"
        />
        <Grid container direction="column">
          <Typography variant="h4">Create Account</Typography>
          <CreateAccountForm />
        </Grid>
        <Footer />
      </div>
    )
  }
}

export default CreateAccount