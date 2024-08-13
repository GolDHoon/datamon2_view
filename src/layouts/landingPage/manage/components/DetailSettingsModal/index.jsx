import DrivenModal from "../../../../../components/DrivenModal";
import PropTypes from "prop-types";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import { useEffect, useState } from "react";
import DrivenInput from "../../../../../components/DrivenInput";
import MDTypography from "../../../../../components/MDTypography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function DetailSettingsModal(props) {
  const { open, handleClose, setAlertColor, setAlertText, setUseAlert, code } = props;
  const [columnList, setColumnList] = useState([]);
  const [subTitle, setSubTitle] = useState("");
  const [landingPageInfo, setLandingPageInfo] = useState();
  const [included, setIncluded] = useState([]);
  const [notIncluded, setNotIncluded] = useState([]);
  const [checkedLeftItems, setCheckedLeftItems] = useState([]);
  const [checkedRightItems, setCheckedRightItems] = useState([]);
  const [columnExpand, setColumnExpand] = useState(false);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonTooltip, setSaveButtonTooltip] = useState("생성가능");

  const handleColumnExpandChange = (panel) => (event, isExpanded) => {
    setColumnExpand(isExpanded ? panel : false);
  };

  const saveHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/updateLandingPageSettings", {
      lpgeCode: code,
      subTitle: subTitle,
      saveSettings: included,
    })
      .then((result) => {
        handleClose();
        setAlertColor("success");
        setAlertText("랜딩페이지 상세정보가 수정되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const getColumnList = () => {
    serverCommunicationUtil("main", "axioGet", "/common/getColumnList", {
      cdbtCode: code,
    })
      .then((result) => {
        setColumnList(result);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const getInfo = () => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/getLandingPageSettings", {
      lpgeCode: code,
    })
      .then((result) => {
        setSubTitle(result.landingPageInfomation.subTitle);
        setLandingPageInfo(result);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    setCheckedLeftItems([]);
    setCheckedRightItems([]);
    setIncluded([]);
    setNotIncluded([]);
    getInfo();
    getColumnList();
  }, []);

  const leftCheckBoxOnChange = (event, value) => {
    if (event.target.checked) {
      setCheckedLeftItems((prevItems) => [...prevItems, value]);
    } else {
      setCheckedLeftItems((prevItems) => prevItems.filter((item) => item !== value));
    }
  };
  const rightCheckBoxOnChange = (event, value) => {
    if (event.target.checked) {
      setCheckedRightItems((prevItems) => [...prevItems, value]);
    } else {
      setCheckedRightItems((prevItems) => prevItems.filter((item) => item !== value));
    }
  };

  const handleAllRight = () => {
    notIncluded.forEach((value) => {
      setIncluded((prevItems) => [...prevItems, { value: value }]);
    });
    setNotIncluded([]);
    setCheckedLeftItems([]);
  };
  const handleCheckedRight = () => {
    checkedLeftItems.forEach((value) => {
      setIncluded((prevItems) => [...prevItems, { value: value }]);
      setNotIncluded((prevItems) => prevItems.filter((item) => item !== value));
    });
    setCheckedLeftItems([]);
  };
  const handleCheckedLeft = () => {
    checkedRightItems.forEach((value) => {
      setNotIncluded((prevItems) => [...prevItems, value]);
      setIncluded((prevItems) => prevItems.filter((item) => value !== item.value));
    });
    setCheckedRightItems([]);
  };
  const handleAllLeft = () => {
    included.forEach((value) => {
      setNotIncluded((prevItems) => [...prevItems, value.value]);
    });
    setIncluded([]);
    setCheckedRightItems([]);
  };
  const displayReSortOnClick = (name, action) => {
    var index;
    var sliceIncluded;
    var tempIncluded = [...included];
    var changeValue;
    if (action === "up") {
      changeValue = -1;
    } else {
      changeValue = +1;
    }
    for (var i = 0; i < tempIncluded.length; i++) {
      if (tempIncluded[i].value === name) {
        index = i;
        sliceIncluded = tempIncluded[i];
      }
    }
    tempIncluded.splice(index, 1);
    tempIncluded.splice(index + changeValue, 0, sliceIncluded);
    setIncluded(tempIncluded);
  };
  const prefixOnChange = (name, prefix) => {
    var tempIncluded = [...included];
    tempIncluded.forEach((item) => {
      if (item.value === name) {
        item["prefix"] = prefix;
      }
    });
    setIncluded(tempIncluded);
  };
  const suffixOnChange = (name, suffix) => {
    var tempIncluded = [...included];
    tempIncluded.forEach((item) => {
      if (item.value === name) {
        item["suffix"] = suffix;
      }
    });
    setIncluded(tempIncluded);
  };

  useEffect(() => {
    setIncluded([]);
    setNotIncluded([]);
    if (landingPageInfo !== undefined && columnList !== undefined) {
      let tempIncluded = [];
      for (let i = 0; i < landingPageInfo.landingPageSettingList.length; i++) {
        let value = landingPageInfo.landingPageSettingList[i].columnName;
        if (columnList.includes(value)) {
          let getPrefix = landingPageInfo.landingPageSettingList[i].displayPrefix;
          let getSuffix = landingPageInfo.landingPageSettingList[i].displaySuffix;

          let includedItem = {};
          includedItem["value"] = value;
          if (getPrefix !== undefined) {
            includedItem["prefix"] = getPrefix;
          }
          if (getSuffix !== undefined) {
            includedItem["suffix"] = getSuffix;
          }

          setIncluded((prevItems) => [...prevItems, includedItem]);
          tempIncluded.push(value);
        }
      }
      setNotIncluded(columnList.filter((item) => !tempIncluded.includes(item)));
    }
  }, [landingPageInfo, columnList]);

  return (
    <DrivenModal open={open}>
      <MDBox mt={1.625}>
        <DrivenInput
          label={"서브타이틀"}
          variant={"standard"}
          size={"small"}
          value={subTitle}
          onChange={(event) => {
            setSubTitle(event.target.value);
          }}
        />
      </MDBox>
      <MDBox
        mt={1.625}
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ width: "100%", marginTop: "20px" }}
      >
        <MDBox sx={{ maxWidth: "50%" }}>
          <MDBox display={"flex"} justifyContent={"center"}>
            <MDTypography
              variant="body2"
              color="text"
              fontWeight="regular"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              display 표시 및 순서
            </MDTypography>
          </MDBox>
          <MDBox display={"flex"} justifyContent={"space-between"} sx={{ marginTop: "10px" }}>
            <MDBox
              display={"flex"}
              flexDirection={"column"}
              sx={{ border: "1px solid black", padding: "5px", borderRadius: "10px" }}
            >
              <MDBox display={"flex"} justifyContent={"center"}>
                <MDTypography
                  variant="body2"
                  color="text"
                  fontWeight="regular"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  미포함 칼럼
                </MDTypography>
              </MDBox>
              <MDBox
                sx={{
                  width: "100%",
                  maxHeight: "298px",
                  overflowY: "auto",
                }}
              >
                {notIncluded.length > 0 &&
                  notIncluded.map((value, index) => (
                    <MDBox
                      key={`notIncluded-${index}`}
                      display={"flex"}
                      justifyContent={"spaceBetween"}
                    >
                      <Checkbox
                        onChange={(event) => leftCheckBoxOnChange(event, value)}
                        checked={checkedLeftItems.includes(value)}
                      />
                      {value}
                    </MDBox>
                  ))}
              </MDBox>
            </MDBox>
            <MDBox
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              sx={{ marginX: "10px" }}
            >
              <Button
                sx={{
                  my: 0.5,
                  color: "#1A73E8",
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#f44335",
                  },
                }}
                variant="outlined"
                size="small"
                onClick={() => handleAllRight()}
                disabled={notIncluded.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                sx={{
                  my: 0.5,
                  color: "#1A73E8",
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#f44335",
                  },
                }}
                variant="outlined"
                size="small"
                onClick={() => handleCheckedRight()}
                disabled={notIncluded.length === 0}
                aria-label="move selected left"
              >
                &gt;
              </Button>
              <Button
                sx={{
                  my: 0.5,
                  color: "#1A73E8",
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#f44335",
                  },
                }}
                variant="outlined"
                size="small"
                onClick={() => handleCheckedLeft()}
                disabled={included.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                sx={{
                  my: 0.5,
                  color: "#1A73E8",
                  fontWeight: "bold",
                  "&:hover": {
                    color: "#f44335",
                  },
                }}
                variant="outlined"
                size="small"
                onClick={() => handleAllLeft()}
                disabled={included.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </MDBox>
            <MDBox
              display={"flex"}
              flexDirection={"column"}
              sx={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "10px",
                maxWidth: "50%",
              }}
            >
              <MDBox display={"flex"} justifyContent={"center"}>
                <MDTypography
                  variant="body2"
                  color="text"
                  fontWeight="regular"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  포함 칼럼
                </MDTypography>
              </MDBox>
              <MDBox
                sx={{
                  width: "100%",
                  maxHeight: "298px",
                  overflowY: "auto",
                }}
              >
                {included.length > 0 &&
                  included.map((item, index) => (
                    <MDBox
                      key={`included-${index}`}
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{ width: "100%", marginY: "10px" }}
                    >
                      <Accordion
                        expanded={columnExpand === `panel${index}`}
                        onChange={handleColumnExpandChange(`panel${index}`)}
                      >
                        <AccordionSummary sx={{ width: "100%", padding: "0" }}>
                          <MDBox
                            display={"flex"}
                            justifyContent={"space-between"}
                            sx={{ width: "100%" }}
                          >
                            <Checkbox
                              onChange={(event) => rightCheckBoxOnChange(event, item.value)}
                              checked={checkedRightItems.includes(item.value)}
                            />
                            <MDBox
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              sx={{ width: "100%" }}
                            >
                              {item.value}
                            </MDBox>
                          </MDBox>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: "0" }}>
                          <MDBox display={"flex"} flexDirection={"column"}>
                            <TextField
                              variant="standard"
                              label="접두어"
                              size="small"
                              sx={{ marginX: "10px" }}
                              value={item.prefix ? item.prefix : ""}
                              onChange={(event) => prefixOnChange(item.value, event.target.value)}
                            />
                            <TextField
                              variant="standard"
                              label="접미어"
                              size="small"
                              sx={{ marginX: "10px" }}
                              value={item.suffix ? item.suffix : ""}
                              onChange={(event) => suffixOnChange(item.value, event.target.value)}
                            />
                          </MDBox>
                        </AccordionDetails>
                      </Accordion>
                      <MDBox display={"flex"} flexDirection={"column"} alignItems={"center"}>
                        <Icon
                          onClick={() => displayReSortOnClick(item.value, "up")}
                          sx={{ cursor: "pointer" }}
                        >
                          expand_less
                        </Icon>
                        <Icon
                          onClick={() => displayReSortOnClick(item.value, "down")}
                          sx={{ cursor: "pointer" }}
                        >
                          expand_more
                        </Icon>
                      </MDBox>
                    </MDBox>
                  ))}
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox sx={{ width: "50%" }}>
          <MDTypography
            display={"flex"}
            justifyContent={"center"}
            variant="body2"
            color="text"
            fontWeight="regular"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            display 미리보기
          </MDTypography>
          <MDBox
            display={"flex"}
            sx={{ width: "100%", backgroundColor: "#f0f2f5", padding: "20px", marginTop: "10px" }}
          >
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary sx={{ width: "100%" }}>
                <MDBox sx={{ width: "100%" }}>
                  <MDBox display={"flex"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                    <MDTypography
                      variant="body2"
                      color="text"
                      fontWeight="regular"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {included.length > 0 &&
                        (included[0].prefix !== undefined ? included[0].prefix : "") +
                          included[0].value +
                          (included[0].suffix !== undefined ? included[0].suffix : "")}
                    </MDTypography>
                    <MDTypography
                      variant="body2"
                      color="text"
                      fontWeight="regular"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {included.length > 1 &&
                        (included[1].prefix !== undefined ? included[1].prefix : "") +
                          included[1].value +
                          (included[1].suffix !== undefined ? included[1].suffix : "")}
                    </MDTypography>
                  </MDBox>
                  <MDBox display={"flex"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                    <MDTypography
                      variant="overline"
                      color="text"
                      fontWeight="regular"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      재통화 예약일 : XXXX.XX.XX.
                    </MDTypography>
                    <MDTypography
                      variant="overline"
                      color="text"
                      fontWeight="regular"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      상태
                    </MDTypography>
                  </MDBox>
                  <MDBox display={"flex"} justifyContent={"center"}>
                    <Icon>swap_vert</Icon>
                  </MDBox>
                </MDBox>
              </AccordionSummary>
              {included.length > 2 && (
                <AccordionDetails>
                  {included.map(
                    (item, index) =>
                      index > 1 && (
                        <MDBox key={`${item}-${index}`} display={"flex"} alignItems={"normal"}>
                          <MDTypography
                            variant="overline"
                            color="text"
                            fontWeight="regular"
                            sx={{ color: "black", fontWeight: "bold" }}
                          >
                            {(item.prefix !== undefined ? item.prefix : "") +
                              item.value +
                              (item.suffix !== undefined ? item.suffix : "")}
                          </MDTypography>
                        </MDBox>
                      )
                  )}
                </AccordionDetails>
              )}
            </Accordion>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
        <Tooltip title={saveButtonTooltip} enterNextDelay={100}>
          <span style={{ margin: "0 2% 0 0" }}>
            <MDButton
              variant="gradient"
              color="info"
              disabled={saveButtonDisabled}
              onClick={saveHandler}
            >
              완료
            </MDButton>
          </span>
        </Tooltip>
        <MDButton color="dark" onClick={handleClose}>
          취소
        </MDButton>
      </MDBox>
    </DrivenModal>
  );
}

DetailSettingsModal.defaultProps = {
  open: false,
  handleClose: () => {},
};

DetailSettingsModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setAlertColor: PropTypes.func,
  setAlertText: PropTypes.func,
  setUseAlert: PropTypes.func,
  code: PropTypes.string,
};
