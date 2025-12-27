"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Paperclip, SendHorizonal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { MessageType } from "@/types/message";
import clsx from "clsx";
import useUploadFile from "@/hooks/UseUploadVideo";

type PropsType = {
  referenceMessage: MessageType | any;
  setRefrenceMessage: (value: MessageType | any) => void;
};

export function MessageInput({
  referenceMessage,
  setRefrenceMessage,
}: PropsType) {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [uploadType, setUploadType] = useState<
    "image" | "video" | "file" | "voice" | null
  >(null);

  const { contactId } = useParams();
  const socket = useSocket("chat");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const { result, progress, startUpload, reset } = useUploadFile();

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [text]);

  useEffect(() => {
    if (!result || !uploadType) return;

    socket.emit("send-message", {
      contactId,
      type: uploadType.toUpperCase(),
      fileUrl: result.url,
      fileKey: result.key,
      replyToId: referenceMessage?.id ?? null,
      size: result.size,
    });

    reset();
    setUploadType(null);
    setRefrenceMessage(null);
  }, [result]);

  const sendText = () => {
    if (!text.trim()) return;

    socket.emit("send-message", {
      contactId,
      type: "TEXT",
      text,
      replyToId: referenceMessage?.id ?? null,
    });

    setText("");
    setRefrenceMessage(null);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const voiceFile = new File([blob], "voice.webm", { type: "audio/webm" });
      setUploadType("voice");
      startUpload(voiceFile, "voice");
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.state === "recording" &&
      mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const onSelectFile = async (file: File) => {
    if (file.type.startsWith("image")) setUploadType("image");
    else if (file.type.startsWith("video")) setUploadType("video");
    else setUploadType("file");
    startUpload(file, "file");
  };

  return (
    <div className="border-t bg-background/80 backdrop-blur p-3 rounded-t-xl space-y-2">
      {referenceMessage && (
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted border-l-4 border-primary">
          <div className="text-sm truncate">
            <p className="text-xs text-muted-foreground">Replying to</p>
            <p className="truncate">
              {referenceMessage.text ?? "Media message"}
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setRefrenceMessage(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {progress > -1 && (
        <div className="text-xs text-muted-foreground">
          Uploading… {progress}%
        </div>
      )}

      <div className="flex items-end gap-2">
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onSelectFile(f);
          }}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <Textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message"
          rows={1}
          className="flex-1 resize-none rounded-xl bg-muted max-h-40"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendText();
            }
          }}
        />

        {text.trim() ? (
          <Button size="icon" onClick={sendText}>
            <SendHorizonal className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            size="icon"
            className={clsx(
              "rounded-full",
              recording && "bg-red-500 text-white scale-110"
            )}
            onPointerDown={startRecording}
            onPointerUp={stopRecording}
            onPointerLeave={stopRecording}
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
