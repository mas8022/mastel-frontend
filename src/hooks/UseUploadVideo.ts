"use client";
import Fetch from "@/fetchers/Fetch";
import { useState } from "react";

type UploadType = "video" | "voice" | "image" | "file";

type UploadResult = {
  key: string;
  url: string;
  size: number;
};

const useUploadFile = () => {
  const [progress, setProgress] = useState<number>(-1);
  const [result, setResult] = useState<UploadResult | null>(null);

  const startUpload = async (file: File, type: UploadType) => {
    try {
      setProgress(0);

      const res: any = await Fetch.post(`/upload/${type}`, {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      if (res.status > 201) return;

      const { uploaderUrl, key, publicUrl } = res;

      await Fetch.put(uploaderUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (p: any) => {
          const percent = Math.round((p.loaded * 100) / (p.total || 1));
          setProgress(percent);
        },
      });

      setResult({ key, url: publicUrl, size: file.size });
      setProgress(100);
    } catch (err) {
      console.error("Upload failed:", err);
      setProgress(-1);
    }
  };

  return {
    progress,
    result,
    startUpload,
    reset: () => {
      setProgress(-1);
      setResult(null);
    },
  };
};

export default useUploadFile;
