import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from '@/hooks/useAuth';

// ==============================|| ADMIN GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const AdminGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (!['01', '02'].includes(user?.role)) {
        navigate('/forbidden', { replace: true });
      }
    }
  }, [isLoggedIn, navigate, user?.role]);

  return children;
};

AdminGuard.propTypes = {
  children: PropTypes.node,
};

export default AdminGuard;
