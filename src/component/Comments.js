import React from 'react';
import Loader from './Loader'

// redux
import { connect } from "react-redux";
import {
  fetchComments,
  postComment,
  editComment,
  deleteComment
} from "../store/actions/itineraryActions";

// Material-UI
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  commentPaper: {
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column"
  },
  addCommentFormBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submitButton: {
    maxWidth: 300,
    marginTop: theme.spacing(2)
  },
  commentInputField: {
    width: "80%"
  },
  commentIconContainerParent: {
    position: "relative"
  },
  commentIconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    marginLeft: theme.spacing(3),
    maxWidth: 50
  },
  commentFormBody: {
    display: "flex",
    flexDirection: "column",
  },
  editButtons: {
    maxWidth: 100,
    margin: theme.spacing(1)
  },
  commentTitle: {
    overflow: "hidden",
    marginRight: 50
  },
  commentMainText: {
    overflow: "hidden"
  }
}));

function Comment(props) {
  const classes = useStyles();

  const [editing, setEditing] = React.useState(
    false,
  );

  const [comment, setComment] = React.useState({
    commentBody: props.comment.body,
  });

  // format date
  const date = new Date(props.comment.date);
  const lastUpdated = props.comment.lastUpdateAt ?
      new Date(props.comment.lastUpdateAt) : null;

  // set username or, if no username exists, email as name of commenter
  const name = props.comment.authorUsername || props.comment.authorEmail;

  // change text of comment text field
  const handleChangeTextField = () => event => {
    setComment({ ...comment, commentBody: event.target.value });
  };

  // discard edit - reset comment to original text
  const handleDiscard = () => {
    setComment({...comment, commentBody: props.comment.body});
    setEditing(false);
  }

  // edit comment
  const handleSubmit = event => {
    event.preventDefault();
    // only submit changes if comment was actually updated
    if (comment.commentBody !== props.comment.body) {
      // TODO: handle multi line comments (saved as multi line in db, but not displayed as such -
        // will be changed even if nothing was edited)
      props.handleEdit(event, comment.commentBody, props.comment._id);
    }
    setEditing(false);
  }


  return (
    <Paper
      className={classes.commentPaper}
    >
      <Grid
        item container
        direction="row"
        justify="center"
        className={classes.commentIconContainerParent}
      >
        <Typography
          variant="h6"
          component="h4"
          className={classes.commentTitle}
        >
          {name + " commented on " +
              date.toLocaleString() + ":"}
        </Typography>
        {
          (props.comment.authorId === props.userId)
          &&
          <Grid
            item
            className={classes.commentIconContainer}
          >
            <EditIcon onClick={event => setEditing(true)} />
            <DeleteIcon onClick={event => props.handleDelete(event, props.comment._id)} />          
          </Grid>
        }
      </Grid>

      {
        editing
        ?
        <form
          className={classes.commentFormBody}
          onSubmit={event => handleSubmit(event)}
        >
          <TextField
            value={comment.commentBody}
            onChange={handleChangeTextField("commentBody")}
          />
          <div>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.editButtons}
              disabled={!editing}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              className={classes.editButtons}
              disabled={!editing}
              onClick={handleDiscard}
            >
              Discard
            </Button>
          </div>
        </form>
        :
        <Typography component="p" className={classes.commentMainText}>
          {comment.commentBody}
        </Typography>
      }
      
      {
        lastUpdated &&
        <Typography variant="caption" gutterBottom>
          {"last updated at " + lastUpdated.toLocaleString()}
        </Typography>
      }
    </Paper>
  )
};


function AddComment(props) {
  const classes = useStyles();

  const [newComment, setNewComment] = React.useState({
    commentBody: "",
  })

  const handleChangeTextField = name => event => {
    setNewComment({ ...newComment, [name]: event.target.value });
  };

  return (
    <form
      onSubmit={event => {
        props.handleSubmit(event, newComment.commentBody);
        setNewComment({commentBody: ""});
      }}
      className={classes.addCommentFormBody}
    >
      <TextField
        required
        multiline
        helperText={props.username ? "" : "If you did not provide a username, your email address will be displayed with your comment."}
        placeholder="Enter your comment here."
        value={newComment.commentBody}
        onChange={handleChangeTextField("commentBody")}
        className={classes.commentInputField}
      />
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.submitButton}
        disabled={props.postingComment}
      >
        Submit Comment
      </Button>
    </form>
  )
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

  // POST comment
  const handleSubmit = async (event, commentBody) => {
    // prevent page reload
    event.preventDefault();

    // POST comment
    await props.postComment(commentBody, props.itin, props.cityName,
        window.localStorage.getItem("userToken"));

    // reload comments
    await props.fetchComments(props.itin, props.cityName,
        window.localStorage.getItem("userToken"));
  };

  // edit comment
  const handleEdit = async (event, commentBody, commentId) => {
    // PUT edit comment
    await props.editComment(commentBody, commentId, props.itin, props.cityName,
      window.localStorage.getItem("userToken"));

    // reload comments
    await props.fetchComments(props.itin, props.cityName,
      window.localStorage.getItem("userToken"));
  };

  // delete comment
  const handleDelete = async (event, commentId) => {
    // DELETE comment
    await props.deleteComment(commentId, props.itin, props.cityName,
      window.localStorage.getItem("userToken"));

    // reload comments
    await props.fetchComments(props.itin, props.cityName,
      window.localStorage.getItem("userToken"));
  };

  const comments = props.comments.map(comment => {
    return (
      <Comment
        comment={comment}
        key={comment._id}
        username={props.username}
        userId={props.userId}
        handleEdit={(event, commentBody, commentId) => handleEdit(event, commentBody, commentId)}
        handleDelete={(event, commentId) => handleDelete(event, commentId)}
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
        username={props.username}
        postingComment={props.postingComment}
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
    postingComment: state.itinerary[itin] ?
    state.itinerary[itin].postingComment : false, 
    itin,
    cityName,
    username: state.user.username ? state.user.username : "",
    userId: state.user.userId ? state.user.userId : ""
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComments: (itin, cityName, token) =>
        dispatch(fetchComments(itin, cityName, token)),
    postComment: (commentBody, itin, cityName, token) =>
        dispatch(postComment(commentBody, itin, cityName, token)),
    editComment: (commentBody, commentId, itin, cityName, token) =>
        dispatch(editComment(commentBody, commentId, itin, cityName, token)),
    deleteComment: (commentId, itin, cityName, token) =>
        dispatch(deleteComment(commentId, itin, cityName, token)),
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Comments);