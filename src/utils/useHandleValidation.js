export function isValidEmail(value) {
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return emailRegex.test(value)
}

export function matchPassword(value, compareValue) {
  return value === compareValue
}

export function isNotEmpty (value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}