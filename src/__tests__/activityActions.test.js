import {
  fetchActivities,
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_FAILURE,
  FETCH_ACTIVITIES_SUCCESS
} from "../store/actions/activityActions";

import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("fetch activities async action", () => {
  // clear data & reset fetch() after each test
  afterEach(() => {
    fetchMock.restore();
  })

  it("creates FETCH_ACTIVITIES_SUCCESS when fetching has been done", () => {
    const cityName = "testCity";
    const itineraryName = "testItinerary";
    const token = "testToken";
    
    fetchMock.getOnce(`http://localhost:5000/cities/${cityName}/itineraries/${itineraryName}`, {
      // body and headers of response
      body: [{ "title": "testActivity1" }],
      headers: { "content-type": "application/json" }
    })

    const expectedActions = [
      {
        type: FETCH_ACTIVITIES_REQUEST,
        itineraryName: itineraryName
      },
      {
        type: FETCH_ACTIVITIES_SUCCESS,
        itineraryName: itineraryName,
        activities: [{ "title": "testActivity1" }]
      }
    ];

    const store = mockStore({
      activity: {
        [itineraryName]: {
          activities: []
        }
      }
    })

    return store.dispatch(fetchActivities(cityName, itineraryName, token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("creates FETCH_ACTIVITIES_FAILURE when fetching fails", () => {
    const cityName = "testCity";
    const itineraryName = "testItinerary";
    const token = "testToken";
    
    const resError = new TypeError("Failed to fetch data.");

    fetchMock.getOnce(`http://localhost:5000/cities/${cityName}/itineraries/${itineraryName}`, {
      // throw error as response
      throws: resError   
    })

    const expectedActions = [
      {
        type: FETCH_ACTIVITIES_REQUEST,
        itineraryName: itineraryName
      },
      {
        type: FETCH_ACTIVITIES_FAILURE,
        itineraryName: itineraryName
      }
    ];

    const store = mockStore({
      activity: {
        [itineraryName]: {
          activities: []
        }
      }
    })

    return store.dispatch(fetchActivities(cityName, itineraryName, token))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
