import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import SidebarOP from './layout/SidebarOP';
import SidebarPM from './layout/SidebarPM';
import api from './network/api';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import { setLoggedUser, unsetLoggedUser } from './redux/slices/authSlice';
import { setPreloaded } from './redux/slices/preLoadedSlice';
import { RootState } from './redux/store';
import { UserType } from './types/userType';
import GreetPage from './pages/greetPage';

function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.loggedUser.value);

  useEffect(() => {
    async function initializeApp() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          dispatch(unsetLoggedUser());
          return;
        }

        const loggedUser: UserType = await api.GET_LOGGED_USER();
        if (loggedUser) {
          dispatch(setLoggedUser(loggedUser));
        }
      } catch {
        dispatch(unsetLoggedUser());
      } finally {
        dispatch(setPreloaded(false));
      }
    }

    initializeApp();
  }, [dispatch]);

  return (
    <>
      <Routes>
        {loggedUser?.role === 'PM' && (
          <Route path="/" element={<SidebarPM />}>
            <Route index element={<h1>test</h1>} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        )}

        {loggedUser?.role === 'OP' && (
          <Route path="/" element={<SidebarOP />}>
            <Route index element={<h1>test</h1>} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        )}

        {!loggedUser && (
          <>
            <Route path="/" element={<GreetPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </>
        )}
      </Routes>
      ;
    </>
  );
}

export default App;
