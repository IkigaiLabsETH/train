import * as React from "react";

import { cn } from "../../lib/utils";

export default function Input({ 
  type, 
  value, 
  onChange 
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type={type} value={value} onChange={onChange} />;
}
