/* eslint-disable react/prop-types */
import React from 'react';

function ErrorBoundary({ children }) {
  return (
    <>
      { children }
    </>
  );
}

export default ErrorBoundary;
