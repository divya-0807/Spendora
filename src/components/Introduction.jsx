import React from 'react';
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
  const navigate = useNavigate();  // Hook to programmatically navigate

  return (
    <div>
      <button onClick={() => navigate('/signIn')}>
        Sign Up
      </button>
    </div>
  );
};

export default Introduction;
