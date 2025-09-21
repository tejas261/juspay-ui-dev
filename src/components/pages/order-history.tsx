import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Plus,
  ArrowUpDown,
  Search,
  MoreHorizontal,
  Calendar,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ListFilter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Order = {
  id: string;
  user: { name: string; avatar: string };
  project: string;
  address: string;
  date: string; // display label
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
};

const statusOptions: Order["status"][] = [
  "In Progress",
  "Complete",
  "Pending",
  "Approved",
  "Rejected",
] as const;

const dateOptions = [
  "Just now",
  "A minute ago",
  "1 hour ago",
  "Yesterday",
  "Feb 2, 2023",
] as const;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(42);
const randIndex = (n: number) => Math.floor(rng() * n);

// Create 50 dummy rows so we have 5 pages with 10 items each.
const orders: Order[] = (() => {
  const users = [
    { name: "Natali Craig", avatar: "/contacts/natali.png" },
    { name: "Kate Morrison", avatar: "/contacts/kate.png" },
    { name: "Drew Cano", avatar: "/contacts/drew.png" },
    { name: "Orlando Diggs", avatar: "/contacts/orlando.png" },
    { name: "Andi Lane", avatar: "/contacts/andi.png" },
  ];
  const projects = [
    "Landing Page",
    "CRM Admin pages",
    "Client Project",
    "Admin Dashboard",
    "App Landing Page",
  ];
  const addresses = [
    "Meadow Lane Oakland",
    "Larry San Francisco",
    "Bagwell Avenue Ocala",
    "Washburn Baton Rouge",
    "Nest Lane Olivette",
  ];
  const dates = dateOptions;
  const statuses: Order["status"][] = [...statusOptions];

  return Array.from({ length: 50 }, (_, i) => {
    const user = users[randIndex(users.length)];
    return {
      id: `#CM${(9801 + i).toString().padStart(4, "0")}`,
      user,
      project: projects[randIndex(projects.length)],
      address: addresses[randIndex(addresses.length)],
      date: dates[randIndex(dates.length)],
      status: statuses[randIndex(statuses.length)],
    } as Order;
  });
})();

// Unique rows (stable ids for selection regardless of sort/filter)
type Row = Order & { uid: number };
const baseRows: Row[] = orders.map((o, i) => ({ ...o, uid: i }));

function StatusPill({ status }: { status: Order["status"] }) {
  const map: Record<Order["status"], { dot: string; text: string }> = {
    "In Progress": { dot: "bg-[#95A4FC]", text: "text-[#8A8CD9]" },
    Complete: { dot: "bg-[#A1E3CB]", text: "text-[#4AA785]" },
    Pending: { dot: "bg-[#B1E3FF]", text: "text-[#59A8D4]" },
    Approved: { dot: "bg-[#FFE999]", text: "text-[#FFC555]" },
    Rejected: {
      dot: "bg-[#1C1C1C66] dark:bg-[#FFFFFF66]",
      text: "text-[#1C1C1C66] dark:text-[#FFFFFF66]",
    },
  };
  const c = map[status];
  return (
    <div className={`inline-flex items-center gap-2 text-xs ${c.text}`}>
      <span className={`inline-block size-2 rounded-full ${c.dot}`} />
      <span>{status}</span>
    </div>
  );
}

type SortKey = "id" | "user" | "project" | "address" | "date" | "status";
type SortDir = "asc" | "desc";
type StatusFilter = "ALL" | Order["status"];
type DateFilter = "ALL" | (typeof dateOptions)[number];

function parseDateValue(label: string): number {
  const now = Date.now();
  const lower = label.toLowerCase();
  if (lower === "just now") return now;
  if (lower.includes("minute")) return now - 60 * 1000;
  if (lower.includes("hour")) return now - 60 * 60 * 1000;
  if (lower === "yesterday") return now - 24 * 60 * 60 * 1000;
  const parsed = Date.parse(label);
  return isNaN(parsed) ? 0 : parsed;
}

function HeaderSort({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-normal dark:text-white/40 text-[#1C1C1C66] hover:text-foreground"
    >
      <span>{label}</span>
      {active ? (
        dir === "asc" ? (
          <ArrowUp className="size-3.5" />
        ) : (
          <ArrowDown className="size-3.5" />
        )
      ) : (
        <ArrowUpDown className="size-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

export default function OrderHistory() {
  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey>("date");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");
  const [page, setPage] = React.useState(1);
  const PAGE_SIZE = 10;

  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("ALL");
  const [dateFilter, setDateFilter] = React.useState<DateFilter>("ALL");

  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const filtered = React.useMemo(() => {
    const base = baseRows.filter(
      (r) =>
        (statusFilter === "ALL" || r.status === statusFilter) &&
        (dateFilter === "ALL" || r.date === dateFilter)
    );

    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((r) => {
      return (
        r.id.toLowerCase().includes(q) ||
        r.user.name.toLowerCase().includes(q) ||
        r.project.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
      );
    });
  }, [query, statusFilter, dateFilter]);

  const sorted = React.useMemo(() => {
    const getVal = (r: Row): string | number => {
      switch (sortKey) {
        case "id":
          return r.id.toLowerCase();
        case "user":
          return r.user.name.toLowerCase();
        case "project":
          return r.project.toLowerCase();
        case "address":
          return r.address.toLowerCase();
        case "status":
          return r.status.toLowerCase();
        case "date":
          return parseDateValue(r.date);
        default:
          return 0;
      }
    };
    const arr = [...filtered];
    arr.sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageStart = (page - 1) * PAGE_SIZE;
  const pageRows = sorted.slice(pageStart, pageStart + PAGE_SIZE);

  // Header checkbox computed state for current page
  const pageUids = pageRows.map((r) => r.uid);
  const allVisibleSelected =
    pageRows.length > 0 && pageUids.every((id) => selected.has(id));
  const someVisibleSelected =
    !allVisibleSelected && pageUids.some((id) => selected.has(id));

  const toggleSort = (key: SortKey) => {
    setPage(1);
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-base font-semibold">Order List</h1>

      <div className="flex items-center justify-between bg-[#F7F9FB] dark:bg-[#FFFFFF]/5 p-2 rounded-[8px]">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Add">
            <Plus className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Filter">
                <ListFilter className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Date</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={dateFilter}
                    onValueChange={(v) => {
                      setDateFilter(v as DateFilter);
                      setPage(1);
                    }}
                  >
                    <DropdownMenuRadioItem value="ALL">
                      All Dates
                    </DropdownMenuRadioItem>
                    {dateOptions.map((d) => (
                      <DropdownMenuRadioItem key={d} value={d}>
                        {d}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={statusFilter}
                    onValueChange={(v) => {
                      setStatusFilter(v as StatusFilter);
                      setPage(1);
                    }}
                  >
                    <DropdownMenuRadioItem value="ALL">
                      All Status
                    </DropdownMenuRadioItem>
                    {statusOptions.map((s) => (
                      <DropdownMenuRadioItem key={s} value={s}>
                        {s}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Sort"
            onClick={() => toggleSort(sortKey)}
            title={`Toggle ${sortKey} ${sortDir}`}
          >
            <ArrowUpDown className="size-4" />
          </Button>
        </div>

        <div className="relative w-48">
          <Search className="text-muted-foreground dark:text-white pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="h-8 rounded-[8px] bg-white/40 pl-9 pr-12 border border-[#1C1C1C]/10"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-transparent p-0 border border-transparent">
        <Table className="w-full">
          <TableHeader className="border-b">
            <TableRow className="text-xs">
              <TableHead className="w-8">
                <Checkbox
                  aria-label="Select all"
                  checked={
                    allVisibleSelected
                      ? true
                      : someVisibleSelected
                      ? "indeterminate"
                      : false
                  }
                  onCheckedChange={() => {
                    const ns = new Set(selected);
                    // If some or all visible are selected, clicking header should clear all visible.
                    if (someVisibleSelected || allVisibleSelected) {
                      pageUids.forEach((id) => ns.delete(id));
                    } else {
                      // If none are selected, clicking should select all visible.
                      pageUids.forEach((id) => ns.add(id));
                    }
                    setSelected(ns);
                  }}
                />
              </TableHead>
              <TableHead>
                <HeaderSort
                  label="Order ID"
                  active={sortKey === "id"}
                  dir={sortDir}
                  onClick={() => toggleSort("id")}
                />
              </TableHead>
              <TableHead>
                <HeaderSort
                  label="User"
                  active={sortKey === "user"}
                  dir={sortDir}
                  onClick={() => toggleSort("user")}
                />
              </TableHead>
              <TableHead className="dark:text-white/40">
                <HeaderSort
                  label="Project"
                  active={sortKey === "project"}
                  dir={sortDir}
                  onClick={() => toggleSort("project")}
                />
              </TableHead>
              <TableHead>
                <HeaderSort
                  label="Address"
                  active={sortKey === "address"}
                  dir={sortDir}
                  onClick={() => toggleSort("address")}
                />
              </TableHead>
              <TableHead>
                <HeaderSort
                  label="Date"
                  active={sortKey === "date"}
                  dir={sortDir}
                  onClick={() => toggleSort("date")}
                />
              </TableHead>
              <TableHead>
                <HeaderSort
                  label="Status"
                  active={sortKey === "status"}
                  dir={sortDir}
                  onClick={() => toggleSort("status")}
                />
              </TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((o) => (
              <TableRow
                key={o.uid}
                className="group hover:bg-[#F7F9FB] dark:hover:bg-[#FFFFFF]/5 border-none text-[#1C1C1C] dark:text-white"
              >
                <TableCell className="py-2">
                  <Checkbox
                    aria-label={`Select ${o.id}`}
                    checked={selected.has(o.uid)}
                    onCheckedChange={(c) => {
                      const ns = new Set(selected);
                      if (c) ns.add(o.uid);
                      else ns.delete(o.uid);
                      setSelected(ns);
                    }}
                    className={cn(
                      "opacity-0 transition-opacity group-hover:opacity-100",
                      "data-[state=checked]:opacity-100 data-[state=indeterminate]:opacity-100"
                    )}
                  />
                </TableCell>
                <TableCell className="py-2 text-xs">{o.id}</TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={o.user.avatar} alt={o.user.name} />
                      <AvatarFallback>
                        {o.user.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{o.user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2 text-xs">{o.project}</TableCell>
                <TableCell className="py-2 text-xs">{o.address}</TableCell>
                <TableCell className="py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-3.5 text-muted-foreground" />
                    <span>{o.date}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <StatusPill status={o.status} />
                </TableCell>
                <TableCell className="py-2 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Actions"
                    className={cn(
                      "opacity-0 transition-opacity group-hover:opacity-100"
                    )}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="pt-2">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <button
              aria-label="Previous page"
              className="flex h-7 w-7 items-center justify-center rounded-[8px] text-foreground hover:bg-[#1C1C1C0D]"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
            >
              <ChevronLeft className="size-4" />
            </button>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <button
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-[8px] transition-colors",
                  p === page
                    ? "bg-[#1C1C1C0D] text-foreground"
                    : "text-foreground hover:bg-[#1C1C1C0D]"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
              >
                {p}
              </button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <button
              aria-label="Next page"
              className="flex h-7 w-7 items-center justify-center rounded-[8px] text-foreground hover:bg-[#1C1C1C0D]"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(totalPages, p + 1));
              }}
            >
              <ChevronRight className="size-4" />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
