import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  LineChart as LineChartIcon,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Area,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Donut } from "../charts/circle-chart";

type Stat = {
  title: string;
  value: string;
  delta: string;
  positive?: boolean;
  icon: React.ReactNode;
  bgClass?: string;
  whiteOnDark?: boolean;
};

const stats: Stat[] = [
  {
    title: "Customers",
    value: "3,781",
    delta: "+11.01%",
    positive: true,
    icon: <Users className="size-4" />,
    bgClass: "bg-[#E3F5FF]",
    whiteOnDark: false,
  },
  {
    title: "Orders",
    value: "1,219",
    delta: "-0.03%",
    positive: false,
    icon: <ShoppingCart className="size-4" />,
    bgClass: "bg-[#F7F9FB] dark:bg-[#FFF]/5",
    whiteOnDark: true,
  },
  {
    title: "Revenue",
    value: "$695",
    delta: "+15.03%",
    positive: true,
    icon: <DollarSign className="size-4" />,
    bgClass: "bg-[#F7F9FB] dark:bg-[#FFF]/5",
    whiteOnDark: true,
  },
  {
    title: "Growth",
    value: "30.1%",
    delta: "+6.08%",
    positive: true,
    icon: <LineChartIcon className="size-4" />,
    bgClass: "bg-[#E5ECF6]",
    whiteOnDark: false,
  },
];

const revenueChartData = [
  { month: "Jan", current: 7, prevSolid: 12, prevDot: null },
  { month: "Feb", current: 17, prevSolid: 10, prevDot: null },
  { month: "Mar", current: 13, prevSolid: 8, prevDot: null },
  { month: "Apr", current: 12, prevSolid: 12, prevDot: 12 },
  { month: "May", current: 10, prevSolid: null, prevDot: 18 },
  { month: "Jun", current: 24, prevSolid: null, prevDot: 20 },
];

const barChartData = [
  { month: "Jan", actual: 16, cap: 4 },
  { month: "Feb", actual: 19, cap: 6 },
  { month: "Mar", actual: 17, cap: 4 },
  { month: "Apr", actual: 22, cap: 6 },
  { month: "May", actual: 14, cap: 3 },
  { month: "Jun", actual: 20, cap: 5 },
];

const topSelling = [
  {
    name: "ASOS Ridley High Waist",
    price: "$79.49",
    qty: 82,
    amount: "$6,518.18",
  },
  {
    name: "Marco Lightweight Shirt",
    price: "$128.50",
    qty: 37,
    amount: "$4,754.50",
  },
  { name: "Half Sleeve Shirt", price: "$39.99", qty: 64, amount: "$2,559.36" },
  {
    name: "Lightweight Jacket",
    price: "$20.00",
    qty: 184,
    amount: "$3,680.00",
  },
  { name: "Marco Shoes", price: "$79.49", qty: 64, amount: "$1,965.81" },
];

const locations = [
  { name: "New York", value: "72K" },
  { name: "San Francisco", value: "39K" },
  { name: "Sydney", value: "25K" },
  { name: "Singapore", value: "61K" },
];

function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card
      className={cn(
        "border-transparent p-6 w-full h-full gap-2 rounded-[16px] shadow-none dark:border-white/5",
        stat.bgClass
      )}
    >
      <h1>
        <CardTitle
          className={cn(
            "text-sm font-semibold text-[#1C1C1C] leading-[20px]",
            stat.whiteOnDark ? "dark:text-white" : "dark:text-[#1C1C1C]"
          )}
        >
          {stat.title}
        </CardTitle>
      </h1>
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "text-2xl font-semibold tracking-tight",
              stat.whiteOnDark ? "dark:text-white" : "dark:text-[#1C1C1C]"
            )}
          >
            {stat.value}
          </div>
          <div className="flex items-center gap-2 text-xs ">
            <span
              className={cn(
                "text-xs",
                stat.whiteOnDark ? "dark:text-white" : "dark:text-[#1C1C1C]"
              )}
            >
              {stat.delta}
            </span>
            {stat.positive ? (
              <TrendingUp
                size={16}
                className={cn(
                  "text-xs",
                  stat.whiteOnDark ? "dark:text-white" : "dark:text-[#1C1C1C]"
                )}
              />
            ) : (
              <TrendingDown
                size={16}
                className={cn(
                  "text-xs",
                  stat.whiteOnDark ? "dark:text-white" : "dark:text-[#1C1C1C]"
                )}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DefaultDashboard() {
  const maxLocationValue = Math.max(...locations.map((l) => parseInt(l.value)));
  const salesBreakdown = [
    { name: "Direct", amount: 300.56, color: "#111111" },
    { name: "Affiliate", amount: 135.18, color: "#B7EFC5" },
    { name: "Sponsored", amount: 154.02, color: "#98A8FF" },
    { name: "E-mail", amount: 48.96, color: "#CFE8F6" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm font-semibold">eCommerce</div>

      {/* Row 1: Stats + Bar */}
      <div className="flex flex-col gap-7 md:flex-row max-h-[252px] h-full">
        <div className="grid grid-cols-2 gap-7 w-1/2">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} />
          ))}
        </div>
        <Card className="mt-2 md:mt-0 flex-1 min-w-0 gap-4 rounded-2xl bg-[#F7F9FB] dark:bg-[#fff]/5 shadow-none border-transparent">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-medium">
              Projections vs Actuals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                actual: { label: "Actuals", color: "#A8C5DA" },
                cap: { label: "Projections", color: "#A8C5DA" },
              }}
              className="h-[180px] w-full"
            >
              <BarChart data={barChartData} barSize={24}>
                <CartesianGrid vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickMargin={8}
                />
                <YAxis
                  ticks={[0, 10, 20, 30]}
                  domain={[0, 30]}
                  tickFormatter={(v) => `${v}M`}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="actual" stackId="a" fill="var(--color-actual)" />
                <Bar
                  dataKey="cap"
                  stackId="a"
                  fill="var(--color-cap)"
                  fillOpacity={0.5}
                  radius={[3.5, 3.5, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Revenue line + Locations */}
      <div className="flex gap-7 justify-between max-h-[318px] h-full">
        <Card className=" rounded-2xl gap-4 w-full bg-[#F7F9FB] dark:bg-[#fff]/5 p-6 shadow-none border-transparent">
          <CardHeader className="pb-0 px-0">
            <div className="flex items-center gap-4">
              <CardTitle className="text-sm font-semibold">Revenue</CardTitle>
              <span className="h-6 w-px bg-border" />
              <div className="flex items-center gap-6 text-sm px-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-black dark:bg-[#C6C7F8]" />
                  <span>
                    Current Week <span className="font-semibold">$58,211</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block size-2 rounded-full"
                    style={{ background: "#A8C5DA" }}
                  />
                  <span>
                    Previous Week <span className="font-semibold">$68,768</span>
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                current: {
                  label: "Current Week",
                  color: "#A8C5DA",
                },
                prev: {
                  label: "Previous Week",
                  color: "#000000",
                },
              }}
              className="h-[222px] w-full"
            >
              <LineChart data={revenueChartData}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A8C5DA" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#A8C5DA" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={true}
                  tickMargin={8}
                />
                <YAxis
                  ticks={[0, 10, 20, 30]}
                  domain={[0, 30]}
                  tickFormatter={(v) => `${v}M`}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  type="monotoneX"
                  dataKey="current"
                  stroke="none"
                  fill="url(#revFill)"
                />
                <Line
                  type="monotoneX"
                  dataKey="current"
                  stroke="#A8C5DA"
                  strokeWidth={5}
                  dot={false}
                  strokeLinecap="round"
                />
                <Line
                  type="monotoneX"
                  dataKey="prevSolid"
                  stroke="currentColor"
                  className="text-black dark:text-[#C6C7F8]"
                  strokeWidth={4}
                  dot={false}
                  strokeLinecap="round"
                  connectNulls={false}
                />
                <Line
                  type="monotoneX"
                  dataKey="prevDot"
                  stroke="currentColor"
                  className="text-black dark:text-[#C6C7F8]"
                  strokeDasharray="6 6"
                  strokeWidth={4}
                  dot={false}
                  strokeLinecap="round"
                  connectNulls={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl min-w-[202px] bg-[#F7F9FB] dark:bg-[#fff]/5 p-6 gap-4 shadow-none border-transparent">
          <CardHeader className="pb-0 px-0">
            <CardTitle className="text-sm font-medium">
              Revenue by Location
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col gap-4">
              <div className="col-span-3">
                {/* Simple placeholder world map */}
                <div className="rounded-lg bg-secondary/40 flex items-stretch">
                  <img
                    src="/Map.png"
                    alt="World Map"
                    className=" object-cover w-[154px] h-[82px]"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <ul className="space-y-3 flex flex-col gap-1">
                  {locations.map((l) => (
                    <li key={l.name} className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{l.name}</span>
                        <span className="font-normal text-xs">{l.value}</span>
                      </div>
                      <div className="h-0.5 w-full rounded-full bg-[#A8C5DA80]">
                        <div
                          className="h-full rounded-full bg-[#A8C5DA]"
                          style={{
                            width: `${
                              (parseInt(l.value) / maxLocationValue) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Table + Donut */}
      <div className="flex gap-7 h-full">
        <Card className=" rounded-2xl gap-4 w-full bg-[#F7F9FB] dark:bg-[#fff]/5 p-6 shadow-none border-transparent">
          <CardHeader className="pb-0 px-0">
            <CardTitle className="text-sm font-semibold">
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-xs">
            <Table className="w-full">
              <TableHeader className="border-b">
                <TableRow className="text-xs">
                  <TableHead className="w-[50%] text-xs text-[#1C1C1C66] dark:text-[#fff]/40 font-normal">
                    Name
                  </TableHead>
                  <TableHead className="text-[#1C1C1C66] dark:text-[#fff]/40 text-xs font-normal">
                    Price
                  </TableHead>
                  <TableHead className="text-[#1C1C1C66] dark:text-[#fff]/40 text-xs font-normal">
                    Quantity
                  </TableHead>
                  <TableHead className="text-[#1C1C1C66] dark:text-[#fff]/40 text-xs font-normal">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSelling.map((p) => (
                  <TableRow
                    key={p.name}
                    className="hover:bg-transparent border-none text-[#1C1C1C] dark:text-[#fff] !h-10"
                  >
                    <TableCell className="py-4 text-xs font-normal">
                      {p.name}
                    </TableCell>
                    <TableCell className="py-4 text-xs font-normal">
                      {p.price}
                    </TableCell>
                    <TableCell className="py-4 text-xs font-normal">
                      {p.qty}
                    </TableCell>
                    <TableCell className="py-4 text-xs font-normal">
                      {p.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="min-w-[202px] flex-1 rounded-2xl bg-[#F7F9FB] dark:bg-[#fff]/5 p-6 gap-4 shadow-none border-transparent">
          {" "}
          <CardHeader className="pb-0 px-0">
            <CardTitle className="text-sm font-semibold">Total Sales</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <Donut
                  data={salesBreakdown.map((d) => ({
                    name: d.name,
                    amount: d.amount,
                    color: d.color,
                  }))}
                  size={112}
                  thickness={22}
                  gapPx={18}
                  // capStart="outer"
                  // capEnd="inner"
                  bg="#F7F9FB"
                />
              </div>
              <ul className="grid gap-3">
                {salesBreakdown.map((d) => (
                  <li
                    key={d.name}
                    className="flex items-center justify-between gap-8 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block size-2 rounded-full"
                        style={{ background: d.color }}
                      />
                      <span>{d.name}</span>
                    </div>
                    <div>${d.amount.toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
