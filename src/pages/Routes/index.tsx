import React, { useState } from "react";
import { Dashboard, Expenses, Login, Revenues } from "../index";
import "dayjs/locale/pt-br";
import {
  ActionIcon,
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

const Routes = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const location = useLocation();

  const lista = [
    {
      label: "Dashboard",
      path: "/dashboard",
      element: <Dashboard />,
      icon: <IconHome size={16} />,
    },
    {
      label: "Expenses",
      path: "/expenses",
      element: <Expenses />,
      icon: <IconCash size={16} />,
    },
    {
      label: "Revenues",
      path: "/revenues",
      element: <Revenues />,
      icon: <IconCurrencyReal size={16} />,
    },
  ];

  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section> </Navbar.Section>
            <Navbar.Section grow mx="-xs" px="xs">
              {lista.map((chave) => {
                return (
                  <NavLink
                    label={chave.label}
                    component={Link}
                    to={chave.path}
                    active={location.pathname === chave.path}
                    icon={chave.icon}
                  />
                );
              })}
            </Navbar.Section>
            <Navbar.Section> </Navbar.Section>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            <Text align="center"> Criado por Gustavo Leão e Érik</Text>
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <ActionIcon>
                <IconCalendarEvent size={16} />
              </ActionIcon>
              <Text>Schedule Your Month</Text>
            </div>
          </Header>
        }
      >
        <RoutesBrowser>
          {lista.map((chave) => {
            return <Route path={chave.path} element={chave.element} />;
          })}
        </RoutesBrowser>
      </AppShell>
    </>
  );
};

export default Routes;
