export interface Auction {
  _id: string;
  title: string;
  description: string;
  reserved: boolean;
  reservePrice: number;
  city: string;
  images: string[];
  make: string;
  model: string;
  variant: string;
  year: number;
  registered: boolean;
  registeredProvince?: string;
  sellerId: string;
  engineCapacity: number;
  transmissionType: string;
  mileage: number;
  fuelType: string;
  flawed: boolean;
  modified: boolean;
  imported: boolean;
  auctionExpiry?: Date;
  currentHighestBid: number;
  seller?: {
    name: string;
    profilePicture: string;
  }
}

export type AuctionBid = {
  _id?: string;
  auctionId: string;
  userId: string;
  bid: number;
  createdAt: number;
  userName?: string;
  userProfilePicture?: string;
}

export type AuctionComment = {
  _id?: string;
  auctionId: string;
  userId: string;
  content: string;
  createdAt?: number;
  userName?: string;
  upvotes?: AuctionCommentUpvote[];
  userProfilePicture?: string;
}

export type AuctionCommentUpvote = {
  userId: string;
  createdAt?: number;
}

export type AuctionInfoFormData = Partial<VehicleInfoForm> &
  Partial<AuctionInfoForm>;

export interface VehicleInfoForm {
  make?: string;
  model?: string;
  variant?: string;
  year?: number;
  mileage?: number;
  engineCapacity?: number;
  transmission?: string;
  fuelType?: string;
  registered?: string;
  registeredProvince?: string;
  modified?: string;
  flaws?: string;
  imported?: string;
}

export interface AuctionInfoForm {
  title?: string;
  description?: string;
  expiry?: string;
  city?: string;
  reservePrice?: number;
  images?: string[];
  sellerId?: string;
}
