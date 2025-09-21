import Navbar from "./components/layout/navbar";
import Sidebar from "./components/layout/sidebar";
import InfoSection from "./components/layout/info-section";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import DefaultDashboard from "./components/pages/default-dashboard";
import OrderHistory from "./components/pages/order-history";
import { useGlobalContext } from "./contexts/global-context";
import { useEffect, useState, type CSSProperties } from "react";

function App() {
  const { currentModule } = useGlobalContext();

  const [shownModule, setShownModule] = useState(currentModule);
  const [anim, setAnim] = useState<"in" | "out">("in");

  useEffect(() => {
    if (currentModule === shownModule) return;
    setAnim("out");
    const t = window.setTimeout(() => {
      setShownModule(currentModule);
      setAnim("in");
    }, 180);
    return () => window.clearTimeout(t);
  }, [currentModule, shownModule]);

  return (
    <>
      <SidebarProvider style={{ "--sidebar-width": "212px" } as CSSProperties}>
        <Sidebar />

        <SidebarInset className="pr-(--rightbar-width) transition-[padding] duration-200 ease-linear">
          <Navbar />
          <div
            className={`w-full px-4 py-4 md:px-6 md:py-6 transition-all duration-300 ease-out ${
              anim === "in"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            {shownModule === "order-history" ? (
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
