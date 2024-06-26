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
import { getConst } from "./common/common";
import UserInfoListByMaster from "./layouts/user/userListByMaster";
import UserInfoListByMemeber from "./layouts/user/userListByMember";
import AuthMenagement from "./layouts/user/auth";

const routes = [
  {
    title: "DataMon2",
    name: "home",
    key: "home",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    route: "/",
    component: <Home />,
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("INME"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CLME"),
      getConst("AAME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
  {
    title: "DataMon2 - Login",
    name: "login",
    key: "login",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    route: "/login",
    component: <Login />,
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("INME"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CLME"),
      getConst("AAME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
  {
    type: "title",
    title: "유저 정보",
    key: "title-유저정보",
    auth: [
      getConst("MAST"),
      getConst("INME"),
      getConst("DEVL"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CRAC"),
    ],
  },
  {
    type: "collapse",
    name: "유저정보 목록(마스터)",
    key: "useInfoListByCompany",
    icon: <Icon fontSize="medium">U</Icon>,
    route: "/master/use-info/list",
    component: <UserInfoListByMaster />,
    noCollapse: true,
    auth: [getConst("MAST"), getConst("INME"), getConst("DEVL")],
  },
  {
    type: "collapse",
    name: "유저정보 목록",
    key: "useInfoListByMember",
    icon: <Icon fontSize="medium">U</Icon>,
    route: "/use-info/list",
    component: <UserInfoListByMemeber />,
    noCollapse: true,
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("INME"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CLME"),
      getConst("AAME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
  {
    type: "collapse",
    name: "유저 권한 관리",
    key: "useAuthMenagement",
    icon: <Icon fontSize="medium">U</Icon>,
    route: "/use-info/auth",
    component: <AuthMenagement />,
    noCollapse: true,
    auth: [
      getConst("MAST"),
      getConst("INME"),
      getConst("DEVL"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CRAC"),
    ],
  },
  {
    type: "title",
    title: "고객 정보",
    key: "title-고객정보",
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("INME"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CLME"),
      getConst("AAME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
  {
    type: "collapse",
    name: "고객정보 목록",
    key: "custInfoList",
    icon: <Icon fontSize="medium">C</Icon>,
    route: "/cust-info/list",
    component: <CustInfoList />,
    noCollapse: true,
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("INME"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CLME"),
      getConst("AAME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
  {
    type: "title",
    title: "고객DB 정보",
    key: "title-고객DB 정보",
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("INME"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CLME"),
      getConst("AAME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
  {
    type: "collapse",
    name: "랜딩페이지 관리",
    key: "landingPageList",
    icon: <Icon fontSize="medium">C</Icon>,
    route: "/cust-db/landing-page/list",
    component: <CustInfoList />,
    noCollapse: true,
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("INME"),
      getConst("CLNT"),
      getConst("ADAC"),
      getConst("CLME"),
      getConst("AAME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
];

export default routes;
