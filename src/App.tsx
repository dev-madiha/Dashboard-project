import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Vouchermanag from "./pages/VoucherManag/VoucherManag";
import UserManag from "./pages/UserManag";
import General from "./pages/Settings/General";
import Notifications from "./pages/Settings/Notifications";
import Security from "./pages/Settings/Security";

import System from "./pages/Settings/System";
import AnaLayout from "./pages/Analytics/AnaLayout";
import Overview from "./pages/Analytics/Overview";
import Revenue from "./pages/Analytics/Revenue";
import Consolations from "./pages/Analytics/Consolations";
import Prescription from "./pages/Analytics/Prescription";
import ProtectedRoute from "./components/ProtectedRoute";
import Edituser from "./pages/user/Edituser";

import Newuser from "./pages/user/Newuser";
import Patientrec from "./pages/Doctor/Dashboard.tsx/Patientrec/Patientrec";
import Shedule from "./pages/Doctor/Dashboard.tsx/Shedule/Shedule";
import ConsoltantyHis from "./pages/Doctor/Dashboard.tsx/ConsoltantyHis/ConsoltantyHis";
import DocDashboard from "./pages/Doctor/Dashboard.tsx/DocDashboard/DocDashboard";
import PatientQueue from "./pages/Doctor/Dashboard.tsx/PatientQueue/PatientQueue";
import Layout from "./pages/Doctor/Dashboard.tsx/Setting/Layout";
import SettingsLayout from "./pages/Settings/SettingLayout";
import Profile from "./pages/Doctor/Dashboard.tsx/Setting/Profile";

import VoucherPage from "./pages/Patient/Voucher/VoucherPage";
import Details from "./pages/Patient/Details/Details";
import Consolation from "./pages/Patient/Consolation/Consolation";
import PatientLayout from "./pages/Patient/PatientLayout/PatientLayout";
import Thankyou from "./pages/Patient/Thankyou/Thankyou";
import AdminPatient from "./pages/AdminPatient/AdminPatient";
import EditPatient from "./pages/AdminPatient/EditPatient/EditPatient";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />

        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />
            <Route index path="admin/dashboard" element={<Home />} />
            <Route path="admin/users" element={<UserManag />} />
            <Route path="admin/voucher" element={<Vouchermanag />} />
            <Route path="admin/patients" element={<AdminPatient />} />
            <Route
              path="admin/patient/edit-patient/:id"
              element={<EditPatient />}
            />{" "}
             <Route
              path="admin/user/edit-user/:id"
              element={<Edituser />}
            />{" "}
            <Route path="admin/user/create" element={<Newuser />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="admin/settings" element={<SettingsLayout />}>
              <Route index element={<General />} />
              <Route path="general" element={<General />} />
              <Route path="notification" element={<Notifications />} />
              <Route path="security" element={<Security />} />
              <Route path="system" element={<System />} />
            </Route>
            <Route path="admin/analytics" element={<AnaLayout />}>
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="consolation" element={<Consolations />} />
              <Route path="system" element={<Prescription />} />
            </Route>
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
            <Route index path="doctor/dashboard" element={<DocDashboard />} />
            <Route
              index
              path="doctor/Patientqueue"
              element={<PatientQueue />}
            />
            <Route
              index
              path="doctor/Consultancyhistory"
              element={<ConsoltantyHis />}
            />
            <Route index path="doctor/patientrecord" element={<Patientrec />} />
            <Route index path="doctor/Schedule" element={<Shedule />} />
            <Route path="doctor/settings" element={<Layout />}>
              <Route index element={<General />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notification" element={<Notifications />} />
              <Route path="security" element={<Security />} />
              <Route path="system" element={<System />} />
            </Route>{" "}
            <Route path="" element={<PatientLayout />}>
              <Route
                index
                path="patient/patientdashboard"
                element={<VoucherPage />}
              />
              <Route index path="details" element={<Details />} />
              <Route
                index
                path="/consultation-flow/consultation"
                element={<Consolation />}
              />
            </Route>
            <Route index path="patient/thankyoupage" element={<Thankyou />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
