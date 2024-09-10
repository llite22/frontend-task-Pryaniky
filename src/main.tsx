import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "@/app/styles/variables/globals.css";
import { ErrorBoundary } from "./app/providers/ErrorBoundary/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { PageError } from "./widgets/PageError/index.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<PageError />}>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </BrowserRouter>
);
