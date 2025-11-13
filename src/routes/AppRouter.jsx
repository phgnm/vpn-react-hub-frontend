import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import PicsumRouter from "../features/picsum-gallery/routes/PicsumRouter";
import TicTacToePage from "../features/tic-tac-toe/pages/TicTacToePage";
import AuthRouter from "../features/auth/routes/AuthRouter"
import ProtectedRoute from "../components/ProtectedRoute";
import AccountPage from "../features/auth/pages/AccountPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ex01" element={<TicTacToePage />} />
        <Route path="/ex02/*" element={<PicsumRouter />} />
        <Route path="/ex03/*" element={<AuthRouter />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
