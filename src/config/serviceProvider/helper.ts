export const checkIsStringify = async (data: string) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
};
