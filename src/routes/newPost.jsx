import { useEffect, useState } from 'react'

function Newpost() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [authorid, setAuthorid] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const storeadAuthorid = localStorage.getItem('authorid');
        if (storeadAuthorid) {
            setAuthorid(storeadAuthorid);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, text, authorid }),
            });
            if (!response.ok) {
                throw new Error('response not ok');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {/* Navbar Section */}
            <nav style={styles.navbar}>
                <div style={styles.navbarContainer}>
                    <a href="/" style={styles.logo}>Post form</a>
                    <ul style={styles.navLinks}>
                        <li><a href="/" style={styles.navLink}>Home</a></li>
                    </ul>
                </div>
            </nav>

            {/* Form Section */}
            <div style={styles.formContainer}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label htmlFor="title" style={styles.label}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                    />
                    <label htmlFor="text" style={styles.label}>Text</label>
                    <textarea
                        name='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="30"
                        cols="50"
                        style={{
                            resize: 'vertical', // Allow vertical resizing only
                            maxWidth: '100%',   // Prevent horizontal expansion
                            boxSizing: 'border-box', // Include padding and border in the element's total width and height
                        }}
                    />
                    <button type="submit" style={styles.button}>Post</button>
                </form>
            </div>
        </>
    );
}
const styles = {
    body: {
        backgroundColor: '#f0f4f8',
    },
    navbar: {
        backgroundColor: '#274754',
        padding: '10px 20px',
    },
    navbarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        color: '#e9c46a',
        fontSize: '1.5rem',
        textDecoration: 'none',
        padding: '10px',
    },
    navLinks: {
        listStyleType: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    },
    navLink: {
        color: '#f5a462',
        textDecoration: 'none',
        marginLeft: '20px',
        fontSize: '1rem',
    },
    formContainer: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    form: {
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '1.1rem',
        marginBottom: '8px',
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#e9c46a',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    
};

export default Newpost;