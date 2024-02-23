export interface UserNotifications {
  sellerNewBid: boolean;
  sellerNewComment: boolean;
}

export interface UserProfile {
  name: string;
  bio: string;
  profilePicture?: string;
}

export default interface User {
  _id: string;
  accessToken: string;
  refreshToken: string;
  email?: string;
  phone?: string;
  name: string;
  bio: string;
  tokens: number;
  profilePicture: string;
  createdAt: number;
  notifications: UserNotifications;
}
