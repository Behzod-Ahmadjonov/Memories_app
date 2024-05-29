import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ comments, setComments ] = useState([post?.comments]);
  const [ comment, setComment ] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment =`${user.decoded.name}: ${comment}`;

   const newComments = await dispatch(commentPost(finalComment, post._id));
    
   setComments(newComments);
   setComment('');

   commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
        <div className={classes.commentsOuterContainer}>
             <div className={classes.commnetsInnerContainer}>
                <Typography variant='h6' gutterBottom>Comments</Typography>
                {comments.map((c, i) => (
                    <Typography key={i} variant='subtitle1' gutterBottom>
                          {c}
                    </Typography>
                ))}
                <div ref={commentsRef} />
             </div>
             {user?.decoded?.name && (
              <div style={{ width: '70%' }}>
             <Typography variant='subtitle1' gutterBottom>
              Write a Comment 
             </Typography>
             <TextField
                fullWidth
                minRows={4}
                variant='outlined'
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button style={{ marginTop: '10px' }} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleClick}>
                Comment
              </Button>
             </div>
             )} 
        </div>
    </div>
  )
}

export default CommentSection
