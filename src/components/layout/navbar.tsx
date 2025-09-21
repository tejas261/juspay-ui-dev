import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, PanelRight, History, Search, Star, Sun } from "lucide-react";
import { useGlobalContext } from "@/contexts/global-context";

const Navbar = () => {
  function toggle() {
    const root = document.documentElement;
    root.classList.toggle("dark");
  }
  const { setCurrentModule, currentModule } = useGlobalContext();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="flex h-[68px] items-center gap-2 px-4 md:px-6">
        <div className="flex items-center gap-1.5">
          <SidebarTrigger />
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Star className="size-4" />
          </Button>
          <div className="hidden sm:block">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentModule("");
                    }}
                  >
                    Dashboards
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Default</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="flex-1" />

        <div className="ml-auto flex items-center gap-1.5 ">
          <div className="relative mr-2 hidden lg:block w-40">
            <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search"
              className="h-7 rounded-[8px] bg-[#1C1C1C0D] pl-9 pr-12 border-0"
            />
            <div className="text-muted-foreground absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] md:flex">
              <kbd className="font-sans">⌘</kbd>
              <span>/</span>
            </div>
          </div>
          <Button
            onClick={toggle}
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
          >
            <Sun className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label="Order History"
            onClick={() => {
              if (currentModule == "order-history") {
                setCurrentModule("");
              } else {
                setCurrentModule("order-history");
              }
            }}
          >
            <History className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex sm:hidden"
            aria-label="Order History"
            onClick={() => setCurrentModule("order-history")}
          >
            <History className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:inline-flex"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle right sidebar"
            onClick={() =>
              window.dispatchEvent(new Event("toggle-right-sidebar"))
            }
          >
            <PanelRight className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
