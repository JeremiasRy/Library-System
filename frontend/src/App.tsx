import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthorPage from "./pages/AuthorPage"
import Authors from "./pages/Authors"
import BookPage from "./pages/BookPage"
import Books from "./pages/Books"
import Categories from "./pages/Categories"
import CategoryPage from "./pages/CategoryPage"
import LoanPage from "./pages/LoanPage"
import Loans from "./pages/Loans"
import Main from "./pages/Main"
import Profile from "./pages/Profile"
import PublisherPage from "./pages/PublisherPage"
import Publishers from "./pages/Publishers"
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
            }, 
            {
              path: "loans",
              element: <Loans />
            },
            {
              path: "loans/:id",
              element: <LoanPage />
            },
            {
              path: "authors",
              element: <Authors />
            }, 
            {
              path: "authors/:id",
              element: <AuthorPage />
            },
            {
              path: "publishers",
              element: <Publishers />
            },
            {
              path: "publishers/:id",
              element: <PublisherPage />
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
