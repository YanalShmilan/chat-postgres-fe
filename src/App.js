import './App.css';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Chat from './components/Chat/Chat';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Chat App</h1>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
