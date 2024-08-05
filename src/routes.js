// Material Dashboard 2 PRO React layouts
import Home from "layouts/home";
import Login from "layouts/login";

// Material Dashboard 2 PRO React components

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import { getConst } from "./common/common";
import CustInfoList from "./layouts/customer/custList";
import LandingPageManagement from "./layouts/landingPage/manage";
import AuthMenagement from "./layouts/user/auth";
import UserInfoListByMaster from "./layouts/user/userListByMaster";
import UserInfoListByMemeber from "./layouts/user/userListByMember";
import MyPage from "./layouts/myPage";
import OutBoundDistribution from "./layouts/outbound/distribution";

const routes = [
  {
    title: "데이터몬",
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
    title: "데이터몬 - Login",
    name: "login",
    key: "login",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    route: ":companyId/login",
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
    title: "데이터몬 - MyPage",
    name: "MyPage",
    key: "MyPage",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    route: "/myPage",
    component: <MyPage />,
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
    icon: <Icon fontSize="medium">person</Icon>,
    route: "/master/user-info/list",
    component: <UserInfoListByMaster />,
    noCollapse: true,
    auth: [getConst("MAST"), getConst("INME"), getConst("DEVL")],
  },
  {
    type: "collapse",
    name: "유저정보 목록",
    key: "useInfoListByMember",
    icon: <Icon fontSize="medium">person</Icon>,
    route: "/user-info/list",
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
    icon: <Icon fontSize="medium">https</Icon>,
    route: "/user-info/auth",
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
    icon: <Icon fontSize="medium">person</Icon>,
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
    icon: <Icon fontSize="medium">newspaper</Icon>,
    route: "/cust-db/landing-page",
    component: <LandingPageManagement />,
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
    title: "Call 관리",
    key: "title-Call 정보",
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("CLNT"),
      getConst("CLME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
  {
    type: "collapse",
    name: "outbound 분배",
    key: "outboundDistribution",
    icon: <Icon fontSize="medium">share</Icon>,
    route: "/call/outbound/distribution",
    component: <OutBoundDistribution />,
    noCollapse: true,
    auth: [
      getConst("MAST"),
      getConst("DEVL"),
      getConst("CLNT"),
      getConst("CLME"),
      getConst("CRAC"),
      getConst("CAME"),
    ],
  },
];

export default routes;
