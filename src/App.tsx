import Navbar from "./components/layout/navbar";
import Sidebar from "./components/layout/sidebar";
import InfoSection from "./components/layout/info-section";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import DefaultDashboard from "./components/pages/default-dashboard";
import OrderHistory from "./components/pages/order-history";
import { useGlobalContext } from "./contexts/global-context";
import type { CSSProperties } from "react";

function App() {
  const { currentModule } = useGlobalContext();
  return (
    <>
      <SidebarProvider style={{ "--sidebar-width": "212px" } as CSSProperties}>
        <Sidebar />

        <SidebarInset className="pr-(--rightbar-width) transition-[padding] duration-200 ease-linear">
          <Navbar />
          <div className="w-full px-4 py-4 md:px-6 md:py-6">
            {currentModule === "order-history" ? (
              <OrderHistory />
            ) : (
              <DefaultDashboard />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* Mount the right info sidebar in its own provider outside the main flex row
          so it doesn't reserve any inline width for a gap and the middle content can be full width. */}
      <SidebarProvider
        style={{ "--sidebar-width": "280px" } as CSSProperties}
        className="fixed inset-0 pointer-events-none [&_[data-slot=sidebar-container]]:pointer-events-auto"
      >
        <InfoSection />
      </SidebarProvider>
    </>
  );
}

export default App;
