import { createBrowserRouter, RouterProvider } from "react-router-dom"
import BookPage from "./pages/Book"
import Books from "./pages/Books"
import Main from "./pages/Main"
import Profile from "./pages/Profile"
import Root from "./pages/Root"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Main />,
          children: [
            {
              path: "books",
              element: <Books />
            },
            {
              path: "books/:id",
              element: <BookPage />
            },
            {
              path: "profile",
              element: <Profile />
            }
          ]
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
