const defaultCards = [
  {
    id: "1",
    name: "HDFC Credit Card",
    number: "**** 1234",
    fullNumber: "4532 1234 5678 9012",
    type: "Visa",
    cvv: "234",
    billCycle: "5th - 4th",
    lastPaymentDate: "25th",
    limit: "₹1,00,000",
    image: "hdfc.png",
  },
  {
    id: "2",
    name: "SBI Credit Card",
    number: "**** 5678",
    fullNumber: "5678 9012 3456 7890",
    type: "Mastercard",
    cvv: "567",
    billCycle: "10th - 9th",
    lastPaymentDate: "30th",
    limit: "₹75,000",
    image: "hdfc.png",
  },
  {
    id: "3",
    name: "ICICI Credit Card",
    number: "**** 9012",
    fullNumber: "9012 3456 7890 1234",
    type: "Visa",
    cvv: "890",
    billCycle: "15th - 14th",
    lastPaymentDate: "28th",
    limit: "₹50,000",
    image: "hdfc.png",
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
  { value: "splitwise", label: "Added in Splitwise" },
  { value: "notSplitwise", label: "Not Added in Splitwise" },
  { value: "mine", label: "Mine" },
];

export { defaultCards, months, statusOptions };
