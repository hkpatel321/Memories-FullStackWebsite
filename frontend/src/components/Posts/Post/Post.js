import React ,{useState,useEffect}from "react";
import useStyles from "./styles.js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import moment from "moment";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const userId=user?.result.googleId|| user?.result?._id;
 const [likes,setLikes]=useState(post?.likes);
 const hasLikedPost=post.likes.find(
  (like) => like === userId);

  const imageUrl = encodeURI(post.selectedFile);


 const handleLike=()=>{
  dispatch(likePost(post._id));
  if(hasLikedPost){
    setLikes(post.likes.filter((id)=>id!==userId));

  
 }else{
   setLikes([...post.likes,userId]);
 }

}
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userId
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
  <ButtonBase className={classes.cardActions} onClick={openPost} focusRipple>
    <div className={classes.mediaContainer}>
      <img
    
        src={post.selectedFile}
        alt="Post visual"
        title={post.title}
        height={'200px'}
        width={'100%'}
        style={{borderRadius:'5%'}}
      />
    </div>
    <div className={classes.overlay}>
      <Typography variant="h6">{post.name}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
  </ButtonBase>

  {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
    <div className={classes.overlay2}>
      <Button style={{ color: 'red' }} size="small" onClick={() => setCurrentId(post._id)}>
        <MoreHorizIcon fontSize="default" />
      </Button>
    </div>
  )}

  <div className={classes.details}>
    <Typography variant="body2" color="textSecondary">
      {post.tags.map((tag) => `#${tag}`).join(' ')}
    </Typography>
  </div>

  <Typography className={classes.title} variant="h5" gutterBottom>
    {post.title}
  </Typography>

  <CardContent className={classes.content}>
    <Typography variant="body2" color="textSecondary" component="p">
      {post.message}
    </Typography>
  </CardContent>

  <CardActions className={classes.cardActions}>
    <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike} className={classes.likeButton}>
      <Likes />
    </Button>

    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
        <DeleteIcon fontSize="small" />
        Delete
      </Button>
    )}
  </CardActions>
</Card>

 
  );
};

export default Post;
