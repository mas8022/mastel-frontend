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
        if (index > 0) inputsRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }
  };

  return (
    <div
      dir="ltr"
      className="
        flex justify-center
        gap-2 sm:gap-3 md:gap-4
      "
    >
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
          className="
            w-12 h-12
            sm:w-14 sm:h-14
            md:w-16 md:h-16

            text-center
            text-xl sm:text-2xl font-bold
            text-white

            rounded-xl sm:rounded-2xl
            bg-violet-950/60
            border border-violet-500/30

            backdrop-blur
            transition-all duration-200

            focus:outline-none
            focus:border-purple-400
            focus:ring-2
            focus:ring-purple-500/60

            hover:border-purple-400
            hover:shadow-lg
            hover:shadow-purple-700/30

            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        />
      ))}
    </div>
  );
}
