import React from 'react'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './Components/Context/AuthContext'
import Home from './Components/Home/Home'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuth from './Components/ProtectedAuth/ProtectedAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsDetails from './Components/ProductsDetails/ProductsDetails'
import Cart from './Components/Cart/Cart'
import CartContextProvider from './Components/Context/CartContext'
import Washlist from './Components/Washlist/Washlist'
import WashlistContextProvider from './Components/Context/WashlistContext'
import CategoryPage from './Components/CategoryPage/CategoryPage'
import Contact from './Components/Contact/Contact'
import NotFound from './Components/NotFound/NotFound'
import Category from './Components/Cartegory/Category'

// Tanstack React Query


export default function App() {

 const route = createBrowserRouter([{

    path:'' , element:<Layout/> , children:[

      { path:'/' , element: <ProtectedRoute> <Home/> </ProtectedRoute>   },
      { path:'home' , element: <ProtectedRoute> <Home/> </ProtectedRoute>   },

      {path:'/productDetails/:id' , element: <ProtectedRoute> <ProductsDetails/> </ProtectedRoute>},
      {path:'cart' , element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path:'wishlist' , element: <ProtectedRoute> <Washlist/> </ProtectedRoute>},
      {path:'/category/:slug' , element: <ProtectedRoute> <CategoryPage/> </ProtectedRoute>},
      {path:'/category' , element: <ProtectedRoute> <Category/> </ProtectedRoute>},
      {path:'/contact' , element: <ProtectedRoute> <Contact/> </ProtectedRoute>},
  
      { path:'register' , element: <ProtectedAuth> <Register/> </ProtectedAuth>  },
      { path:'login' , element: <ProtectedAuth> <Login/> </ProtectedAuth> },
      { path:'*' , element: <NotFound/> },

    ]

  }]);


 const client = new QueryClient();



  return (
    <>
  
    <AuthContextProvider>
      
      <WashlistContextProvider> 

      <CartContextProvider>

      <QueryClientProvider client={ client }>

      <RouterProvider router={route} />
      
      </QueryClientProvider>

      </CartContextProvider>

      </WashlistContextProvider>
    
    </AuthContextProvider>

      <ToastContainer/>
    </>
  )
}
