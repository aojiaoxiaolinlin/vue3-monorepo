export type UserPhoneInfo = {
  token?: string;
  phone?: string;
};

export const getUserPhoneApiInfo = (userPhoneInfo: UserPhoneInfo) => {
  const params = userPhoneInfo.token ? { data: userPhoneInfo.token } : undefined;
  const data = userPhoneInfo.phone ? { phone: userPhoneInfo.phone } : undefined;
  if (!params && !data) {
    throw new Error("params and data cannot be empty at the same time");
  }
  return { params, data };
};
