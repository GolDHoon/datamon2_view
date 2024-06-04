import React from "react";

// Material Dashboard 2 PRO React layouts
import Login from "layouts/login";
import Home from "layouts/home";
import UserList from "./layouts/developer/user/user-list";
import Checker from "./layouts/developer/checker";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/team-3.jpg";
import CustInfoList from "./layouts/customer/custList";

const routes = [
  {
    title: "DataMon2",
    name: "home",
    key: "home",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    route: "/",
    component: <Home />,
  },
  {
    title: "DataMon2 - Login",
    name: "login",
    key: "login",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    route: "/login",
    component: <Login />,
  },
  { type: "title", title: "고객정보", key: "title-고객정보" },
  {
    type: "collapse",
    name: "고객정보 리스트",
    key: "custInfoList",
    icon: <Icon fontSize="medium">U</Icon>,
    route: "/custInfo/list",
    component: <CustInfoList />,
    noCollapse: true,
  },
  { type: "title", title: "Developer", key: "title-developer" },
  {
    type: "collapse",
    name: "User",
    key: "User",
    icon: <Icon fontSize="medium">U</Icon>,
    route: "/developer/UserList",
    component: <UserList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Checker",
    key: "Checker",
    icon: <Icon fontSize="medium">U</Icon>,
    route: "/developer/checker",
    component: <Checker />,
    noCollapse: true,
  },
];

export default routes;
