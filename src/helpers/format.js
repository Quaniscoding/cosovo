// helpers/format.js

export const formatVND = (price) => {
  if (price === undefined || price === null || isNaN(price)) return "0 ₫";
  return Number(price).toLocaleString("vi-VN") + " ₫";
};
