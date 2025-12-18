"use client";
import { useEffect, useState } from "react";

const useImagePreview = (files: FileList | any) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!files || !files[0]) return;

    const selectedFile = files[0];
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  return previewUrl;
};

export default useImagePreview;
