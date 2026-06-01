import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Home } from "@/pages/Home";
import { ProductPage } from "@/pages/ProductPage";
import { ContactPage } from "@/pages/ContactPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { AdminPanel } from "@/pages/AdminPanel";
import { AdminGear } from "@/components/AdminGear";
import { init as initTracker } from "@/analytics/tracker";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/preview.html" component={Home} />
      <Route path="/shop/:id" component={ProductPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/:slug" component={ServiceDetailPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    initTracker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <AdminGear />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
