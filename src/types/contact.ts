import { UserType } from "./user";

export type ContactType = Pick<UserType, "id" | "avatar" | "username">;
