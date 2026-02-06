import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { GraphQLProvider } from "./GraphQLProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <GraphQLProvider>{children}</GraphQLProvider>
    </BrowserRouter>
  );
}
