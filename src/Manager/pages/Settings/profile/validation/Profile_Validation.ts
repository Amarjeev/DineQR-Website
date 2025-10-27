export type ProfileData = {
  name: string
  email: string
  mobileNumber: string
  Password?: string
  rePassword?: string
}

export const Profile_Validation = (formData: ProfileData) => {
  const errors: Record<string, string> = {}

  // Name validation
  if (
    !formData.name ||
    formData.name.length < 3 ||
    formData.name.length > 50 ||
    !/^[A-Za-z\s]+$/.test(formData.name)
  ) {
    errors.name = "Name must be 3–50 characters and only letters/spaces"
  }

  // Email validation
  if (
    !formData.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
    formData.email.length > 254
  ) {
    errors.email = "Invalid email address"
  }

  // Mobile validation
  if (!/^\d{10}$/.test(formData.mobileNumber)) {
    errors.mobileNumber = "Mobile number must be 10 digits"
  }

  // Password validation (only if provided)
  if (formData.Password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,15}$/
    if (!passwordRegex.test(formData.Password)) {
      errors.Password =
        "Password must be 6–15 chars, include 1 lowercase, 1 uppercase, 1 number, 1 special char"
    }

    if (!formData.rePassword) {
      errors.rePassword = "Please confirm password"
    } else if (formData.Password !== formData.rePassword) {
      errors.rePassword = "Passwords do not match"
    }
  }

  return errors
}
