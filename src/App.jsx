import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Pages/Home";
import MainLayout from "./Component/Layout/MainLayout";
import About from "./Component/Pages/About";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Post from "./Component/UI/Post";
import InfinityScroll from "./Component/Pages/InfinityScroll";
const App = () => {
  const queryClient = new QueryClient();
  const routes = [
    {
      path:'/',
      element:<MainLayout/>,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/about',
          element:<About />
        },
        {
          path:'/post/:id',
          element:<Post/>
        },{
          path:'/infinity',
          element:<InfinityScroll/>
        }
      ]
    }
  ]
  const router = createBrowserRouter(routes,{future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation:true,
    v7_relativeSplatPath: true,
  },})

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools onClose={() => setIsOpen(false)}/>
      <RouterProvider router={router}  future={{
        v7_startTransition: true,

  }} >
      <h1> App</h1>
      </RouterProvider>
  
    </QueryClientProvider>
  );
};
export default App;
