export type InquiryInput = {
  brandName?: string;
  productType?: string;
  boxSize?: string;
  quantity?: number | string;
  city?: string;
  phone?: string;
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{8,20}$/;

export function validateInquiry(input: InquiryInput) {
  const errors: string[] = [];
  const brandName = input.brandName?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const quantity =
    input.quantity === undefined || input.quantity === ""
      ? undefined
      : Number(input.quantity);

  if (!brandName) errors.push("Brand name is required.");
  if (brandName.length > 100) errors.push("Brand name is too long.");
  if (phone) {
    if (!PHONE_REGEX.test(phone)) errors.push("Phone format is invalid.");
    if (phone.length > 20) errors.push("Phone number is too long.");
  }
  if (email) {
    if (!EMAIL_REGEX.test(email)) errors.push("Email format is invalid.");
    if (email.length > 100) errors.push("Email is too long.");
  }
  if (quantity !== undefined && (!Number.isFinite(quantity) || quantity < 1 || quantity > 10000000)) {
    errors.push("Quantity must be a positive number up to 10 million.");
  }
  if (input.message && input.message.length > 2000) {
    errors.push("Message is too long (max 2000 characters).");
  }
  if (input.productType && input.productType.length > 100) errors.push("Product type is too long.");
  if (input.boxSize && input.boxSize.length > 100) errors.push("Box size is too long.");
  if (input.city && input.city.length > 100) errors.push("City name is too long.");

  return {
    errors,
    data: {
      brandName,
      productType: input.productType?.trim() || undefined,
      boxSize: input.boxSize?.trim() || undefined,
      quantity,
      city: input.city?.trim() || undefined,
      phone,
      email: email || undefined,
      message: input.message?.trim() || undefined,
    },
  };
}
