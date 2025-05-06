export interface CategoryProperties {
  [key: string]: {
    icon: string;
    color: string;
  };
}

export const CATEGOTY_PROPERTIES: CategoryProperties = {
  Zakat: { icon: "ApartmentOutlined", color: "#62DAAB" },
  Family: { icon: "TeamOutlined", color: "#6395F9" },
  "Boarding House": { icon: "HomeOutlined", color: "#657798" },
  Charity: { icon: "GiftOutlined", color: "#F6C022" },
  Investment: { icon: "BarChartOutlined", color: "#7666F9" },
  Electricity: { icon: "ThunderboltOutlined", color: "#0081C9" },
  Internet: { icon: "WifiOutlined", color: "#815B5B" },
  "Cash Withdrawal": { icon: "CreditCardOutlined", color: "#41644A" },
  Shopping: { icon: "ShoppingCartOutlined", color: "#EB455F" },
  Life: { icon: "RocketOutlined", color: "#E86A33" },
  Laundry: { icon: "ContainerOutlined", color: "#72FFFF" },
  "E-Wallet": { icon: "WalletOutlined", color: "#2F8F9D" },
  Subscription: { icon: "LaptopOutlined", color: "#FFE7CC" },
  Others: { icon: "GlobalOutlined", color: "#2C3333" },
};

export const INCOME_CATEGORY_OPTIONS = [
  {
    value: "Salary",
    label: "Salary",
  },
  {
    value: "Bonus",
    label: "Bonus",
  },
  {
    value: "Others",
    label: "Others",
  },
];

export const EXPENSE_CATEGORY_OPTIONS = [
  {
    value: "Zakat",
    label: "Zakat",
  },
  {
    value: "Family",
    label: "Family",
  },
  {
    value: "Boarding House",
    label: "Boarding House",
  },
  {
    value: "Charity",
    label: "Charity",
  },
  {
    value: "Investment",
    label: "Investment",
  },
  {
    value: "Electricity",
    label: "Electricity",
  },
  {
    value: "Internet",
    label: "Internet",
  },
  {
    value: "Cash Withdrawal",
    label: "Cash Withdrawal",
  },
  {
    value: "Shopping",
    label: "Shopping",
  },
  {
    value: "Life",
    label: "Life",
  },
  {
    value: "Laundry",
    label: "Laundry",
  },
  {
    value: "E-Wallet",
    label: "E-Wallet",
  },
  {
    value: "Subscription",
    label: "Subscription",
  },
  {
    value: "Others",
    label: "Others",
  },
];
