import React from 'react';
import Loader from './Loader'
import Activities from './Activities'

// redux
import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";

// Material-UI
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Typography, Avatar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styleClassComponent = {
  container: {
    width: "100%"
  },
  // TODO: use breakpoints (for which a change to a funcional component
  // would be necessary, I think)
  avatar: {
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
  activitiesWrapper: {
    width: "100%"
  }
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
                alt={"Profile picture of " + this.props.itin.author}
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
                  {this.props.itin.author}
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

            </Grid>

          </Grid>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={styleClassComponent.activitiesWrapper}>
            {
              (!this.state.rendered) ||
              <Activities
              cityName={this.props.itin.city}
              itineraryName={this.props.itin.title}
              />
            } 
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}


class Itineraries extends React.Component {
  componentDidMount() {
    this.props.fetchItineraries(this.props.cityName)
  }

  render() {
    const itineraries = this.props.itineraries.map(itin => {
      return (
        <Itinerary 
        itin={itin}
        key={itin._id}
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
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: (cityName) => dispatch(fetchItineraries(cityName)),
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Itineraries);