import {
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_FAILURE,
  FETCH_ACTIVITIES_SUCCESS
} from "../store/actions/activityActions";
import {activityReducer} from "../store/reducers/activityReducer";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("fetch activities reducer", () => {
  it("should return initial state", () => {
    expect(activityReducer(undefined, {})).toEqual({})
  }) 

  it("should handle FETCH_ACTIVITIES_REQUEST", () => {
    expect(activityReducer({}, {
      type: FETCH_ACTIVITIES_REQUEST,
      itineraryName: "testItinerary"
    }))
    .toEqual({
      testItinerary: {
        isFetching: true
      }, 
    })
  })

  it("should handle FETCH_ACTIVITIES_FAILURE", () => {
    expect(activityReducer({}, {
      type: FETCH_ACTIVITIES_FAILURE,
      itineraryName: "testItinerary"
    }))
    .toEqual({
      testItinerary: {
        isFetching: false
      }, 
    })
  })

  it("should handle FETCH_ACTIVITIES_SUCCESS", () => {
    expect(activityReducer({}, {
      type: FETCH_ACTIVITIES_SUCCESS,
      itineraryName: "testItinerary",
      activities: [
        {title: "testActivity1"},
        {title: "testActivity2"}
      ]
    }))
    .toEqual({
      testItinerary: {
        isFetching: false,
        activities: [
          {title: "testActivity1"},
          {title: "testActivity2"}
        ]
      }, 
    })
  })
})