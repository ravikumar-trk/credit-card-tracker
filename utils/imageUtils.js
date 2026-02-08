// Map of card bank names to their image paths
const cardImageMap = {
  "HDFC IOL": require("../assets/cardImages/hdfcIndianOil.png"),
  "HDFC Tata Nue": require("../assets/cardImages/hdfcTataNue.png"),
  SBI: require("../assets/cardImages/sbi.png"),
  HSBC: require("../assets/cardImages/hsbc.png"),
  RBL: require("../assets/cardImages/rbl.png"),
  "Amazon Pay ICICI": require("../assets/cardImages/amazonPayIcici.png"),
  "Axis Flipkart": require("../assets/cardImages/axisFlipkart.png"),
  "Axis Super Money": require("../assets/cardImages/axisSuperMoney.png"),
};

/**
 * Get the image source for a card bank
 * @param {string} bankName - The name of the card bank
 * @returns {object|null} - The image source object or null if not found
 */
const getCardBankImage = (bankName) => {
  return cardImageMap[bankName] || null;
};

export { getCardBankImage, cardImageMap };
