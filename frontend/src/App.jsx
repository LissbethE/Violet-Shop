import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { DarkModeProvider } from './context/DarkModeContext';

import ProtectedRoute from './ui/ProtectedRoute';
import AdminRoute from './ui/AdminRoute';

const AppLayout = lazy(() => import('./ui/AppLayout'));
const SpinnerHeart = lazy(() => import('./ui/SpinnerHeart'));
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const AllProducts = lazy(() => import('./pages/AllProducts'));

const Shipping = lazy(() => import('./pages/Shipping'));
const Payment = lazy(() => import('./pages/Payment'));
const Order = lazy(() => import('./pages/Order'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

const AdminOrderList = lazy(() => import('./pages/Admin/AdminOrderList'));
const AdminProducts = lazy(() => import('./pages/Admin/AdminProducts'));
const AdminUserList = lazy(() => import('./pages/Admin/AdminUserList'));

const PageNotFound = lazy(() => import('./pages/PageNotFound'));

//////////////////////////
// React Query

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

//////////////////////////

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Suspense fallback={<SpinnerHeart />}>
            <PayPalScriptProvider deferLoading={true}>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate replace to="/" />} />
                  <Route path="/" element={<Home />} />
                  <Route path="product" element={<AllProducts />} />
                  <Route path="product/:id" element={<ProductDetails />} />
                  <Route
                    replace
                    path="search/:category/product"
                    element={<AllProducts />}
                  />

                  <Route path="cart" element={<Cart />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="shipping" element={<Shipping />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="order" element={<Order />} />
                    <Route path="order/:id" element={<OrderDetails />} />
                    <Route path="myOrders" element={<MyOrders />} />

                    <Route path="profile" element={<UserProfile />} />
                  </Route>

                  <Route element={<AdminRoute />}>
                    <Route
                      path="admin/orderList"
                      element={<AdminOrderList />}
                    />
                    <Route
                      path="admin/productList"
                      element={<AdminProducts />}
                    />
                    <Route path="admin/userList" element={<AdminUserList />} />
                  </Route>

                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
            </PayPalScriptProvider>
          </Suspense>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '600px',
              padding: '16px 24px',
              backgroundColor: 'var(--on-background)',
              color: 'var(--on-color-primary)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
