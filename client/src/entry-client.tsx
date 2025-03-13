import { StrictMode, Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./lib/i18n.ts";
const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading..">
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
