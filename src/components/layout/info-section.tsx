import React from "react";
import {
  Sidebar as UISidebar,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Bug,
  CheckCircle2,
  FileText,
  PlusCircle,
  Radio,
  Trash2,
  UserRound,
} from "lucide-react";

type Item = {
  icon?: React.ReactNode;
  title: string;
  time: string;
  avatarText?: string;
};

const notifications: Item[] = [
  {
    icon: <Bug className="size-4" />,
    title: "You have a bug that needs...",
    time: "Just now",
  },
  {
    icon: <UserRound className="size-4" />,
    title: "New user registered",
    time: "59 minutes ago",
  },
  {
    icon: <Bug className="size-4" />,
    title: "You have a bug that needs...",
    time: "12 hours ago",
  },
  {
    icon: <Radio className="size-4" />,
    title: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
  },
];

const activities: Item[] = [
  {
    icon: <Bug className="size-4" />,
    title: "You have a bug that needs...",
    time: "Just now",
  },
  {
    icon: <PlusCircle className="size-4" />,
    title: "Released a new version",
    time: "59 minutes ago",
  },
  {
    icon: <CheckCircle2 className="size-4" />,
    title: "Submitted a bug",
    time: "12 hours ago",
  },
  {
    icon: <FileText className="size-4" />,
    title: "Modified A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    icon: <Trash2 className="size-4" />,
    title: "Deleted a page in Project X",
    time: "Feb 2, 2023",
  },
];

const contacts = [
  { name: "Natali Craig", initials: "NC" },
  { name: "Drew Cano", initials: "DC" },
  { name: "Orlando Diggs", initials: "OD" },
  { name: "Andi Lane", initials: "AL" },
  { name: "Kate Morrison", initials: "KM" },
  { name: "Koray Okumus", initials: "KO" },
];

// Specialized row to match the Notifications visual style in the reference.
function NotificationRow({ item }: { item: Item }) {
  return (
    <li className="flex items-start gap-3">
      <div className="grid size-8 place-items-center rounded-xl bg-[#E9F2FA]">
        <div className="text-foreground/80 dark:text-[#1C1C1C]">
          {item.icon}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-normal dark:text-[#fff] text-[#1C1C1C]">
          {item.title}
        </div>
        <div className="text-[#1C1C1C66] dark:text-[#fff]/40 mt-0.5 text-xs font-normal">
          {item.time}
        </div>
      </div>
    </li>
  );
}

function ActivityRow({
  item,
  index,
  isLast,
}: {
  item: Item;
  index: number;
  isLast: boolean;
}) {
  const src = `/activities/mascot-${index + 1}.png`;
  return (
    <li className="relative flex items-start gap-3">
      <div className="relative">
        <img src={src} alt="" className="size-6 rounded-full object-cover" />
        {!isLast && (
          <span className="absolute left-1/2 top-8 -translate-x-1/2 h-5 w-px bg-muted-foreground/30" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-normal text-[#1C1C1C] dark:text-white">
          {item.title}
        </div>
        <div className="text-[#1C1C1C66] dark:text-[#fff]/40 mt-0.5 text-xs font-normal">
          {item.time}
        </div>
      </div>
    </li>
  );
}

export default function InfoSection() {
  const { toggleSidebar, open, isMobile } = useSidebar();

  React.useEffect(() => {
    const handler = () => toggleSidebar();
    window.addEventListener("toggle-right-sidebar", handler);
    return () => window.removeEventListener("toggle-right-sidebar", handler);
  }, [toggleSidebar]);

  // Expose the right sidebar width to the main layout so it can reserve space when open.
  React.useEffect(() => {
    const width = isMobile ? "0px" : "280px";
    document.documentElement.style.setProperty(
      "--rightbar-width",
      open ? width : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--rightbar-width", "0px");
    };
  }, [open, isMobile]);

  return (
    <UISidebar side="right" collapsible="offcanvas" className="border-l">
      <SidebarContent className="p-6 flex flex-col gap-6">
        <section>
          <h2 className="text-sm font-semibold">Notifications</h2>
          <ul className="mt-4 space-y-6">
            {notifications.map((n, i) => (
              <NotificationRow key={i} item={n} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold">Activities</h2>
          <ul className="mt-4 space-y-5">
            {activities.map((a, i) => (
              <ActivityRow
                key={i}
                item={a}
                index={i}
                isLast={i === activities.length - 1}
              />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold">Contacts</h2>
          <ul className="mt-4 space-y-4">
            {contacts.map((c) => {
              const first = c.name.split(" ")[0].toLowerCase();
              const src = `/contacts/${first}.png`;
              return (
                <li key={c.name} className="flex items-center gap-3">
                  <img
                    src={src}
                    alt={c.name}
                    className="size-6 rounded-full object-cover"
                  />
                  <div className="text-sm font-normal">{c.name}</div>
                </li>
              );
            })}
          </ul>
        </section>
      </SidebarContent>
    </UISidebar>
  );
}
