const defaultCards = [];

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
