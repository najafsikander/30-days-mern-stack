import { StrictMode, Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider,hydrate } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import "./lib/i18n.ts";
import "../instrument.js";
import LoadingBar from "./components/LoadingBar.tsx";

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: unknown;
  }
}

const queryClient = new QueryClient();

if (window.__REACT_QUERY_STATE__) {
  hydrate(queryClient, window.__REACT_QUERY_STATE__);
}

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <LoadingBar/>
        <Suspense fallback="loading..">
          <App />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
