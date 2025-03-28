import {createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginAndSignup from './pages/LoginAndSignup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import axios from 'axios';
import { setAccessToken } from './redux/todoListSlice';


function App() {
  const dispatch = useDispatch()
  const accessTokenContent = useSelector(
    (state: RootState) => state.todoList.tokenContent
  );

  const checkAccessToken = async () => {
    if (!accessTokenContent?.exp || new Date().getTime() > accessTokenContent.exp * 1000) {
      try {
        await axios.post(`/auth/refresh`).then((res) => {
          if (res.status === 201) {
            dispatch(setAccessToken(res.data.accessToken))
          }
      }) 
      } catch (error) {
          return redirect('/auth')
      }
    } 
      return null;
    }

  const router = createBrowserRouter([
    {
      path: '/',
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage />,loader: checkAccessToken },
        {
          path: 'auth',
          element: <LoginAndSignup />,
          loader:  async () => {
            if (accessTokenContent?.exp && new Date().getTime() < accessTokenContent.exp * 1000) {
              return redirect('/');
            } else if(!accessTokenContent?.exp) {
              try {
                await axios.post(`/auth/refresh`).then((res) => {
          
                  if (res.status === 201) {
                    dispatch(setAccessToken(res.data.accessToken))
                    redirect('/')
                  }
              }) 
              } catch (error) {
                console.log(error);
                
              } 
            }
            return null;
          },
        },
      ],
    },
  ]);

  return (
    <div className="App">
<RouterProvider router={router} />

  </div>
  );
}

export default App;
