export interface HotelInfoForm {
  name: string;
  contactNumber: string;
  email: string;
  openingTime: string;
  closingTime: string;
  website?: string;
  address: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export const HotelInfo_Validation = (data: HotelInfoForm): ValidationErrors => {
  const errors: ValidationErrors = {};
  const timeRegex = /^(1[0-2]|0?[1-9]):00 (AM|PM)$/;

  // Name
  if (!data.name || data.name.length < 3 || data.name.length > 80) {
    errors.name = 'Restaurant/Hotel name must be between 3 and 80 characters.';
  }

  // Contact Number
  if (!data.contactNumber) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!/^[6-9]\d{9}$/.test(data.contactNumber)) {
    errors.contactNumber = 'Enter a valid Indian mobile number (10 digits, starting with 6-9).';
  }

  // Email
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Enter a valid email address.';
  } else if (data.email.length > 100) {
    errors.email = 'Email cannot exceed 100 characters.';
  }

  // Opening & Closing Time
  if (!data.openingTime) errors.openingTime = 'Opening time is required.';
  else if (!timeRegex.test(data.openingTime)) errors.openingTime = 'Opening time must be in the format h:00 AM/PM';

  if (!data.closingTime) errors.closingTime = 'Closing time is required.';
  else if (!timeRegex.test(data.closingTime)) errors.closingTime = 'Closing time must be in the format h:00 AM/PM';

  // Check that openingTime < closingTime
  const convertTo24Hour = (time: string) => {
    const [hourStr, period] = time.split(/:00 | /);
    let hour = parseInt(hourStr, 10);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return hour;
  };

  if (
    data.openingTime && data.closingTime &&
    timeRegex.test(data.openingTime) && timeRegex.test(data.closingTime)
  ) {
    const openHour = convertTo24Hour(data.openingTime);
    const closeHour = convertTo24Hour(data.closingTime);

    if (openHour >= closeHour) {
      errors.openingTime = 'Opening time must be earlier than closing time.';
      errors.closingTime = 'Closing time must be later than opening time.';
    }
  }

  // Website (optional)
  if (data.website) {
    if (data.website.length > 2000) errors.website = 'Website/social link cannot exceed 2000 characters.';
    else if (!/^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.+)?$/.test(data.website)) {
      errors.website = 'Enter a valid website or social link.';
    }
  }

  // Address
  if (!data.address || data.address.length < 10 || data.address.length > 150) {
    errors.address = 'Address must be between 10 and 150 characters.';
  }

  return errors;
};
