import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GraphQLProvider } from "./GraphQLProvider";
import "react-toastify/dist/ReactToastify.css";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <GraphQLProvider>
        {children}
        <ToastContainer />
      </GraphQLProvider>
    </BrowserRouter>
  );
}
