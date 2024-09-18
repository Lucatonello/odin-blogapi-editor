import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Comments from './Comments';
import '../Sidebar.css';

const styles = {
  
  global: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Poppins', sans-serif",
  },
  body: {
    backgroundColor: '#f0f4f8', // Light gray background
  },
  publishButton: {
    position: 'absolute',  // Add this to enable absolute positioning
    bottom: '10px',        // Position it 10px from the bottom
    right: '10px',         // Position it 10px from the right
    backgroundColor: '#4CAF50', // Green background for publish
    color: '#fff',         // White text
    border: 'none',
    borderRadius: '8px',   // Rounded corners
    padding: '10px 20px',  // Padding around text
    fontSize: '16px',      // Medium-sized text
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  unpublishButton: {
    position: 'absolute',  // Add this for unpublish button as well
    bottom: '10px',        // Same positioning rules
    right: '10px',
    backgroundColor: '#FF6347', // Red background for unpublish
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  buttonHover: {
    backgroundColor: '#3e8e41', // Darker green when hovered for publish
  },
  unpublishHover: {
    backgroundColor: '#e5534a', // Darker red when hovered for unpublish
  },
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#264653', // Dark blue
    padding: '20px',
    color: '#fff',
    boxShadow: '3px 0 10px rgba(0, 0, 0, 0.2)',
  },
  sidebarHeading: {
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center',
    color: '#e9c46a', // Accent gold
  },
  sidebarList: {
    listStyleType: 'none',
    padding: 0,
  },
  sidebarListItem: {
    marginBottom: '15px',
  },
  sidebarLink: {
    textDecoration: 'none',
    color: '#f4a261', // Soft orange
    fontSize: '18px',
    display: 'block',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  sidebarLinkHover: {
    backgroundColor: '#2a9d8f', // Teal on hover
  },
  content: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f0f4f8', // Light gray
  },
  posts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: 0,
    listStyleType: 'none',
  },
  postItem: {
    position: 'relative',  // Add this to enable positioning of child elements
    backgroundColor: '#ffffff', // White for post background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  postItemHover: {
    transform: 'translateY(-5px)',
  },
  postTitle: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#264653', // Dark blue for headings
  },
  postText: {
    fontSize: '16px',
    color: '#6d6875', // Muted purple for text
    display: '-webkit-box', // Flexbox layout for Webkit browsers
    WebkitBoxOrient: 'vertical', // Vertical orientation
    overflow: 'hidden', // Hide overflowed content
    textOverflow: 'ellipsis', // Add ellipsis for overflowed content
    WebkitLineClamp: 6, // Number of lines to show before truncating
    lineClamp: 6, // Number of lines to show before truncating (standard)
    maxHeight: '9em', // Adjust based on line height and number of lines
    margin: 0, // Ensure there's no margin affecting height
  },
  postDate: {
    fontStyle: 'italic',
    marginTop: '10px',
    color: '#8d99ae', // Soft gray for date
  },
  authLink: {
    textDecoration: 'none',
    fontSize: '18px',
    color: '#e76f51', // Orange for links
    margin: '0 10px',
  },
  authLinkHover: {
    color: '#f4a261', // Soft orange on hover
    textDecoration: 'underline',
  },
};

function AllPosts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      }).catch(err => console.error('error fetching data', err));
  }, []);

  const handleStatusChange = async (id) => {
    try {
        await fetch(`http://localhost:3000/posts/changeStatus/${id}`, {
            method: 'PUT',
        })
        location.reload();
    } catch (err) {
        console.error('Fetch error: ', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarHeading}>Navigation</h2>
        <ul style={styles.sidebarList}>
          <li style={styles.sidebarListItem}><Link to="/" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Home</Link></li>
          <li style={styles.sidebarListItem}><Link to="/login" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Login</Link></li>
          <li style={styles.sidebarListItem}><Link to="/signup" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>Signup</Link></li>
          <li style={styles.sidebarListItem}><Link to="/newpost" style={styles.sidebarLink} onMouseOver={(e) => e.target.style.backgroundColor = styles.sidebarLinkHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = ''}>New post</Link></li>
        </ul>
      </div>

      <div style={styles.content}>
        <ul style={styles.posts}>
          {posts.map((post) => (
              <li key={post.id} style={styles.postItem}>
                <h1 style={styles.postTitle}>{post.title}</h1>
                <hr />
                <p style={styles.postText}>{post.text}</p>
                <p style={styles.postDate}>Created at: {post.addedat}</p>
                <p style={styles.postDate}>Written by: {post.author}</p>
                <button
                    type="button"
                    style={post.public ? styles.unpublishButton : styles.publishButton}
                    onClick={() => handleStatusChange(post.id)}
                    onMouseOver={(e) =>
                        post.public
                        ? (e.target.style.backgroundColor = styles.unpublishHover.backgroundColor)
                        : (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
                    }
                    onMouseOut={(e) =>
                        post.public
                        ? (e.target.style.backgroundColor = styles.unpublishButton.backgroundColor)
                        : (e.target.style.backgroundColor = styles.publishButton.backgroundColor)
                    }
                    >
                    {post.public ? 'Unpublish' : 'Publish'}
                </button>          
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllPosts
