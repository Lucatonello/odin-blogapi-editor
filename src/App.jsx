import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllPosts from './routes/Allposts';
import Newpost from './routes/newPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="newpost" element={<Newpost />} />
      </Routes>
    </Router>
  );
}

export default App;
