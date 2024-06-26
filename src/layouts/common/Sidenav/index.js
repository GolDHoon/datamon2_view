import { useEffect, useState } from "react";

// react-router-dom components
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import List from "@mui/material/List";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import SidenavCollapse from "layouts/common/Sidenav/SidenavCollapse";
import SidenavItem from "layouts/common/Sidenav/SidenavItem";
import SidenavList from "layouts/common/Sidenav/SidenavList";

// Custom styles for the Sidenav
import SidenavRoot from "layouts/common/Sidenav/SidenavRoot";
import sidenavLogoLabel from "layouts/common/Sidenav/styles/sidenav";

// Material Dashboard 2 PRO React context
import Autocomplete from "@mui/material/Autocomplete";
import {
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  useMaterialUIController,
} from "context";
import { getSessionStorage, setSessionStorage } from "../../../common/common";
import { serverCommunicationUtil } from "../../../common/util/serverCommunicationUtil";
import MDInput from "../../../components/MDInput";

import logo from "assets/images/logo.png";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [userType, setUserType] = useState("");
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const items = pathname.split("/").slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];
  const [custDBList, setCustDBList] = useState([]);
  const [selectedCustDB, setSelectedCustDB] = useState(getSessionStorage("selectedCustDB")?.DBname);
  const navigate = useNavigate();

  const handleAutocompleteChange = (event, newValue) => {
    const matchingIndex = custDBList.findIndex((item) => item.DBname === newValue);
    setSessionStorage("selectedCustDB", custDBList[matchingIndex]);
    setSelectedCustDB(newValue);
    navigate("/");
  };

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);
  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);

    serverCommunicationUtil("main", "axioGet", "/common/DBList", {})
      .then((result) => {
        setCustDBList(result);
        setSessionStorage("custDBList", result.rows);
      })
      .catch((error) => {
        console.log("");
      });

    serverCommunicationUtil("main", "axioGet", "/common/routingInfo", {})
      .then((result) => {
        setUserType(result.userType);
      })
      .catch((error) => {
        console.log("");
      });
  }, [setUserType]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      )
    );

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            active={key === itemParentName ? "isParent" : false}
            open={openNestedCollapse === key}
            onClick={({ currentTarget }) =>
              openNestedCollapse === key && currentTarget.classList.contains("MuiListItem-root")
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(key)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem color={color} name={name} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem color={color} name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route, auth }) => {
      if (auth.includes(userType)) {
        let returnValue;
        if (type === "collapse") {
          if (href) {
            returnValue = (
              <Link
                href={href}
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                />
              </Link>
            );
          } else if (noCollapse && route) {
            returnValue = (
              <NavLink to={route} key={key}>
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  noCollapse={noCollapse}
                  active={key === collapseName}
                >
                  {collapse ? renderCollapse(collapse) : null}
                </SidenavCollapse>
              </NavLink>
            );
          } else {
            returnValue = (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                active={key === collapseName}
                open={openCollapse === key}
                onClick={() =>
                  openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            );
          }
        } else if (type === "title") {
          returnValue = (
            <MDTypography
              key={key}
              color={textColor}
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              pl={3}
              mt={2}
              mb={1}
              ml={1}
            >
              {title}
            </MDTypography>
          );
        } else if (type === "divider") {
          returnValue = (
            <Divider
              key={key}
              light={
                (!darkMode && !whiteSidenav && !transparentSidenav) ||
                (darkMode && !transparentSidenav && whiteSidenav)
              }
            />
          );
        }

        return returnValue;
      }
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <MDBox
              component="img"
              src={logo}
              alt="logo"
              width="1.5rem"
              style={{ "margin-right": "3%" }}
            />
          )}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox
          style={{ width: "100%", padding: "0", paddingTop: "10%" }}
          p={3}
          sx={{ cursor: "pointer" }}
          color={textColor}
        >
          <Autocomplete
            disablePortal
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#fff",
              },
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
            value={selectedCustDB}
            options={custDBList.map((item) => item.DBName)}
            onChange={handleAutocompleteChange}
            renderInput={(params) => <MDInput {...params} label="고객DB" color={textColor} />}
          />
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
