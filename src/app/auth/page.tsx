"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Shield, ArrowRight, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { CustomOTPInput } from "@/components/auth/custom-otp-input";
import { ResType } from "@/types/response";
import Fetch from "@/fetchers/Fetch";

type FormDataType = {
  phone: string;
  otp: string;
};

export default function LoginForm() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const phoneRegex = /^09\d{9}$/;
  const otpRegex = /^\d{5}$/;

  const { register, handleSubmit, setValue } = useForm<FormDataType>({
    defaultValues: { phone: "", otp: "" },
  });

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const onSubmit = async (data: FormDataType) => {
    if (loading) return;
    setLoading(true);
    try {
      if (step === "phone") {
        if (!phoneRegex.test(data.phone)) {
          toast.error("شماره تلفن معتبر نیست");
          setLoading(false);
          return;
        }
        setPhone(data.phone);
        const response: ResType = await Fetch.post("/auth/send-otp", {
          phone: data.phone,
        });
        if (response.status > 201) return setLoading(false);
        setStep("otp");
        setTimeLeft(120);
        setCanResend(false);
      } else {
        if (!otpRegex.test(data.otp)) {
          toast.error("کد باید ۵ رقم باشد");
          setLoading(false);
          return;
        }
        const response: ResType = await Fetch.post("/auth/verify-otp", {
          phone,
          code: data.otp,
        });
        if (response.status > 201) return setLoading(false);
        window.location.href = "/";
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || loading) return;
    setLoading(true);
    try {
      const response: ResType = await Fetch.post("/auth/send-otp", { phone });
      if (response.status > 201) return;
      toast.success("کد دوباره ارسال شد");
      setTimeLeft(120);
      setCanResend(false);
    } catch {
      toast.error("خطایی رخ داد، دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white/90 backdrop-blur-xl border border-purple-200 rounded-3xl
        shadow-xl p-8 space-y-4"
      >
        {step === "phone" ? (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-purple-600">
                شماره موبایل
              </label>

              <Input
                {...register("phone", { required: true })}
                disabled={loading}
                dir="ltr"
                placeholder="09123456789"
                className="w-full border border-purple-300 px-4 text-purple-800
                focus:outline-none focus:border-purple-500
                focus:ring-4 focus:ring-purple-200 transition"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600
              text-white font-bold text-sm hover:shadow-lg hover:scale-[1.02]
              active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? (
                <PropagateLoader size={8} color="white" />
              ) : (
                "ارسال کد تأیید"
              )}
            </Button>
          </>
        ) : (
          <>
            {/* شماره */}
            <div className="rounded-xl bg-purple-50 border border-purple-200 p-4 text-center space-y-1">
              <p className="text-xs text-purple-500">کد ارسال شد به</p>
              <p dir="ltr" className="text-purple-800 font-semibold text-lg">
                {phone}
              </p>
            </div>

            <div className="space-y-3 text-center">
              <CustomOTPInput
                length={5}
                disabled={loading}
                onChange={(val) => setValue("otp", val)}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600
              text-white font-bold text-sm hover:shadow-lg hover:scale-[1.02]
              active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? (
                <PropagateLoader size={8} color="white" />
              ) : (
                "تأیید و ورود"
              )}
            </Button>

            {/* تایمر */}
            <div className="flex items-center justify-between text-sm text-purple-500">
              <span className="font-mono">{formatTime(timeLeft)}</span>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || loading}
                className={`transition font-medium ${
                  canResend
                    ? "text-purple-600 hover:text-purple-700"
                    : "opacity-40 cursor-not-allowed"
                }`}
              >
                ارسال مجدد
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
