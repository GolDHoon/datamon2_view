import DrivenModal from "../../../../../components/DrivenModal";
import PropTypes from "prop-types";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import { useEffect, useState } from "react";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../../../components/MDTypography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { styled } from "@mui/material/styles";

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

export default function BlockKeywordModal(props) {
  const { open, handleClose, setAlertColor, setAlertText, setUseAlert, code } = props;
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [keyword, setKeyword] = useState("");
  const [keywordList, setKeywordList] = useState([]);

  const getList = () => {
    serverCommunicationUtil("main", "axioGet", "/landingPageManage/blockedKeywordList", {
      lpgeCode: code,
    })
      .then((result) => {
        setKeywordList(result);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const createHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/createBlockedKeyword", {
      lpgeCode: code,
      keyword: keyword,
    })
      .then((result) => {
        getList();
      })
      .catch((error) => {
        console.log("");
      });
  };

  const deleteHandler = (keyword) => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/deleteBlockedKeyword", {
      lpgeCode: code,
      keyword: keyword,
    })
      .then((result) => {
        getList();
      })
      .catch((error) => {
        console.log("");
      });
  };

  return (
    <DrivenModal open={open}>
      <MDBox mt={1.625}>
        <MDBox>
          <MDTypography variant="h5" style={{ "margin-bottom": "5%" }}>
            차단 키워드 설정
          </MDTypography>
        </MDBox>
        <MDBox style={{ position: "relative" }}>
          <TextField
            label="차단 키워드"
            id="standard-size-small"
            variant="standard"
            value={keyword}
            fullWidth
            placeholder="등록하실 차단 키워드를 입력해 주세요."
            style={textfieldStyle}
            onChange={(event) => {
              setKeyword(event.target.value);
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
              {keywordList.map((keyword, index) => (
                <ListItem
                  key={index}
                  style={listStyle}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteHandler(keyword);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "15px" }}
                    id="isText"
                    primary={`${keyword}`}
                    secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </MDBox>
      <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
        <MDButton
          variant="gradient"
          color="info"
          style={{ margin: "0 2% 0 0" }}
          onClick={handleClose}
        >
          완료
        </MDButton>
      </MDBox>
    </DrivenModal>
  );
}
BlockKeywordModal.defaultProps = {
  open: false,
  handleClose: () => {},
};

BlockKeywordModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setAlertColor: PropTypes.func,
  setAlertText: PropTypes.func,
  setUseAlert: PropTypes.func,
  code: PropTypes.string,
};
