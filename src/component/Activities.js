import React from 'react';
import Loader from './Loader'

// redux
import { connect } from "react-redux";
import { fetchActivities } from "../store/actions/activityActions";

function Activity(props) {
  return (
    <div className="activityContainer">
      <h2>{props.activity.title}</h2>
    </div>
  )
}


class Activities extends React.Component {
  componentDidMount() {
    this.props.fetchActivities(this.props.cityName, this.props.itineraryName)
  }

  render() {
    const activities = !this.props.activities ? null : this.props.activities.map(activity => {
      return (
        <Activity 
        activity={activity}
        key={activity._id}
        />
      )
    })

    return (
      <div className="activitiesContainer d-flex flex-column">
        <h3>Activities</h3>
        <div className="allActivitiesContainer" id="activitiesContainer">
          {this.props.isFetching ? <Loader /> : activities}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  
  const {cityName} = ownProps;
  const {itineraryName} = ownProps;

  return {
    activities: state.activity[itineraryName] ? state.activity[itineraryName].activities : [],
    isFetching: state.activity[itineraryName] ? state.activity[itineraryName].isFetching : false,
    cityName,
    itineraryName
  }
};


const mapDispatchToProps = dispatch => {
  return {
    fetchActivities: (cityName, itineraryName) => dispatch(fetchActivities(cityName, itineraryName))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Activities);