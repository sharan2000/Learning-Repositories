import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Home from "./pages/Home";
import Products from "./pages/Products";
import Root from "./components/Root";
import Error from "./pages/Error";
import ProductDetails from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> }, // instead of (path: "")
      { path: "products", element: <Products /> },
      { path: "products/:product_id", element: <ProductDetails /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
