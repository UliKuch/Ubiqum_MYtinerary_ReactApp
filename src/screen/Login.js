import React from 'react';

import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

// redux
// import { connect } from "react-redux";

// Material-UI
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Visibility, 
  VisibilityOff,
} from '@material-ui/icons';

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
  submitButton: {
    margin: theme.spacing(1),
    alignSelf: "center"
  }
}));

function LoginForm(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    showPassword: false,

    // set initial values to avoid uncontrolled components
    username: "",
    password: "",
  });

  const handleChangeTextField = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <form
      className={classes.formContainer}
      onSubmit={(event) => props.handleSubmit(event, values)}
    >
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

class Login extends React.Component {
  handleSubmit(event, user) {
    // prevents page reload
    event.preventDefault();

    console.log(user);
  }

  render() {
    return (
      <div>
        <Navbar
          selectedMenuItem="Login"
        />
        <Grid container direction="column">
          <Typography variant="h4">Login</Typography>
          <LoginForm
            handleSubmit={(event, user) => this.handleSubmit(event, user)}
          />
        </Grid>
        <Footer />
      </div>
    )
  }

}

export default Login