export function searchItems(data, term, fields) {
  const regex = new RegExp(term, "i");
  return data.filter((item) => fields.some((field) => regex.test(item[field])));
}

export function textLimiter(text, limit = 70) {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
}

export const isin = (min, max, closing = "in_in") => {
  switch (closing) {
    case "in_in":
      return (x) => x >= min && x <= max;
    case "in_ex":
      return (x) => x >= min && x < max;
    case "ex_in":
      return (x) => x > min && x <= max;
    case "ex_ex":
      return (x) => x > min && x < max;
    default:
      break;
  }
};
