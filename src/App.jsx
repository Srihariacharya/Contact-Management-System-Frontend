import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";
import FollowUps from "./pages/FollowUps";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import ImportExport from "./pages/ImportExport";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<DashboardLayout />} >
        <Route index element ={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts/:id" element={<ContactDetail />} />
        <Route path="followups" element={<FollowUps />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="import-export" element={<ImportExport />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;