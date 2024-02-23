import { z } from "zod";

export const VehicleInfoFormSchema = z
  .object({
    make: z
      .string()
      .min(1, "Please provide the make of your vehicle.")
      .max(255, "Vehicle make name is too long."),
    model: z
      .string()
      .min(1, "Please provide the model of your vehicle.")
      .max(255, "Vehicle model name is too long."),
    variant: z
      .string()
      .min(1, "Please provide the variant of your vehicle.")
      .max(255, "Vehicle variant name is too long."),
    year: z.number().min(1947).max(new Date().getFullYear()),
    mileage: z
      .number({
        invalid_type_error: "Please provide valid mileage.",
      })
      .min(1, "Please provide the mileage."),
    engineCapacity: z
      .number({
        invalid_type_error: "Please provide valid engine capacity.",
      })
      .min(1, "Please provide the engine capacity."),
    transmission: z
      .string()
      .min(1, "Please provide transmission type.")
      .max(255, "Transmission type too long."),
    fuelType: z
      .string()
      .min(1, "Please provide the fuel type.")
      .max(255, "Fuel type too long."),
    registered: z
      .string()
      .min(1, "Please specify if registered or not.")
      .max(255),
    registeredProvince: z.string().max(255).nullable(),
    modified: z.string().min(1, "Please specify if modified or not.").max(255),
    flaws: z
      .string()
      .min(1, "Please specify if there are any flaws or not.")
      .max(255),
    imported: z
      .string()
      .min(1, "Please specify if local or imported.")
      .max(255),
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
  title: z
    .string()
    .min(3, "Minimum title length is 3 characters.")
    .max(64, "You title is too long."),
  description: z
    .string()
    .min(3, "Description too small.")
    .max(1024, "Description too big."),
  auctionExpiry: z.string().min(1, "Specify when your auction expires.").max(3),
  city: z.string().min(1, "Specify your auction city.").max(255),
  isReserved: z.string(),
  reservePrice: z
    .number({
      invalid_type_error: "Please provide valid reserve price.",
    })
    .min(0)
    .optional()
    .default(0),
});

export type AuctionInfoFormData = z.infer<typeof AuctionInfoFormSchema>;

export const AuctionBiddingFormSchema = z.object({
  bid: z
    .number({
      invalid_type_error: "Please provide a valid bid.",
    })
    .min(1000, "Minimum auction amount is PKR 1000."),
});

export type AuctionBiddingFormData = z.infer<typeof AuctionBiddingFormSchema>;

export const ProfileFormSchema = z.object({
  name: z.string().min(3, "Name is too small.").max(56, "Name is too big."),
  bio: z.string().max(255).nullable(),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;
