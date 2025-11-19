import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layout/ProtectedLayout";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/OtherPage/NotFound";

import Home from "./pages/Dashboard/Home";
import Vouchermanag from "./pages/VoucherManag/VoucherManag";
import UserManag from "./pages/UserManag";
import AdminPatient from "./pages/AdminPatient/AdminPatient";
import EditPatient from "./pages/AdminPatient/EditPatient/EditPatient";
import Edituser from "./pages/user/Edituser";
import Newuser from "./pages/user/Newuser";
import SettingsLayout from "./pages/Settings/SettingLayout";
import General from "./pages/Settings/General";
import Notifications from "./pages/Settings/Notifications";
import Security from "./pages/Settings/Security";
import System from "./pages/Settings/System";
import AnaLayout from "./pages/Analytics/AnaLayout";
import Overview from "./pages/Analytics/Overview";
import Revenue from "./pages/Analytics/Revenue";
import Consolations from "./pages/Analytics/Consolations";
import Prescription from "./pages/Analytics/Prescription";

import DocDashboard from "./pages/Doctor/Dashboard.tsx/DocDashboard/DocDashboard";
import PatientQueue from "./pages/Doctor/Dashboard.tsx/PatientQueue/PatientQueue";
import ConsoltantyHis from "./pages/Doctor/Dashboard.tsx/ConsoltantyHis/ConsoltantyHis";
import Patientrec from "./pages/Doctor/Dashboard.tsx/Patientrec/Patientrec";
import Shedule from "./pages/Doctor/Dashboard.tsx/Shedule/Shedule";
import Layout from "./pages/Doctor/Dashboard.tsx/Setting/Layout";
import Profile from "./pages/Doctor/Dashboard.tsx/Setting/Profile";

import VoucherPage from "./pages/Patient/Voucher/VoucherPage";
import Details from "./pages/Patient/Details/Details";
import Consolation from "./pages/Patient/Consolation/Consolation";
import Thankyou from "./pages/Patient/Thankyou/Thankyou";

import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Blank from "./pages/Blank";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>

          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedLayout allowedRoles={["admin"]}>
                <AppLayout />
              </ProtectedLayout>
            }
          >
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="voucher" element={<Vouchermanag />} />
            <Route path="patients" element={<AdminPatient />} />
            <Route path="users" element={<UserManag />} />
            <Route path="patient/edit-patient/:id" element={<EditPatient />} />
            <Route path="user/edit-user/:id" element={<Edituser />} />
            <Route path="user/create" element={<Newuser />} />

            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<General />} />
              <Route path="general" element={<General />} />
              <Route path="notification" element={<Notifications />} />
              <Route path="security" element={<Security />} />
              <Route path="system" element={<System />} />
            </Route>

            <Route path="analytics" element={<AnaLayout />}>
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="consolation" element={<Consolations />} />
              <Route path="system" element={<Prescription />} />
            </Route>

            {/* Admin 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Doctor Routes */}
          <Route
            path="/doctor/*"
            element={
              <ProtectedLayout allowedRoles={["doctor"]}>
                <AppLayout />
              </ProtectedLayout>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DocDashboard />} />
            <Route path="Patientqueue" element={<PatientQueue />} />
            <Route path="Consultancyhistory" element={<ConsoltantyHis />} />
            <Route path="Patientrecord" element={<Patientrec />} />
            <Route path="Schedule" element={<Shedule />} />

            <Route path="settings" element={<Layout />}>
              <Route index element={<General />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notification" element={<Notifications />} />
              <Route path="security" element={<Security />} />
              <Route path="system" element={<System />} />
            </Route>

            {/* Doctor 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Patient Routes */}
          <Route
            path="/patient/*"
            element={
              <ProtectedLayout allowedRoles={["patient"]}>
                <AppLayout />
              </ProtectedLayout>
            }
          >
            <Route index element={<VoucherPage />} />
            <Route path="patientdashboard" element={<VoucherPage />} />
            <Route path="details" element={<Details />} />
            <Route path="consultation-flow/consultation" element={<Consolation />} />
            <Route path="thankyoupage" element={<Thankyou />} />

            {/* Patient 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Common for everyone logged in */}
          <Route
            path="/"
            element={
              <ProtectedLayout allowedRoles={["admin", "doctor", "patient"]}>
                <AppLayout />
              </ProtectedLayout>
            }
          >
            <Route path="blank" element={<Blank />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>

          {/* Global 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
