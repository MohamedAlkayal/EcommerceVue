function emailValidator(email) {
  if (!email.touched) {
    return
  }
  if (!email.value.trim()) {
    email.error = 'Email is required'
    return
  }
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  if (!emailRegex.test(email.value)) {
    email.error = 'Please Enter a valid mail'
  } else {
    email.error = ''
  }
}

function passwordValidator(password) {
  if (!password.touched) {
    return
  }

  if (!password.value.trim()) {
    password.error = 'Password is required'
    return
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  if (!passwordRegex.test(password.value)) {
    password.error =
      'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
  } else {
    password.error = ''
  }
}

function fullnameValidator(fullname) {
  if (!fullname.touched) {
    return
  }

  if (!fullname.value.trim()) {
    fullname.error = 'Full name is required'
    return
  }

  const fullnameRegex = /^[a-zA-Z\s]*$/
  if (!fullnameRegex.test(fullname.value)) {
    fullname.error = 'Please enter a valid full name'
  } else {
    fullname.error = ''
  }
}

function confirmPasswordValidator(password, confirmPassword) {
  if (!confirmPassword.touched) {
    return
  }

  if (!confirmPassword.value.trim()) {
    confirmPassword.error = 'Please confirm your password'
    return
  }

  if (password !== confirmPassword.value) {
    confirmPassword.error = 'Passwords do not match'
  } else {
    confirmPassword.error = ''
  }
}

function usernameValidator(username) {
  if (!username.touched) {
    return
  }

  if (!username.value.trim()) {
    username.error = 'Username is required'
    return
  }

  // You can customize the regex pattern as per your requirements
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  if (!usernameRegex.test(username.value)) {
    username.error =
      'Username must contain only letters, numbers, and underscores. Length must be between 3 and 20 characters.'
  } else {
    username.error = ''
  }
}

function signupValidator(form) {
  form.fullName.touched = true
  form.email.touched = true
  form.password.touched = true
  form.confirm.touched = true
  fullnameValidator(form.fullName)
  emailValidator(form.email)
  passwordValidator(form.password)
  confirmPasswordValidator(form.password.value, form.confirm)
}

function loginValidator(form) {
  form.username.touched = true
  form.password.touched = true
  usernameValidator(form.username)
  passwordValidator(form.password)
}

export {
  signupValidator,
  loginValidator,
  usernameValidator,
  emailValidator,
  passwordValidator,
  fullnameValidator,
  confirmPasswordValidator
}
