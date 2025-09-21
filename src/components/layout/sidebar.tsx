import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  ChevronRightIcon,
  ChartPie,
  ShoppingBag,
  Folder,
  BookOpen,
  SquareUser,
  Contact,
  BookText,
  UsersRound,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import profile from "/profile.png";
import { useGlobalContext } from "@/contexts/global-context";

function Brand() {
  return (
    <div className="flex items-center gap-2 mb-4 px-2">
      <div className="size-6 rounded-full overflow-hidden">
        <img src={profile} alt="profile" className="size-full object-cover" />
      </div>
      <span className="font-normal text-sm group-data-[collapsible=icon]:hidden">
        ByeWind
      </span>
    </div>
  );
}

export default function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(true);
  const { currentModule, setCurrentModule } = useGlobalContext();
  return (
    <UISidebar
      collapsible="icon"
      className="py-5 px-4 group-data-[collapsible=icon]:!px-1"
    >
      <SidebarHeader>
        <Brand />
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-4">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <div className="flex gap-4 px-2">
            <Button
              variant="ghost"
              className="h-8 px-2 font-normal rounded-[8px] text-sm dark:text-[#fff]/40 text-[#1C1C1C66] hover:text-[#1C1C1C66] hover:bg-[#1C1C1C]/5 dark:hover:bg-[#fff]/40"
            >
              Favorites
            </Button>
            <Button
              variant="ghost"
              className="h-8 px-2 font-normal rounded-[8px] text-sm dark:text-[#fff]/40 text-[#1C1C1C33] hover:text-[#1C1C1C33] hover:bg-[#1C1C1C]/5 dark:hover:bg-[#fff]/40"
            >
              Recently
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              <ul className="list-disc pl-6 marker:text-[#1C1C1C33] dark:marker:text-white mt-2 mx-2 my-1">
                <li className="text-sm text-[#1C1C1C] dark:text-white px-2 py-1">
                  Overview
                </li>
                <li className="text-sm text-[#1C1C1C] dark:text-white px-2 py-1">
                  Projects
                </li>
              </ul>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 group-data-[collapsible=icon]:pl-1">
          <SidebarGroupLabel className="font-normal text-sm text-[#1C1C1C]/40">
            Dashboards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentModule !== "order-history"}
                  onClick={() => setCurrentModule("")}
                  tooltip="Default"
                  className="pl-7 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChartPie />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Default
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="eCommerce"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon className="size-4 group-data-[collapsible=icon]:hidden" />
                  <ShoppingBag />
                  <span className="group-data-[collapsible=icon]:hidden">
                    eCommerce
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Projects"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon className="size-4 group-data-[collapsible=icon]:hidden" />
                  <Folder />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Projects
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Online Courses"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon className="size-4  group-data-[collapsible=icon]:hidden" />
                  <BookOpen />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Online Courses
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 group-data-[collapsible=icon]:pl-1">
          <SidebarGroupLabel className="font-normal text-sm text-[#1C1C1C]/40">
            Pages
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setProfileOpen((o) => !o)}
                  tooltip="User Profile"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon
                    className={cn(
                      "size-4 transition-transform  group-data-[collapsible=icon]:hidden",
                      profileOpen && "rotate-90"
                    )}
                  />
                  <SquareUser />
                  <span className="group-data-[collapsible=icon]:hidden">
                    User Profile
                  </span>
                </SidebarMenuButton>
                {profileOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a>Overview</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a>Projects</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a>Campaigns</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a>Documents</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a>Followers</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Account"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon className="size-4  group-data-[collapsible=icon]:hidden" />
                  <Contact />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Account
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Corporate"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon className="size-4  group-data-[collapsible=icon]:hidden" />

                  <UsersRound />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Corporate
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Blog"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon className="size-4  group-data-[collapsible=icon]:hidden" />
                  <BookText />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Blog
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Social"
                  className="pl-1 group-data-[collapsible=icon]:pl-2 group-data-[collapsible=icon]:justify-center"
                >
                  <ChevronRightIcon className="size-4  group-data-[collapsible=icon]:hidden" />
                  <MessageCircle />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Social
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </UISidebar>
  );
}
