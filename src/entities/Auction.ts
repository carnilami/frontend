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
}

export interface AuctionBid {
  _id?: string;
  auctionId: string;
  userId: string;
  bid: number;
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
