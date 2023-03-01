/*
  (?=.*[0-9])           # a digit must occur at least once
  (?=.*[a-z])           # a lower case letter must occur at least once
  (?=.*[A-Z])           # an upper case letter must occur at least once
  (?=.*[@#$%^&+=*!?/])  # a special character must occur at least once
  (?=\S+$)              # no whitespace allowed in the entire string
  .{8,}                 # anything, at least eight places though
*/
export const PASSWORD_REGEX =
  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*!?/])(?=\S+$).{8,}/;

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
