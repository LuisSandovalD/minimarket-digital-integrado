import React from "react";

import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import store from "@/store/store";

import "./styles/global.css";
import "./styles/animations.css";

// ========================================
// REACT QUERY
// ========================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

      retry: 1,

      staleTime: 1000 * 30,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
