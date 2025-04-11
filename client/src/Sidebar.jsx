import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/sidebar-components/app-sidebar";

// import ProtectedRoute from "@/utils/ProtectedRoute"

import { Routes, Route } from "react-router-dom";
import UserHome from "./components/User/User-home";
import TrainHome from "./components/User/train/train-home";
import ShowTickets from "./components/User/train/ticket/show-tickets";
import CheckTicket from "./components/Employee/check-ticket";
import EmpHome from "./components/Employee/emp-home";
import AdminDashboard from "./components/Admin/adminhome";
import AddTrainForm from "./components/Admin/add train/add-train-form";
import AddStationsForm from "./components/Admin/add train/add-staion-form";
import AdminTrainPage from "./components/Admin/alltrain/AdminTrainPage";
import AdminAssignWorkPage from "./components/Admin/employee/AdminAssignWorkPage";

export default function SideBar() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Welcome to Railway Reservation
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Make Your Travle Easy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div>
          <Routes>
            {/* <Route element={<ProtectedRoute />} > */}
              <Route path="/user-home" element={<UserHome />} />
              <Route path="/user-trainhome" element={<TrainHome />} />
              <Route path="/user-showtickets" element={<ShowTickets />} />
              <Route path="/emp-checktickets" element={<CheckTicket />} />
              <Route path="/emp-home" element={<EmpHome />} />
              <Route path="/admin-home" element={<AdminDashboard />} />
              <Route path="/admin-addtrainform" element={<AddTrainForm />} />
              <Route path="/admin-stationform" element={<AddStationsForm />} />
              <Route path="/admin-trainpage" element={<AdminTrainPage />} />
              <Route path="/admin-addwork" element={<AdminAssignWorkPage />} />
            {/* </Route> */}
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
