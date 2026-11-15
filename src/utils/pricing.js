// src/utils/pricing.js

export function getBestWholesaler(offers) {
  if (!offers || offers.length === 0) return null;
  
  // Sort by wholesale price ascending to find the lowest cost
  const sorted = [...offers].sort((a, b) => a.wholesalePrice - b.wholesalePrice);
  return sorted[0]; // Returns the cheapest supplier
}

export function calculateMargin(sellingPrice, wholesalePrice) {
  const profit = sellingPrice - wholesalePrice;
  const marginPercentage = ((profit / sellingPrice) * 100).toFixed(1);
  return { profit, marginPercentage };
}