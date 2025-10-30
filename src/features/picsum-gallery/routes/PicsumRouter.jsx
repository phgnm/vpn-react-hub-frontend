import { Routes, Route } from 'react-router-dom';
import PhotosList from '../pages/PhotosList';
import PhotoDetail from '../pages/PhotoDetail';

export default function PicsumRouter() {
  return (
    <Routes>
      <Route path="/" element={<PhotosList />} /> 
      <Route path="/:photoId" element={<PhotoDetail />} />
    </Routes>
  );
}