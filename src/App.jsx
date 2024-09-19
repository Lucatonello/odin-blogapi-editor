import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllPosts from './routes/Allposts';
import Newpost from './routes/newPost';
import Viewpost from './routes/Viewpost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/newpost" element={<Newpost />} />
        <Route path="/posts/:id" element={<Viewpost />} />
      </Routes>
    </Router>
  );
}

export default App;
