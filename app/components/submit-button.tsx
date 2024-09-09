"use client";

import { ReactNode } from 'react';

interface SubmitButtonProps {
  onClick?: () => void;
  children: ReactNode;
  pendingText: string;
}

export function SubmitButton({ children, pendingText }: SubmitButtonProps) {
  // Implement the component using the pendingText prop
  // ...
}
