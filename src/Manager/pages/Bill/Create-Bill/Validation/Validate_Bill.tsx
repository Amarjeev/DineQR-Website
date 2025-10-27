export interface BillData {
  restaurantName: string
  address: string
  gstNumber?: string
  contactNumber: string
}

export interface BillErrors {
  restaurantName?: string
  address?: string
  gstNumber?: string
  contactNumber?: string
  duplicatError?: string
}

export const Validate_Bill = (data: BillData): BillErrors => {
  const errors: BillErrors = {}

  if (data.restaurantName.length < 3 || data.restaurantName.length > 80) {
    errors.restaurantName = 'Restaurant name must be between 3–80 characters.'
  }

  if (data.address.length < 10 || data.address.length > 150) {
    errors.address = 'Address must be between 10–150 characters.'
  }

  if (data.gstNumber && data.gstNumber.length !== 15) {
    errors.gstNumber = 'GST number must be exactly 15 characters.'
  }

  if (!/^\d{10}$/.test(data.contactNumber)) {
    errors.contactNumber = 'Contact number must be 10 digits.'
  }

  return errors
}
