"use client"
import Logo from "@/components/shared/logo";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CustomOTPInput } from "@/components/auth/custom-otp-input";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { ResType } from "@/types/response";
import Fetch from "@/fetchers/Fetch";

type FormDataType = {
  phone: string;
  otp: string;
};

export default function AuthPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

    if (step === "phone") {
      if (!phoneRegex.test(data.phone)) {
        toast.error("شماره تلفن معتبر نیست");
        setLoading(false);
        return;
      }

      setPhone(data.phone);

      const res: ResType = await Fetch.post("/auth/send-otp", {
        phone: data.phone,
      });

      if (res.status > 201) {
        setLoading(false);
        return;
      }

      setStep("otp");
      setTimeLeft(120);
      setCanResend(false);
    } else {
      if (!otpRegex.test(data.otp)) {
        toast.error("کد باید ۵ رقم باشد");
        setLoading(false);
        return;
      }

      const res: ResType = await Fetch.post("/auth/verify-otp", {
        code: data.otp,
        phone,
      });

      if (res.status > 201) {
        setLoading(false);
        return;
      }

      location.pathname = "/"
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (!canResend || loading) return;
    setLoading(true);

    const res: ResType = await Fetch.post("/auth/send-otp", { phone });

    if (res.status > 201) {
      setLoading(false);
      return;
    }

    toast.success("کد دوباره ارسال شد");
    setTimeLeft(120);
    setCanResend(false);
    setLoading(false);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Logo />
        <Card
          className="
        w-full max-w-md
        rounded-2xl
        border border-violet-500/20
        bg-gradient-to-br from-violet-950/70 to-purple-900/60
        backdrop-blur-xl
        shadow-2xl shadow-purple-900/40
      "
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold text-white">
              {step === "phone" ? "ورود | ثبت‌نام" : "کد تأیید"}
            </CardTitle>

            <p className="text-center text-sm text-violet-300">
              {step === "phone"
                ? "شماره موبایل خود را وارد کنید"
                : "کد ارسال‌شده را وارد نمایید"}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {step === "phone" ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-violet-300">
                      شماره موبایل
                    </label>

                    <Input
                      {...register("phone", { required: true })}
                      disabled={loading}
                      dir="ltr"
                      placeholder="09123456789"
                      className="
                    h-12 rounded-xl
                    bg-violet-950/60
                    border border-violet-500/30
                    text-white placeholder:text-violet-400
                    text-center tracking-widest
                    focus-visible:ring-2
                    focus-visible:ring-purple-500/60
                    focus-visible:border-purple-400
                  "
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="
                  w-full h-12 rounded-xl
                  text-lg font-medium
                  bg-gradient-to-r from-purple-600 to-violet-600
                  hover:from-purple-500 hover:to-violet-500
                  shadow-lg shadow-purple-700/40 text-white
                "
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "ارسال کد"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div
                    className="
                  rounded-xl
                  bg-violet-950/50
                  border border-violet-500/20
                  backdrop-blur
                  p-4 text-center space-y-1
                  text-violet-100
                "
                  >
                    <p className="text-xs text-violet-300">
                      کد به این شماره ارسال شد
                    </p>
                    <p dir="ltr" className="font-semibold tracking-wider">
                      {phone}
                    </p>
                  </div>

                  <CustomOTPInput
                    length={5}
                    disabled={loading}
                    onChange={(val) => setValue("otp", val)}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="
                  w-full h-12 rounded-xl
                  text-lg font-medium
                  bg-gradient-to-r from-purple-600 to-violet-600
                  hover:from-purple-500 hover:to-violet-500
                  shadow-lg shadow-purple-700/40 text-white
                "
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "تأیید و ورود"
                    )}
                  </Button>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-violet-300">
                      {formatTime(timeLeft)}
                    </span>

                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={!canResend || loading}
                      className={`
                    transition
                    ${
                      canResend
                        ? "text-purple-400 hover:text-purple-300 hover:underline"
                        : "opacity-40 cursor-not-allowed"
                    }
                  `}
                    >
                      ارسال مجدد
                    </button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
