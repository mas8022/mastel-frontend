"use client";

import { useEffect, useRef, useState } from "react";

export function CustomOTPInput({
  length = 5,
  onChange,
  disabled = false,
}: {
  length?: number;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }
  };

  return (
    <div dir="ltr" className="flex justify-center gap-3">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-14 h-14 text-center text-2xl font-semibold rounded-xl border-2 border-slate-200 
                     bg-white text-slate-800 transition-all duration-200
                     focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none
                     hover:border-blue-300 hover:shadow-md
                     dark:bg-slate-800 dark:border-slate-600 dark:text-white
                     dark:focus:border-blue-400 dark:focus:ring-blue-900/30
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
      ))}
    </div>
  );
}
