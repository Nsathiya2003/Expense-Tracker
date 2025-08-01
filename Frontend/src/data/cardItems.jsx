// data/cardItems.js
import { Coins, CreditCard, Wallet, ReceiptText } from "lucide-react";

export const cardItems = [
  {
    name: "Income",
    amount: 15000,
    icon: Coins,
    subtitle: "Total Received",
    trend: "Growth",
    trendColor: "green",
  },
  {
    name: "Expense",
    amount: 8000,
    icon: CreditCard,
    subtitle: "Total Spent",
    trend: "Overspent",
    trendColor: "rose",
  },
  {
    name: "Budget",
    amount: 210,
    icon: Wallet,
    subtitle: "Planned Allocation",
    trend: "On Track",
    trendColor: "blue",
  },
  // {
  //   name: "Transactions",
  //   amount: 75,
  //   icon: ReceiptText,
  //   subtitle: "Processed Entries",
  //   trend: "Stable",
  //   trendColor: "yellow",
  // },
];
