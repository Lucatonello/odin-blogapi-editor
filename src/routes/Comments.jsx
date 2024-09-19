import { useEffect, useState } from 'react'



function Comments({ postid }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [authorid, setAuthorid] = useState(null);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editText, setEditText] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
      const storeadAuthorid = localStorage.getItem('authorid');
      if (storeadAuthorid) {
          setAuthorid(storeadAuthorid);
      }
  }, []);

    useEffect(() => {
      fetch(`http://localhost:3000/posts/${postid}/comments`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setComments(data);
        }).catch(err => console.error('error fetching data', err))
    }, [postid]);

     const handleNewComment = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postid}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ text: newComment, authorid: authorid }),
        }); 
        if (!response.ok) {
          throw new Error('response not ok');
        }
      } catch (err) {
        console.error(err);
      }
     }

     const handleEditComment = async (id, text) => {
        setEditCommentId(id);
        setEditText(text);
     };

     const handleSaveEdit = async (id, postid) => {
      try {
          await fetch(`http://localhost:3000/posts/${postid}/comments/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ text: editText }),
          });
          await fetchComments();
          setEditCommentId(null);
          setEditText('');
      } catch (err) {
          console.error('Error editing comment:', err);
      }
  };

  const handleChange = (event) => {
    setEditText(event.target.value);
  };

  const fetchComments = async () => {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postid}/comments`);
        const data = await response.json();
        setComments(data);
    } catch (err) {
        console.error('Error fetching comments:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditText('');
    setEditCommentId(null);
  };

  const handleDeleteComment = async (postid, commentid) => {
    try {
      await fetch(`http://localhost:3000/posts/${postid}/comments/${commentid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };  

     return (
      <>
        <h2 style={styles.commentsHeading}>
          {comments.length !== 0 ? 'Comments' : 'No comments yet'}
        </h2>
        <form onSubmit={handleNewComment} style={styles.commentForm}>
          <label htmlFor="addComment" style={styles.label}>Add a comment</label>
          <textarea
            name="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={styles.textarea}
            rows="4" // Default number of rows
          />
          <button type="submit" style={styles.button}>Comment</button>
        </form>
        <hr style={styles.hr} />
        <ul style={styles.commentsList}>
        {comments.map((comment) => (
          comment.text && comment.text.length > 0 ? (
              <li key={comment.id} style={styles.commentItem}>
                  <p style={styles.commentAuthor}>{comment.author}</p>
                  <p style={styles.postDate}>Created at: {comment.addedat}</p>
                  {editCommentId === comment.id ? (
                      <div>
                          <textarea
                              value={editText}
                              onChange={handleChange}
                              style={styles.textarea}
                          />
                          <button 
                              type="button" 
                              style={styles.SCbutton}
                              onClick={() => handleSaveEdit(comment.id, comment.postid)}
                          >
                              Save
                          </button>
                          <button 
                              type="button" 
                              style={styles.SCbutton}
                              onClick={handleCancelEdit}
                          >
                              Cancel
                          </button>
                      </div>
                  ) : (
                      <p style={styles.commentText}>{comment.text}</p>
                  )}
                  <div style={styles.buttonsContainer}>
                      <button 
                          type="button" 
                          style={styles.EDbutton}
                          onClick={() => handleEditComment(comment.id, comment.text)}
                      >
                          Edit
                      </button>
                      <button 
                          type="button" 
                          style={styles.EDbutton} 
                          onClick={() => handleDeleteComment(comment.postid, comment.id)}
                      >
                          Delete
                      </button>
                  </div>
              </li>
          ) : null // Render nothing if comment.text is null or empty
      ))}
        </ul>
      </>
  );
}

const styles = {
  commentsHeading: {
    fontSize: '24px',
    color: '#264653',
    marginBottom: '20px',
    textAlign: 'left',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',  // Align button to the right
    marginBottom: '20px',
  },
  label: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#6d6875',
    alignSelf: 'flex-start', // Ensure the label stays on the left
  },
  postDate: {
    fontStyle: 'italic',
    marginBottom: '10px',
    color: '#8d99ae', // Soft gray for date
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #e0e0e0',
    marginBottom: '10px',
    outline: 'none',
    width: '100%', // Make textarea fill the form width
    resize: 'vertical', // Allow vertical resizing only
    minHeight: '80px', // Minimum height for the textarea
  },
  button: {
    backgroundColor: '#2a9d8f',
    color: '#fff',
    padding: '8px 12px', // Small padding for button
    fontSize: '14px', // Smaller font size for button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
    alignSelf: 'flex-end', // Align the button to the right
  },
  buttonsContainer: {
    marginTop: '10px',
    alignSelf: 'flex-end', // Align buttons to the right
    display: 'flex',
    gap: '10px', // Space between buttons
    position: 'absolute',
    bottom: '10px', // Space from the bottom of the list item
    right: '10px',  // Space from the right of the list item
  },
  SCbutton: {
    backgroundColor: '#2a9d8f',
    color: '#fff',
    padding: '8px 12px', // Small padding for button
    fontSize: '13px', // Smaller font size for button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
    alignSelf: 'flex-end', // Align the button to the right
    marginRight: '10px',
  },
  EDbutton: {
    backgroundColor: '#2a9d8f',
    color: '#fff',
    padding: '8px 12px', // Small padding for button
    fontSize: '13px', // Smaller font size for button
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  hr: {
    margin: '20px 0',
    border: 'none',
    borderTop: '2px solid #e0e0e0',
  },
  commentsList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  commentItem: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column', // Stack content vertically
    position: 'relative', // Enable positioning of child elements
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: '5px',
  },
  commentText: {
    color: '#6d6875',
    fontSize: '16px',
  },
};


export default Comments;