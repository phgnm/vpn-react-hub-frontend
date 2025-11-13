import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/context/AuthContext";
import AppRouter from "./routes/AppRouter";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}
