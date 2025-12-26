import axios from "axios";
import toast from "react-hot-toast";

const errorMessages: any = {
  400: "درخواست نامعتبر است.",
  401: "دسترسی غیرمجاز. لطفاً وارد حساب خود شوید.",
  403: "شما اجازه انجام این عملیات را ندارید.",
  404: "موردی با این مشخصات پیدا نشد.",
  408: "درخواست بیش از حد طول کشید. دوباره تلاش کنید.",
  429: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً بعداً امتحان کنید.",
  500: "خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.",
  502: "خطای ارتباط با سرور. لطفاً اتصال اینترنت را بررسی کنید.",
  503: "سرور در حال حاضر در دسترس نیست.",
  504: "پاسخ از سرور دریافت نشد. لطفاً دوباره تلاش کنید.",
};

const Fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

Fetch.interceptors.response.use(
  (res) => {
    if (res.data.status <= 201 && res.data.message) {
      toast.success(res.data.message);
    } else if (res.data.status > 201 && res.data.message) {
      toast.error(res.data.message);
    }
    return res.data;
  },

  (error) => {
    const status = error.response?.status;

    let msg =
      errorMessages[status] || "خطایی رخ داده است. لطفاً دوباره تلاش کنید.";

    toast.error(msg);

    return Promise.reject(error);
  }
);

export default Fetch;
