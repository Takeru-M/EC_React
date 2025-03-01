import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      message="The page you're looking for doesn't exist or has been moved."
      action={{
        label: 'Go Back Home',
        onClick: () => navigate('/')
      }}
    />
  );
};

export default NotFound
