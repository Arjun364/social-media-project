import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// importing of the authcontext
import { AuthProvider } from './routes/AuthContext.jsx'
// routes
import PublicRoute from './routes/PublicRoute.jsx'
import AdminRoute from './routes/AdminRoute.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import RestrictedRoute from './routes/RestrictedRoute.jsx'
// pages
import LandingPage from './pages/LandingPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomePage from './pages/HomePage.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import Authentication from './pages/Authentication.jsx'
import Posts from './components/Contents/Profile/Posts.jsx'
import Comments from './components/Contents/Profile/Comments.jsx'
import Saved from './components/Contents/Profile/Saved.jsx'
import Account from './components/Contents/Settings/Account.jsx'
import ProfileSettings from './components/Contents/Settings/ProfileSettings.jsx'
import NotificationComponent from './components/NotificationComponent.jsx'
import NotificationSettings from './components/Contents/Settings/NotificationSettings.jsx'

// routes
const router = createBrowserRouter([
  // the landing page section
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/registration', element: <Authentication signin={false} /> }
    ]
  },
  {
    element: <AdminRoute />,
    children: [
      { path: '/admin', element: <Dashboard /> }
    ]
  },
  {
    element: <PrivateRoute/>,
    children:[
      {path:'/home',element:<HomePage content={'home'}/>},
      {path:'/explore',element:<HomePage content={'explore'} />},
      {path:'/createpost',element:<HomePage content={'createpost'} />},
      {path:'/notification',element:<HomePage content={'notification'} />},
      { path: '/viewProfile', element: <HomePage content="viewProfile" />, children: [
        { path: 'post', element: <Posts /> },
        { path: 'comments', element: <Comments/> },
        { path: 'saved', element: <Saved/> },
      ] 
    },
      {path:'/setting',element:<HomePage content={'setting'} />,children:[
        {path:'account',element:<Account/>},
        {path:'profile',element:<ProfileSettings/>},
      ]},
      {path:'/community',element:<HomePage content={'community'} />},
      {path:'/message',element:<HomePage content={'message'} />},
    ]
  },
  {
    element:<RestrictedRoute/>,
    children:[
      {path:'/login',element:<Authentication signin={true} />}
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
