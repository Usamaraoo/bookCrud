import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import List from './components/List';
import BookDetail from './pages/BookDetail';
import Nav from './components/Nav';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
// import BookDetail from './pages/BookDetail';
function App() {
  return (
    <div >
      {/* <List/> */}
      <Router>
      <Nav/>
        <Routes>
            <Route path='/' element={<List/>} />
            <Route path='/bookdetail/:id' element={<BookDetail />} />
            <Route path='/add/book' element={<AddBook />} />
            <Route path='/book/edit/:id' element={<EditBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
