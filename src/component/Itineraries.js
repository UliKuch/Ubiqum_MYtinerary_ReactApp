import React from 'react';
import Loader from './Loader'
import Activities from './Activities'

// redux
import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isExtended: false
    // }
  }

  // handleClick() {    
  //   this.setState(() => ({
  //     isExtended: !this.state.isExtended
  //   }))
  // }

  render() {
    return (
      <div className="itineraryContainer d-flex flex-column card mb-3 border">
        <div className="card-header border-bottom-0 bg-white d-flex flex-column" id={`heading${this.props.itin._id}`}>
          <div className="overviewContainer d-flex flex-row">
            <div className="userContainer d-flex flex-column mr-3">
              <div className="imageContainer">
                <img className="rounded-circle" src={this.props.itin.profilePicture} alt={"Profile picture of " + this.props.itin.author} style={{ maxHeight: 80, width: 80 }}/>
              </div>
              <div className="authorNameContainer">
                <p>{this.props.itin.author}</p>
              </div>
            </div>
            <div className="itineraryDescriptionContainer d-flex flex-column">
              <div>
                <h3>{this.props.itin.title}</h3>
              </div>
              <div className="itineraryDetailsContainer d-flex flex-row justify-content-around">
                <div>
                  <p>{`Likes: ${this.props.itin.likes}`}</p>
                </div>
                <div>
                  <p>{
                    (this.props.itin.duration < 24) ? this.props.itin.duration + " Hours" : 
                    (this.props.itin.duration % 24 < 8) ? (this.props.itin.duration / 24 >> 0) + " Days" :
                    (this.props.itin.duration % 24 > 16) ? ((this.props.itin.duration / 24 >> 0) + 1) + " Days" :
                      (this.props.itin.duration / 24 >> 0) + ".5 Days"
                  }</p>
                </div>
                <div>
                  <p>{"$".repeat(this.props.itin.price)}</p>
                </div>
              </div>
              <div className="hashtagContainer d-flex flex-row">
                {this.props.itin.hashtags.map(hashtag => {
                  return (
                    <p className="mr-2" key={hashtag}>{"#" + hashtag}</p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div id={`collapse${this.props.itin._id}`} className="collapse" aria-labelledby={`heading${this.props.itin._id}`} data-parent="#itinerariesAccordion">
          <div className="card-body">
            {(true) ?
              <Activities
              cityName={this.props.itin.city}
              itineraryName={this.props.itin.title}
              /> :
              ""
            } 
          </div>
        </div>
        <div className="expandContainer card-footer border-top-0">
          <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${this.props.itin._id}`} aria-expanded="true" aria-controls={`collapse${this.props.itin._id}`}>
          {(false) ?
          "View Less" :
          "View All"
          }               
          </button>
        </div>
      </div>
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
      <div className="accordion allItinerariesContainer" id="itinerariesAccordion">
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