import { z } from "zod";

export const VehicleInfoFormSchema = z
  .object({
    make: z.string().min(1).max(255),
    model: z.string().min(1).max(255),
    variant: z.string().min(1).max(255),
    year: z.number().min(1940).max(new Date().getFullYear()),
    mileage: z.number().min(1),
    engineCapacity: z.number().min(1),
    transmission: z.string().min(1).max(255),
    fuelType: z.string().min(1).max(255),
    registered: z.string().min(1).max(255),
    registeredProvince: z.string().max(255).nullable(),
    modified: z.string().min(1).max(255),
    flaws: z.string().min(1).max(255),
    imported: z.string().min(1).max(255),
  })
  .superRefine((data, ctx) => {
    if (data.registered === "Registered") {
      if (!data.registeredProvince) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a registration province",
          path: ["registrationProvince"],
        });
        return false;
      }
    }
    return true;
  });

export type VehicleInfoFormData = z.infer<typeof VehicleInfoFormSchema>;

export const AuctionInfoFormSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  expiry: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  isReserved: z.string(),
  reservePrice: z.number().min(0).default(0),
});

export type AuctionInfoFormData = z.infer<typeof AuctionInfoFormSchema>;

export const AuctionBiddingFormSchema = z.object({
  bid: z.number().min(1000),
});

export type AuctionBiddingFormData = z.infer<typeof AuctionBiddingFormSchema>;

export const ProfileFormSchema = z.object({
  name: z.string().min(3).max(56),
  bio: z.string().max(255).nullable(),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;
