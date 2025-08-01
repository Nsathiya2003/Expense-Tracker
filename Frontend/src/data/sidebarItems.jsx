import {
  LayoutDashboard,
  FolderCog,
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  Tags,
  LogOut,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Manage",
    icon: <FolderCog size={20} />,
    children: [
      {
        title: "Income",
        path: "/income",
        icon: <ArrowDownCircle size={16} />, 
      },
      {
        title: "Expenses",
        path: "/expense",
        icon: <ArrowUpCircle size={16} />, 
      },
      {
        title: "Budgets",
        path: "/budget",
        icon: <Wallet size={16} />, 
      },
    ],
  },
  {
    title: "Master",
    icon: <DollarSign size={20} />, 
    children: [
      {
        title: "Category",
        path: "/category",
        icon: <Tags size={16} />,
      },
    ],
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <LogOut size={20} />, 
  },
];
