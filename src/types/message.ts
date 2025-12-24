export interface MessageType {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  createdAt: Date;
  updatedAt: Date;
  replyTo?: {
    id: number;
    text: string;
    senderId: number;
    receiverId: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
