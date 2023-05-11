import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { Page1 } from "./pages/page1";
import { Page2 } from "./pages/page2";
import { Page3 } from "./pages/page3";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Page1 />,
    },
    {
      path: "/2",
      element: <Page2 />,
    },
    {
      path: "/3",
      element: <Page3 />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
