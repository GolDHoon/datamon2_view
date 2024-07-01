import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import * as React from "react";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import { useEffect, useState } from "react";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import PropTypes from "prop-types";
import IdxCell from "../IdxCell";

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

const registStyle = {
  border: "1px solid dimgray",
  "border-radius": "7px",
  position: "absolute",
  top: "20%",
  right: "0",
  transform: "translateY(-50%)",
};

const textfieldStyle = {
  "padding-bottom": "3%",
  "font-size": "2vw",
};

export default function BlockedIpInfo({ code }) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [ip, setIp] = useState("");
  const [ipList, setIpList] = useState([]);

  const getList = () => {
    serverCommunicationUtil("main", "axioGet", "/landingPageManage/blockedIpList", {
      lpgeCode: code,
    })
      .then((result) => {
        setIpList(result);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const createHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/createBlockedIp", {
      lpgeCode: code,
      blockIp: ip,
    })
      .then((result) => {
        getList();
      })
      .catch((error) => {
        console.log("");
      });
  };

  const deleteHandler = (ip) => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/deleteBlockedIp", {
      lpgeCode: code,
      blockIp: ip,
    })
      .then((result) => {
        getList();
      })
      .catch((error) => {
        console.log("");
      });
  };

  return (
    <MDBox mt={1.625}>
      <MDBox>
        <MDTypography variant="h5" style={{ "margin-bottom": "5%" }}>
          차단 IP 설정
        </MDTypography>
      </MDBox>
      <MDBox style={{ position: "relative" }}>
        <TextField
          label="차단 IP"
          id="standard-size-small"
          variant="standard"
          value={ip}
          fullWidth
          placeholder="등록하실 차단 IP를 입력해 주세요."
          style={textfieldStyle}
          onChange={(event) => {
            setIp(event.target.value);
          }}
          focused
        />
        <MDButton style={registStyle} onClick={createHandler}>
          등록
        </MDButton>
      </MDBox>
      <Grid item style={gridStyle} id="isGrid">
        <Demo style={{ background: "none" }}>
          <List dense={dense}>
            {ipList.map((ip, index) => (
              <ListItem
                key={index}
                style={listStyle}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      deleteHandler(ip);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primaryTypographyProps={{ fontSize: "15px" }}
                  id="isText"
                  primary={`${ip}`}
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </MDBox>
  );
}
BlockedIpInfo.propTypes = {
  code: PropTypes.string.isRequired,
};
