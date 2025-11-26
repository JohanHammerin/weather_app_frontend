// components/form.component.tsx
"use client";

import { ReactNode, FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Form({ children, onSubmit, ...props }: FormProps) {
  return (
    <form onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
}
