import { isAuthenticatedRoute } from '@/utils/getToken';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticatedRoute()) {
      navigate('/signup');
    }
  }, [navigate]);

  return isAuthenticatedRoute() ? <Outlet /> : null;
};

export default ProtectedRoute;
