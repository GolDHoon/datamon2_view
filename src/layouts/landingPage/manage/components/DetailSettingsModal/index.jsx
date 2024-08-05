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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function DetailSettingsModal(props) {
  const { open, handleClose, setAlertColor, setAlertText, setUseAlert, code } = props;
  const [columnList, setColumnList] = useState([]);
  const [landingPageInfo, setLandingPageInfo] = useState();
  const [included, setIncluded] = useState([]);
  const [notIncluded, setNotIncluded] = useState([]);
  const [existInColumnList, setExistInColumnList] = useState([]);
  const [checkedLeftItems, setCheckedLeftItems] = useState([]);
  const [checkedRightItems, setCheckedRightItems] = useState([]);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonTooltip, setSaveButtonTooltip] = useState("생성가능");

  const saveHandler = () => {
    console.log("columnList");
    console.log(columnList);
    console.log("landingPageInfo");
    console.log(landingPageInfo);
    console.log("checkedLeftItems");
    console.log(checkedLeftItems);
    console.log("checkedRightItems");
    console.log(checkedRightItems);
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
    setExistInColumnList([]);
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
      setIncluded((prevItems) => [...prevItems, value]);
    });
    setNotIncluded([]);
  };
  const handleCheckedRight = () => {
    checkedLeftItems.forEach((value) => {
      setIncluded((prevItems) => [...prevItems, value]);
      setNotIncluded((prevItems) => prevItems.filter((item) => item !== value));
    });
    setCheckedLeftItems([]);
  };
  const handleCheckedLeft = () => {
    checkedRightItems.forEach((value) => {
      setNotIncluded((prevItems) => [...prevItems, value]);
      setIncluded((prevItems) => prevItems.filter((item) => item !== value));
    });
    setCheckedRightItems([]);
  };
  const handleAllLeft = () => {
    included.forEach((value) => {
      setNotIncluded((prevItems) => [...prevItems, value]);
    });
    setIncluded([]);
  };

  useEffect(() => {
    if (landingPageInfo !== undefined && columnList !== undefined) {
      let columnNameInLandingPage = landingPageInfo.landingPageSettingList.map((i) => i.columnName);
      setIncluded(columnList.filter((column) => columnNameInLandingPage.includes(column)));
      setNotIncluded(columnList.filter((column) => !columnNameInLandingPage.includes(column)));
      setExistInColumnList(
        columnNameInLandingPage.filter((column) => !columnList.includes(column))
      );
    }
  }, [landingPageInfo, columnList]);

  return (
    <DrivenModal open={open}>
      <MDBox mt={1.625}>
        <DrivenInput
          label={"서브타이틀"}
          variant={"standard"}
          size={"small"}
          onChange={(event) => {
            let landingInfo = landingPageInfo;
            landingInfo.landingPageInfomation.subTitle = event.target.value;
            setLandingPageInfo(landingInfo);
          }}
        />
      </MDBox>
      <MDBox mt={1.625} display={"flex"} sx={{ width: "100%", marginTop: "20px" }}>
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
              sx={{ border: "1px solid black", padding: "5px", borderRadius: "10px" }}
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
              {included.length > 0 &&
                included.map((value, index) => (
                  <MDBox key={`included-${index}`} display={"flex"} justifyContent={"spaceBetween"}>
                    <Checkbox
                      onChange={(event) => rightCheckBoxOnChange(event, value)}
                      checked={checkedRightItems.includes(value)}
                    />
                    {value}
                  </MDBox>
                ))}
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox display={"flex"} sx={{ width: "50%" }}>
          <MDBox sx={{ width: "100%" }}>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary display={"flex"} flexDirection={"column"}>
                <MDBox display={"flex"} justifyContent={"space-between"}>
                  <MDTypography
                    variant="body2"
                    color="text"
                    fontWeight="regular"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {included.length > 0 && included[0]}
                  </MDTypography>
                  <MDTypography
                    variant="body2"
                    color="text"
                    fontWeight="regular"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    {included.length > 1 && included[1]}
                  </MDTypography>
                </MDBox>
                <MDBox display={"flex"} justifyContent={"space-between"}>
                  <MDTypography
                    variant="overline"
                    color="text"
                    fontWeight="regular"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    재통화 예약일 : XXXX-XX-XX
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
              </AccordionSummary>
              <AccordionDetails>테스트 디테일스</AccordionDetails>
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
