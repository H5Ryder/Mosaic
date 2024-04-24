import React from 'react'
import ReactDOM from 'react-dom/client'
import EditorPage from "./pages/EditorPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from './pages/LandingPage';
import HowPage from './pages/HowPage';

import './styles/main.scss'
import { createBrowserRouter, RouterProvider} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/editor",
    element: <EditorPage/>,
  },
  {
    path: "/how-to",
    element: <HowPage/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
