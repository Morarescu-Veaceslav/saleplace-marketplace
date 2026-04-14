import { PublicUserModel } from "src/modules/auth/account/models/public-user.model";

export function normalizeUser(user: any): PublicUserModel {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    avatar: user.avatar ?? null,
    avatarType: user.avatarType,
    bio: user.bio ?? null,
    createdAt: user.createdAt ?? new Date(),
  };
}