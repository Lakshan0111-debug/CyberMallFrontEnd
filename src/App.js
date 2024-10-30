import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import ManageInventory from './pages/manageinventory/ManageInventory';
import AddNewProduct from './pages/addnewproduct/AddNewProduct';
import ManageCustomers from "./pages/managecustomers/ManageCustomers";
import ManageSuppliers from './pages/managesuppliers/ManageSuppliers';
import AddNewSupplier from './pages/addnewsupplier/AddNewSupplier';
import ManageOrders from './pages/manageorders/ManageOrders';
import ManageReviews from './pages/managereviews/ManageReviews';
import ViewProduct from './pages/viewproduct/ViewProduct';
import UpdateProduct from './pages/updateproduct/UpdateProduct';

const router = createBrowserRouter([

  {
    path: "/signUp",
    element: <SignUp/>
  },
  {
    path: "/logIn",
    element: <LogIn/>
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword/>
  },

  {
    path: "/adminDashboard",
    element: <AdminDashboard/>
  },
  {
    path: "/manageInventory",
    element: <ManageInventory/>,
  },
  {
    path: "/manageInventory/addNew",
    element: <AddNewProduct/>,
  },
  {
    path: "/manageInventory/productId",
    element: <ViewProduct/>,
  },
  {
    path: "/manageInventory/productId/updateProduct",
    element: <UpdateProduct/>,
  },
  {
    path: "/manageCustomers",
    element: <ManageCustomers/>,
  },
  {
    path: "/manageSuppliers",
    element: <ManageSuppliers/>,
  },
  {
    path: "/manageSuppliers/addNew",
    element: <AddNewSupplier/>,
  },
  {
    path: "/manageOrders",
    element: <ManageOrders/>,
  },
  {
    path: "/manageReviews",
    element: <ManageReviews/>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;