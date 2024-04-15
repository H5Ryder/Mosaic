import React from 'react'
import ReactDOM from 'react-dom/client'
import EditorPage from "./pages/EditorPage";

import './styles/main.scss'
import { createBrowserRouter, RouterProvider} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <EditorPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
