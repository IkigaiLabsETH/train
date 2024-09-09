"use client";

import React from 'react';

interface SubmitButtonProps {
  children: React.ReactNode;
  pendingText: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, pendingText }) => {
  return (
    <button type="submit">
      {children}
    </button>
  );
};
