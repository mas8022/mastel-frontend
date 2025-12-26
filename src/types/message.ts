export type MessageEnum = "TEXT" | "IMAGE" | "VIDEO" | "VOICE" | "FILE";

export interface MessageType {
  id: number;
  type: MessageEnum;
  text?: string;
  fileUrl?: string;
  fileKey?: string;
  mimeType?: string;
  size?: number;
  duration?: number;
  replyTo?: {
    id: number;
    type: MessageEnum;
    text?: string;
    fileUrl?: string;
    fileKey?: string;
    mimeType?: string;
    size?: number;
    duration?: number;
    senderId: number;
    receiverId: number;
    createdAt: Date;
    updatedAt: Date;
  };
  senderId: number;
  receiverId: number;
  createdAt: Date;
  updatedAt: Date;
}
