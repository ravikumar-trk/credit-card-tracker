const defaultCards = [
  {
    id: "1",
    name: "HDFC Indian Oil Credit Card",
    fullNumber: "4532 1234 5678 9012",
    type: "Visa",
    cvv: "234",
    expiryDate: "03/29",
    billCycle: "5th - 4th",
    lastPaymentDate: "25th",
    limit: "₹1,00,000",
    bank: "HDFC IOL",
  },
  {
    id: "2",
    name: "SBI Credit Card",
    fullNumber: "5678 9012 3456 7890",
    type: "Mastercard",
    cvv: "567",
    expiryDate: "08/27",
    billCycle: "10th - 9th",
    lastPaymentDate: "30th",
    limit: "₹75,000",
    bank: "SBI",
  },
  {
    id: "3",
    name: "Amazon Pay ICICI",
    fullNumber: "9012 3456 7890 1234",
    type: "Visa",
    cvv: "890",
    expiryDate: "06/28",
    billCycle: "15th - 14th",
    lastPaymentDate: "28th",
    limit: "₹50,000",
    bank: "Amazon Pay ICICI",
  },
];

const months = [
  { value: "1", label: "Jan" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

const statusOptions = [
  { value: "paid", label: "Paid" },
  { value: "notPaid", label: "Not Paid" },
  { value: "addedSplitwise", label: "Added in Splitwise" },
  { value: "notAddSplitwise", label: "Not Added in Splitwise" },
  { value: "mine", label: "Mine" },
];

const cardBanks = [
  {
    name: "HDFC IOL",
    image: "hdfcIOL.png",
  },
  {
    name: "HDFC Tata Nue",
    image: "hdfcTataNue.png",
  },
  {
    name: "SBI",
    image: "sbi.png",
  },
  {
    name: "HSBC",
    image: "hsbc.png",
  },
  {
    name: "RBL",
    image: "rbl.png",
  },
  {
    name: "Amazon Pay ICICI",
    image: "amazonPayIcici.png",
  },
  {
    name: "Axis Flipkart",
    image: "axisFlipkart.png",
  },
  {
    name: "Axis Super Money",
    image: "axisSuperMoney.png",
  },
];

export { defaultCards, months, statusOptions, cardBanks };
