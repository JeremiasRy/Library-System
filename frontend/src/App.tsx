import { createBrowserRouter, RouterProvider } from "react-router-dom"
import BookPage from "./pages/BookPage"
import Books from "./pages/Books"
import Categories from "./pages/Categories"
import CategoryPage from "./pages/CategoryPage"
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
            },
            {
              path: "categories",
              element: <Categories />
            },
            {
              path: "categories/:id",
              element: <CategoryPage />
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
