export const isActivityDate = () => {
  const date = new Date();
  const day = date.getDate();
  if (day !== 7) {
    return false;
  }

  return true;
};
