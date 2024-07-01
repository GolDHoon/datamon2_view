import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import { useEffect, useState } from "react";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const listStyle = {
  padding: "1vw 0",
  "border-bottom": "1px solid lightgray",
  background: "#fff",
  width: "100%",
};

const gridStyle = {
  height: "25vw",
  overflowY: "scroll",
  overflowX: "hidden",
  width: "100%",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

// eslint-disable-next-line react/prop-types
export default function MemberInvite({ selectedCdbt, saveUserList, setSaveUserList }) {
  // const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [userList, setUserList] = useState([]);
  if (selectedCdbt === "") {
    return null;
  }
  const getList = () => {
    serverCommunicationUtil("main", "axioPost", "/userAuth/getUserListByCopanyAndCdbt", {
      cdbtLowCode: selectedCdbt,
    })
      .then((result) => {
        setUserList(result);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const handleSelectList = (event, idx) => {
    let idxList = [...saveUserList];
    if (event.target.checked) {
      idxList.push(idx);
    } else {
      idxList = idxList.filter((item) => item !== idx);
    }
    setSaveUserList(idxList);
  };

  useEffect(() => {
    getList();
  }, [setUserList]);

  return (
    <MDBox mt={1.625}>
      <MDBox>
        <MDTypography variant="h5" style={{ "margin-bottom": "5%" }}>
          유저 초대
        </MDTypography>
      </MDBox>
      <Grid item style={gridStyle} id="isGrid">
        <Demo style={{ background: "none" }}>
          <List>
            <ListItem
              style={listStyle}
              secondaryAction={
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                  id="isText"
                  primary="선택"
                  secondary={secondary ? "Secondary text" : null}
                />
              }
            >
              <MDBox display={"flex"}>
                <ListItemText
                  primaryTypographyProps={{ fontSize: "15px", fontWeight: "bold" }}
                  id="isText"
                  primary="계정"
                  secondary={secondary ? "Secondary text" : null}
                  sx={{ width: "100px", textAlign: "center" }}
                />
                <ListItemText
                  primaryTypographyProps={{ fontSize: "15px", fontWeight: "bold" }}
                  id="isText"
                  primary="이름"
                  secondary={secondary ? "Secondary text" : null}
                  sx={{ width: "100px", textAlign: "center" }}
                />
              </MDBox>
            </ListItem>
          </List>
          <List>
            {userList.map((user) => (
              <ListItem
                key={user.Idx}
                style={listStyle}
                secondaryAction={
                  <Checkbox
                    onChange={(event) => {
                      handleSelectList(event, user.Idx);
                    }}
                  />
                }
              >
                <MDBox display={"flex"}>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px", fontWeight: "bold" }}
                    primary={user.Id}
                    secondary={secondary ? "Secondary text" : null}
                    sx={{ width: "100px", textAlign: "center" }}
                  />
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    primary={user.name}
                    secondary={secondary ? "Secondary text" : null}
                    sx={{ width: "100px", textAlign: "center" }}
                  />
                </MDBox>
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </MDBox>
  );

  MemberInvite.propTypes = {
    selectedCdbt: PropTypes.string,
  };
}
