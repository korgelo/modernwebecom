export const AFFILIATE_TAG = "gelokor01-20";

export const generateAmazonSearchUrl = (productName: string): string => {
  const encodedTitle = productName.trim().replace(/\s+/g, "+");
  return `https://www.amazon.com/s?k=${encodedTitle}&tag=${AFFILIATE_TAG}`;
};
