import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import PicsumRouter from "../features/picsum-gallery/routes/PicsumRouter";
import TicTacToePage from "../features/tic-tac-toe/pages/TicTacToePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ex01" element={<TicTacToePage />} />
        <Route path="/ex02/*" element={<PicsumRouter />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
