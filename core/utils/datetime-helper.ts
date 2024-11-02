export const getDateTime = async (): Promise<string> => {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1);
  const date = String(now.getDate());
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  const timestamp = `${year}-${month}-${date}_${hour}-${minute}-${second}`;
  return timestamp;
};
