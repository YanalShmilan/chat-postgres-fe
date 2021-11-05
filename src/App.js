import './App.css';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Chat from './components/Chat/Chat';
import ProtectedRoute from './components/router/ProtectedRoute';
import './assets/scss/Auth.scss';
import { Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import {
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { checkUser } from './store/actions/auth';
library.add(
  faSmile,
  faImage,
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell
);
function App() {
  const dispatch = useDispatch();
  dispatch(checkUser());
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
