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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-50 via-white to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="relative w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-300/30 dark:border-slate-700/50 p-8 space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-200/50 dark:bg-purple-700/50 rounded-3xl shadow-lg">
              {step === "phone" ? (
                <Smartphone className="w-10 h-10 text-purple-700 dark:text-white" />
              ) : (
                <Shield className="w-10 h-10 text-purple-700 dark:text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-700 dark:text-white">
                {step === "phone" ? "ورود به حساب" : "تایید کد"}
              </h1>
              <p className="text-purple-600 dark:text-purple-300 text-sm mt-1">
                {step === "phone"
                  ? "شماره موبایل خود را وارد کنید"
                  : "کد ارسال شده را وارد کنید"}
              </p>
            </div>
          </div>

          {/* Form Body */}
          {step === "phone" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300 block text-right">
                  شماره موبایل
                </label>
                <div className="relative">
                  <Input
                    {...register("phone", { required: true })}
                    placeholder="09123456789"
                    dir="ltr"
                    disabled={loading}
                    className="h-14 text-lg pl-12 pr-4 rounded-xl border-2 border-purple-300 dark:border-purple-600 
                               bg-white dark:bg-slate-700 text-purple-800 dark:text-white
                               focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900/30
                               transition-all duration-200"
                  />
                  <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl
                           transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <PropagateLoader size={8} color="white" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>ارسال کد تایید</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* OTP Display */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-purple-600 dark:text-purple-300">
                  کد تایید به شماره
                </p>
                <p
                  className="font-semibold text-purple-800 dark:text-white text-lg"
                  dir="ltr"
                >
                  {phone}
                </p>
                <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">
                  ارسال شد
                </p>
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-purple-700 dark:text-purple-300 block text-center">
                  کد ۵ رقمی را وارد کنید
                </label>
                <CustomOTPInput
                  length={5}
                  disabled={loading}
                  onChange={(val) => setValue("otp", val)}
                />
              </div>

              {/* Timer and Resend */}
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-sm">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || loading}
                  className={`text-sm font-medium transition-colors ${
                    canResend && !loading
                      ? "text-purple-500 hover:text-purple-600 cursor-pointer"
                      : "text-purple-300 cursor-not-allowed"
                  }`}
                >
                  ارسال مجدد
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl
                           transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <PropagateLoader size={8} color="white" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>تایید و ورود</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-purple-400 dark:text-purple-500">
            با ورود، شما با قوانین و مقررات موافقت می‌کنید
          </p>
        </div>
      </div>
    </div>
  );
}
