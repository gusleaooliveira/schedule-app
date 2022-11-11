import React, { useState } from "react";
import { Dashboard, Expenses, Login, Revenues, Routes } from "./pages";
import "dayjs/locale/pt-br";
import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconDashboard,
  IconHome,
  IconCash,
  IconCurrencyReal,
} from "@tabler/icons";
import {
  BrowserRouter,
  Routes as RoutesBrowser,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
