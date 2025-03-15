import { StrictMode, Suspense } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import LoadingBar from "./components/LoadingBar";

const queryClient = new QueryClient();

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <LoadingBar/>
          <Suspense fallback="loading..">
            <App />
          </Suspense>
        </StaticRouter>
      </QueryClientProvider>
    </StrictMode>
  );
  const dehydratedState = dehydrate(queryClient);
  return { html, dehydratedState };
}
