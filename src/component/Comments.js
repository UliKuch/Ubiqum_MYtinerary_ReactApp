import React from 'react';
import Loader from './Loader'

// redux
import { connect } from "react-redux";
import { fetchComments, postComment } from "../store/actions/itineraryActions";

// Material-UI
import {
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core';


function Comment(props) {
  return (
    <Paper>
      <Typography variant="h6" component="h4">
        {props.comment.author + " commented on " + props.comment.date + ":"}
      </Typography>
      <Typography component="p">
        {props.comment.body}
      </Typography>
    </Paper>
  )
};


function AddComment(props) {

  const [newComment, setNewComment] = React.useState({
    commentBody: "",
  })

  const handleChangeTextField = name => event => {
    setNewComment({ ...newComment, [name]: event.target.value });
  };

  return (
    <form
      onSubmit={event => props.handleSubmit(event, newComment.commentBody)}
    >
      <TextField
        required
        placeholder="Enter your comment here."
        value={newComment.commentBody}
        onChange={handleChangeTextField("commentBody")}
      />
      <Button
        variant="contained"
        color="secondary"
        type="submit"
      >
        Submit Comment
      </Button>
    </form>
  )


  // add warning that if there is no username, email will be used as username


};


function Comments(props) {
  // fetch comments
  // using .call() to avoid a linter error telling to add props to dependencies
    // or destruct props outside of hook. Apparently triggered by using
    // a function passed as props.
    // also see: https://github.com/facebook/react/issues/16265
  React.useEffect(() => {  
    props.fetchComments.call(null, props.itin, props.cityName,
      window.localStorage.getItem("userToken"))
  }, [props.itin, props.cityName, props.fetchComments])

  const handleSubmit = async (event, commentBody) => {
    // prevent page reload
    event.preventDefault();

    // POST comment
    await props.postComment(commentBody, props.itin, props.cityName,
        window.localStorage.getItem("userToken"));

    // reload comments
    await props.fetchComments(props.itin, props.cityName,
        window.localStorage.getItem("userToken"))
  }

  const comments = props.comments.map(comment => {
    return (
      <Comment
        comment={comment}
        key={comment._id}
      />
    )
  })

  return (
    <div>
    <Typography variant="h4" component="h3">
      Comments
    </Typography>
    {props.fetchingComments ? <Loader /> : comments}
    {props.isLoggedIn
      ?
      <AddComment
        handleSubmit={(event, commentBody) => handleSubmit(event, commentBody)}
      />
      :
      <Typography variant="h5">
        Please log in to comment.
      </Typography>
    }
    </div>
  )
};

function mapStateToProps(state, ownProps) {
  const {itin, cityName} = ownProps

  return {
    isLoggedIn: state.user.isLoggedIn,
    fetchingComments: state.itinerary[itin] ?
        state.itinerary[itin].fetchingComments : false,
    comments: state.itinerary[itin] ?
        state.itinerary[itin].comments ?
        state.itinerary[itin].comments
        : [] : [],
    itin,
    cityName
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComments: (itin, cityName, token) =>
        dispatch(fetchComments(itin, cityName, token)),
    postComment: (commentBody, itin, cityName, token) =>
        dispatch(postComment(commentBody, itin, cityName, token))
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Comments);