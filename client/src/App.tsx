import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ContentDetails from "@/pages/content";
import LevelView from "@/pages/level";
import MyList from "@/pages/my-list";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/content/:id" component={ContentDetails} />
      <Route path="/level/:levelName" component={LevelView} />
      <Route path="/my-list" component={MyList} />
      {/* Route for search if needed later */}
      <Route path="/search" component={() => {
        window.location.href = '/'; 
        return null;
      }} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;