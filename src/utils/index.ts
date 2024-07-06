export const delay = async (timeout: number) => {
  return await new Promise(res => setTimeout(res, timeout));
};
