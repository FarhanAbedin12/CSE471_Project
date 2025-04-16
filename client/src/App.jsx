import HomePage from "./routes/homePage/homePage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import Login from "./routes/login/login";
import ProfilePage from "./routes/profilePage/profilePage";
import Register from "./routes/Register/register";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/singlePage/singlePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/home",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>
        },
        {
          path:"/login",
          element:<Login/>
        }, 
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>
        },



      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;