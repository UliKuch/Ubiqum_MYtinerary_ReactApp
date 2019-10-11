import React from 'react';

// redux
import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";

class Itineraries extends React.Component {
  componentDidMount() {
    this.props.fetchItineraries(this.props.cityName)
  }

  render() {
    const itineraries = this.props.itineraries.map(itin => {
      return (      
        <div className="itineraryContainer d-flex flex-column card mb-3 border" key={itin._id}>
          <div className="card-header d-flex flex-column" id={`heading${itin._id}`}>
            <div className="overviewContainer d-flex flex-row">
              <div className="userContainer d-flex flex-column mr-3">
                <div className="imageContainer">
                  <img className="rounded-circle" src={itin.profilePicture} alt={"Profile picture of " + itin.author} style={{ maxHeight: 80, width: 80 }}/>
                </div>
                <div className="authorNameContainer">
                  <p>{itin.author}</p>
                </div>
              </div>
              <div className="itineraryDescriptionContainer d-flex flex-column">
                <div>
                  <h3>{itin.title}</h3>
                </div>
                <div className="itineraryDetailsContainer d-flex flex-row justify-content-around">
                  <div>
                    <p>{`Likes: ${itin.likes}`}</p>
                  </div>
                  <div>
                    <p>{
                      (itin.duration < 24) ? itin.duration + " Hours" : 
                      (itin.duration % 24 < 8) ? (itin.duration / 24 >> 0) + " Days" :
                      (itin.duration % 24 > 16) ? ((itin.duration / 24 >> 0) + 1) + " Days" :
                        (itin.duration / 24 >> 0) + ".5 Days"
                    }</p>
                  </div>
                  <div>
                    <p>{"$".repeat(itin.price)}</p>
                  </div>
                </div>
                <div className="hashtagContainer d-flex flex-row">
                  {itin.hashtags.map(hashtag => {
                    return (
                      <p className="mr-2">{"#" + hashtag}</p>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="expandContainer">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${itin._id}`} aria-expanded="true" aria-controls={`collapse${itin._id}`}>
                View All
              </button>
            </div>
          </div>

          <div id={`collapse${itin._id}`} class="collapse" aria-labelledby={`heading${itin._id}`} data-parent="#itinerariesAccordion">
            <div class="card-body">
              {/*
              <Activities />
              <Comments />
              */}
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="accordion allItinerariesContainer" id="itinerariesAccordion">
        {this.props.isFetching ? <h3>Fetching data...</h3> : itineraries}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  
  const {cityName} = ownProps;

  return {
    itineraries: state.itinerary.itineraries,
    isFetching: state.itinerary.isFetching,
    cityName
  }
};


const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: (cityName) => dispatch(fetchItineraries(cityName))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Itineraries);