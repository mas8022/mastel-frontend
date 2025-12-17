export interface UserType {
  id: number;

  phone: string;
  username: string;

  bio?: string | null;
  avatar?: string | null;

  lastSeen?: Date | null;
  isOnline: boolean;

  createdAt: Date;
  updatedAt: Date;
}
