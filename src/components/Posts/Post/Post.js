import React, { useState } from 'react';
import { Card, CardActions, CardMedia, Button, Typography, CardContent, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const [likes, setLikes ] = useState(post?.likes);
  const userId = user?.decoded.sub || user?.decoded?._id;
  const hasLikedPost = post.likes.find((like) => like === userId)

  

  const handleLike = async () => {
     dispatch(likePost(post._id));

     if(hasLikedPost) {
        setLikes(post.likes.filter((id) => id !== userId))
      } else {
        setLikes([ ...post.likes, userId ])
     }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
      ) : (
        <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes' }</>
      );
    };

    return <><ThumbUpAltIcon fontSize='small' />&nbsp;Like</>;
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
   <Card className={classes.card} raised elevation={6}>
   <div className={classes.cardAction} style={{ cursor: 'pointer' }} onClick={openPost}>
     <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
     <div className={classes.overlay}>
      <Typography variant="h6">{post.name}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
     </div>
     {(user?.decoded?.sub === post?.creator || user?.decoded?._id === post?.creator) && (
     <div className={classes.overlay2} name="edit">
       <Button style={{ color: 'white' }} size="small" onClick={(e) => {
        e.stopPropagation();
        setCurrentId(post._id)
        }
        }>
          <MoreHorizIcon fontSize='medium' />
       </Button>
     </div>
     )}
     <div className={classes.details}>
     <Typography variant="body2" component="h2" color='textSecondary'>{post.tags.map((tag) => `#${tag} ` )} </Typography>
     </div>
     <Typography className={classes.title} variant="h5" gutterBottom>{post.title} </Typography>
     <CardContent>
       <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
     </CardContent>
    </div>
     
       <CardActions className={classes.cardActions}>
         <Button size='small' color="primary" disabled={!user?.decoded} onClick={handleLike}>
           <Likes />
         </Button>
       
          {(user?.decoded?.sub === post?.creator || user?.decoded?._id === post?.creator) && (
           <Button size='small' color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon 
            fontSize="small"
          />
            Delete
         </Button> 
         )}
          
         
       </CardActions>
       
   </Card>
  )
}

export default Post;
