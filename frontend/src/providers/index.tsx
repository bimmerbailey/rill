import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GraphQLProvider } from "./GraphQLProvider";
import { ThemeProvider } from "./ThemeProvider";
import "react-toastify/dist/ReactToastify.css";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GraphQLProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </GraphQLProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
