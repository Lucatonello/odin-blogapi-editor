import { useEffect, useState } from 'react'

function Comments({ postid }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:3000/posts/${postid}/comments`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setComments(data);
        }).catch(err => console.error('error fetching data', err))
    }, [postid]);

    return (
      <>
        <h2>{comments.length !== 0 ? 'Comments': 'No comments yet' } </h2>
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    {comment.text}
                </li>
            ))} 
        </ul>
      </>
    )
}

export default Comments;