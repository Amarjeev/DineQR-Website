interface StaffFormData {
  staffId: string
  name: string // added
  password: string
  rePassword: string
}

export interface StaffValidationErrors {
  staffId?: string
  name?: string // added
  password?: string
  rePassword?: string
}

interface ValidationResult {
  valid: boolean
  errors: StaffValidationErrors
}

export const Staff_Acc_Validation = (
  data: StaffFormData,
  skipPassword: boolean = false
): ValidationResult => {
  const { staffId, name, password, rePassword } = data
  const errors: StaffValidationErrors = {}

  // 1️⃣ Validate staffId format: ST- followed by 6 digits
  const staffIdRegex = /^ST-\d{6}$/
  if (!staffId) {
    errors.staffId = 'Staff ID is required'
  } else if (!staffIdRegex.test(staffId)) {
    errors.staffId = 'Invalid Staff ID format. Example: ST-616703'
  }

  // 2️⃣ Validate name length
  if (!name || name.trim().length < 3 || name.trim().length > 25) {
    errors.name = 'Name must be between 3 and 20 characters'
  }
  if (!skipPassword) {
    // 3️⃣ Validate password length
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long'
    }

    // 4️⃣ Validate rePassword
    if (!rePassword) {
      errors.rePassword = 'Confirm Password is required'
    } else if (password !== rePassword) {
      errors.rePassword = 'Passwords do not match'
    }
  }

  return {
    valid: Object.keys(errors).length === 0, // ✅ true if no errors
    errors,
  }
}
