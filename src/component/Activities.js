import React from 'react';
import Loader from './Loader'

// redux
import { connect } from "react-redux";
import { fetchActivities } from "../store/actions/activityActions";

function Activity(props) {
  return (
    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 d-flex align-items-stretch">
      <div className="card mb-4">
        <img className="card-img-top" src={props.activity.img} alt={"Image for " + props.activity.title + " activity"} style={{ maxHeight: 300, maxWidth: 300 }} />
        <div className="card-img-overlay d-flex justify-content-center align-items-center">
          <h4 className="card-title">{props.activity.title}</h4>
        </div>
      </div>
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
        <div className="allActivitiesContainer d-flex" id="activitiesContainer">
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
    // ? : syntax to avoid error because of undefined values since no proper initial state is defined in redux
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