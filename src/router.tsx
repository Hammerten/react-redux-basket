import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import {
  CheackoutFeature,
  NotFoundFeature,
  ProductListFeature,
} from "./features";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductListFeature />,
      },
      {
        path: "checkout",
        element: <CheackoutFeature />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundFeature />,
  },
]);
