import React from 'react';
import Loader from './Loader'
import Activities from './Activities'
import Comments from './Comments'

// redux
import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";
import { postActivity } from "../store/actions/activityActions";
import { getFavitin, postFavitin } from "../store/actions/userActions";

// Material-UI
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Typography, Avatar, Button, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';

const styleClassComponent = {
  container: {
    width: "100%"
  },
  // TODO: use breakpoints (for which a change to a funcional component
  // would be necessary, I think)
  avatar: {
    // here, breakpoint would make sense, for which I would need to change
      // the class component to a functional one
    height: 60,
    width: 60
  },
  marginRight: {
    marginRight: 8
  },
  itinGridContainer: {
    overflow: "hidden",
  },
  textWrap: {
    maxWidth: "100%"
  },
  text: {
    display: "block"
  },
  activitiesAndCommentsWrapper: {
    width: "100%"
  },
  expPanelSum: {
    padding: 8
  }
}

const useStyles = makeStyles(theme => ({
  addActivityButton: {
    maxWidth: 300,
    margin: theme.spacing(2)
  },
  submitActivityButton: {
    maxWidth: 300,
    margin: theme.spacing(2)
  },
}))

function AddActivity(props) {
  const [expanded, setExpanded] = React.useState(false);

  const [values, setValues] = React.useState({
    title: "",
    img: ""
  });

  const classes = useStyles()

  const handleClick = () => {
    setExpanded(true);
  };

  const handleChangeTextField = name => event => {
    setValues({ ...values, [name]: event.target.value})
  }

  return (
    <form>
      <Button
        variant="contained"
        color="secondary"
        type="button"
        className={classes.addActivityButton}
        disabled={expanded}
        onClick={() => handleClick()}
      >
        Add Activity
      </Button>
      {expanded &&
        <>
          <TextField
            required
            label="Activity Title"
            placeholder="Enter title of your activity"
            value={values.title}
            onChange={handleChangeTextField("title")}
          />
          <TextField
          required
            label="Activity Image"
            placeholder="Enter url to image"
            value={values.img}
            onChange={handleChangeTextField("img")}
          
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.submitActivityButton}
            disabled={!expanded}
            onClick={event => {
              setExpanded(false);
              props.handleSubmit(event, values);
              setValues({
                title: "",
                img: ""
              })
            }}
          >
            Submit Activity
          </Button>
        </>
      }
    </form>
  )

}


class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: false,
      expanded: false
    }
  }

  componentWillUnmount() {
    document.querySelector("#expPanel").removeEventListener("change", this.handleChange)
  }

  // if expand button is clicked for the first time,
  // the activities are rendered (and hence fetched) and stay rendered;
  handleChange() {
    this.setState(() => ({
      expanded: !this.state.expanded,
      rendered: true
    }))
  }

  render() {
    const handleSubmit = async (event, activity) => {
      event.preventDefault();

      const token = window.localStorage.getItem("userToken");

      await this.props.postActivity(this.props.cityName, this.props.itin.title, activity, token);

      console.log("Handle Submit");
    }


    return (
      <ExpansionPanel
        id="expPanel"
        expanded={this.state.expanded}
        onChange={() => this.handleChange()}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={styleClassComponent.expPanelSum}
        >

          <Grid
            container
            style={styleClassComponent.itinGridContainer}
            spacing={2}
          >

            <Grid
              item container
              xs={3}
              alignItems="center"
              direction="column"
              className="user-container"
              style={styleClassComponent.itinGridContainer}
            >
              <Avatar
                src={this.props.itin.profilePicture}
                alt={"Profile picture of " + (this.props.itin.authorUsername || this.props.itin.authorEmail)}
                // display substitute image if userImage path from db does not work
                // (there does not seem to be a way to display material-ui icon instead)
                imgProps={{ onError: (e) => { e.target.src = "/images/userIcon.png" } }}
                style={styleClassComponent.avatar}
              />
              <Grid
                item
                style={styleClassComponent.textWrap}
              >
                <Typography
                noWrap
                variant="caption" 
                style={styleClassComponent.text}
                >
                  {this.props.itin.authorUsername || this.props.itin.authorEmail}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item container
              xs={9}
              direction="column"
              className="itinDescription">

              <Grid item container>
                <Typography variant="h5">
                  {this.props.itin.title}
                </Typography>
              </Grid>

              <Grid
                item container
                className="itinDetails"
                justify="space-between"
              >
                <Grid item style={styleClassComponent.marginRight}>
                  <Typography>{`Likes: ${this.props.itin.likes}`}</Typography>
                </Grid>

                <Grid item style={styleClassComponent.marginRight}>
                  <Typography>
                    {
                      (this.props.itin.duration < 24) ? this.props.itin.duration + " Hours" : 
                        (this.props.itin.duration % 24 < 8) ?
                          (this.props.itin.duration / 24 >> 0) + " Days" :
                        (this.props.itin.duration % 24 > 16) ?
                          ((this.props.itin.duration / 24 >> 0) + 1) + " Days" :
                        (this.props.itin.duration / 24 >> 0) + ".5 Days"
                   }
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography>{"$".repeat(this.props.itin.price)}</Typography>
                </Grid>

              </Grid>

              <Grid item container justify="space-between" wrap="nowrap">

                <Grid item container className="hashtags" style={styleClassComponent.textWrap}>
                  {this.props.itin.hashtags.map(hashtag => {
                    return (
                      <Typography
                        noWrap
                        style={styleClassComponent.marginRight}
                        key={hashtag}
                      >
                        {"#" + hashtag}
                      </Typography>
                    )
                  })}
                </Grid>

                <Grid item>
                  {
                    this.props.favorite
                    ?
                    <StarIcon onClick={event => this.props.onClick(event, this.props.itin.title)} />
                    :
                    <StarBorderIcon onClick={event => this.props.onClick(event, this.props.itin.title)} />
                  }
                </Grid>

              </Grid>

            </Grid>

          </Grid>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={styleClassComponent.activitiesAndCommentsWrapper}>
            {
              (!this.state.rendered) ||
              <div>
              <Activities
                cityName={this.props.itin.city}
                itineraryName={this.props.itin.title}
              />

              {
                (this.props.itin.authorId === this.props.user.userId) 
                &&
                <AddActivity
                  handleSubmit={handleSubmit}
                />
              }
              <Comments
                cityName={this.props.itin.city}
                itin={this.props.itin.title}
              />
              </div>
            } 
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}


class Itineraries extends React.Component {
  componentDidMount() {
    // fetch itineraries
    this.props.fetchItineraries(this.props.cityName,
        window.localStorage.getItem("userToken"));

    // get favorited itineraries if user is logged in (i.e. token exists)
    if (window.localStorage.getItem("userToken")) {
      this.props.getFavitin(window.localStorage.getItem("userToken"));
    }
  }

  handleFavoriting(event, itinTitle) {
    // prevent expansion panel from expanding
    event.stopPropagation();
    
    // favorite/unfavorite if user is logged in, send alert if not
    if (window.localStorage.getItem("userToken")) {
      this.props.postFavitin(itinTitle, window.localStorage.getItem("userToken"))
    } else {
      alert("You need to be logged in to favorite itineraries.")
    }
  }

  render() {
    const itineraries = this.props.itineraries.map(itin => {
      return (
        <Itinerary 
          cityName={this.props.cityName}
          itin={itin}
          key={itin._id}
          user={this.props.user}
          favorite={this.props.user.favoriteItineraries.includes(itin.title)}
          onClick={(event, itinTitle) => this.handleFavoriting(event, itinTitle)}
          postActivity={(cityName, itineraryName, activity, token) =>
              this.props.postActivity(cityName, itineraryName, activity, token)}
        />
      )
    })

    return (  
      <div style={styleClassComponent.container}>
        {this.props.isFetching ? <Loader /> : itineraries}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {cityName} = ownProps;

  return {
    itineraries: state.itinerary.itineraries,
    isFetching: state.itinerary.isFetching,
    cityName,
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: (cityName, token) => dispatch(fetchItineraries(cityName, token)),
    getFavitin: token => dispatch(getFavitin(token)),
    postFavitin: (itin, token) => dispatch(postFavitin(itin, token)),
    postActivity: (cityName, itineraryName, activity, token) => dispatch(postActivity(cityName, itineraryName, activity, token))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Itineraries);