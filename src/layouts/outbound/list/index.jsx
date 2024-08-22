import DrivenAlert from "../../../components/DrivenAlert";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import React, { useEffect, useState } from "react";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import { getSessionStorage } from "../../../common/common";
import { useNavigate } from "react-router-dom";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import Card from "@mui/material/Card";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import DrivenInput from "../../../components/DrivenInput";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import DrivenDateTimePicker from "../../../components/DrivenDateTimePicker";

function OutboundList() {
  const [showPage, setShowPage] = useState(false);
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);

  const [outboundList, setOutboundList] = useState([]);
  const [orderMemo, setOrderMemo] = useState("");
  const [memo, setMemo] = useState("");
  const [displayHeader, setDisplayHeader] = useState("");
  const [callbackDate, setCallbackDate] = useState("");
  const [conversionDate, setConversionDate] = useState("");
  const [cdbsCodes, setCdbsCodes] = useState([]);
  const [selectCdbsCode, setSelectCdbsCode] = useState("init");
  const [statusChangeReason, setStatusChangeReason] = useState("");
  const [cdbqCodes, setCdbqCodes] = useState([]);
  const [selectCdbqCode, setSelectCdbqCode] = useState("init");
  const [qualityChangeReason, setQualityChangeReason] = useState("");
  const [cardExpanded, setCardExpanded] = useState(0);
  const [priorStatus, setPriorStatus] = useState({});

  const navigate = useNavigate();

  const saveHandle = (idx) => {
    outboundSave(
      {
        mode: "all",
        idx: priorStatus.idx,
        memo: memo,
        callBackDate: callbackDate,
        conversionDate: conversionDate,
        cdbsCode: selectCdbsCode,
        statusChangeReason: statusChangeReason,
        cdbqCode: selectCdbqCode,
        qualityChangeReason: qualityChangeReason,
      },
      "상담 정보 저장 완료",
      true
    );
  };

  const saveCdbqHandle = () => {
    outboundSave(
      {
        mode: "cdbq",
        idx: priorStatus.idx,
        cdbqCode: selectCdbqCode,
        qualityChangeReason: qualityChangeReason,
      },
      "고객DB품질 저장 완료",
      true
    );
  };

  const saveCdbsHandle = () => {
    outboundSave(
      {
        mode: "cdbs",
        idx: priorStatus.idx,
        cdbsCode: selectCdbsCode,
        statusChangeReason: statusChangeReason,
      },
      "고객DB상태 저장 완료",
      true
    );
  };

  const saveConversionDateHandle = () => {
    outboundSave(
      {
        mode: "conversionDate",
        idx: priorStatus.idx,
        conversionDate: conversionDate,
      },
      "전환 예정일 저장 완료",
      false
    );
  };

  const saveCallbackDateHandle = () => {
    outboundSave(
      {
        mode: "callBackDate",
        idx: priorStatus.idx,
        callBackDate: callbackDate,
      },
      "재통화 예정일 저장 완료",
      false
    );
  };

  const saveMemoHandle = () => {
    outboundSave(
      {
        mode: "memo",
        idx: priorStatus.idx,
        memo: memo,
      },
      "상담 메모 저장 완료",
      false
    );
  };

  const outboundSave = (data, successMessage, getListChecker) => {
    serverCommunicationUtil("main", "axioPost", "/call/outbound/updateOutbound", data)
      .then((result) => {
        if (result === "success") {
          setAlertColor("success");
          setAlertText(successMessage);
          setUseAlert(true);
          setTimeout(() => {
            setUseAlert(false);
          }, 1500);
          if (getListChecker) {
            getList();
          }
        } else {
          setAlertColor("error");
          setAlertText("저장 실패");
          setUseAlert(true);
          setTimeout(() => {
            setUseAlert(false);
          }, 1500);
        }
      })
      .catch((error) => {
        setAlertColor("error");
        setAlertText("저장 실패");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      });
  };

  const getCdbsCode = () => {
    serverCommunicationUtil("main", "axioGet", "/common/getCdbsCode", {
      mode: "outboundListInit",
    })
      .then((result) => {
        setCdbsCodes(result);
      })
      .catch((error) => {});
  };

  const getCdbqCode = () => {
    serverCommunicationUtil("main", "axioGet", "/common/getCdbqCode", {})
      .then((result) => {
        setCdbqCodes(result);
      })
      .catch((error) => {});
  };

  const getList = () => {
    serverCommunicationUtil("main", "axioGet", "/call/outbound/list", {})
      .then((result) => {
        setOutboundList(result);
      })
      .catch((error) => {});
  };

  const clickOutbound = (index) => {
    if (outboundList[index].order != null) {
      setOrderMemo(outboundList[index].order);
    } else {
      setOrderMemo("");
    }

    if (outboundList[index].memo !== null) {
      setMemo(outboundList[index].memo);
    } else {
      setMemo("");
    }

    if (outboundList[index].callbackDate !== null) {
      setCallbackDate(outboundList[index].callbackDate);
    } else {
      setCallbackDate("");
    }

    if (outboundList[index].conversionDate !== null) {
      setConversionDate(outboundList[index].conversionDate);
    } else {
      setConversionDate("");
    }

    setSelectCdbsCode("init");
    setSelectCdbqCode("init");

    setStatusChangeReason("");
    setQualityChangeReason("");

    setDisplayHeader(outboundList[index].cardDetail[outboundList[index].settings[0].columnName]);

    if (priorStatus.idx !== outboundList[index].idx) {
      if (Object.keys(priorStatus).length > 0) {
        updateCdbsCode(
          outboundList[priorStatus.index].custIdx,
          outboundList[priorStatus.index].cdbs
        );
      }
    }

    setPriorStatus({
      idx: outboundList[index].idx,
      stauts: outboundList[index].cdbs,
      index: index,
    });

    updateCdbsCode(outboundList[index].custIdx, "CDBS_ICST");
  };

  const updateCdbsCode = (custId, cdbsCode) => {
    serverCommunicationUtil("main", "axioPost", "/call/outbound/updateCdbsCode", {
      custId: custId,
      cdbsCode: cdbsCode,
    })
      .then((result) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    if (outboundList.length > 0) {
      clickOutbound(0);
    }
  }, [outboundList]);

  useEffect(() => {
    sessionChecker()
      .then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
          getCdbsCode();
          getCdbqCode();
          getList();
        } else {
          navigate("/" + getSessionStorage("companyId") + "/login");
        }
      })
      .catch((error) => navigate("/" + getSessionStorage("companyId") + "/login"));
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  return (
    <DashboardLayout>
      {useAlert && <DrivenAlert alertColor={alertColor} alertText={alertText} />}
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox my={3}>
          <MDBox display="flex" justifyContent="space-between">
            <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
              <MDTypography variant="h4" fontWeight="medium">
                Outbound 목록
              </MDTypography>
              <MDTypography variant="body2" color="text" fontWeight="regular">
                Outbound 처리 목록
              </MDTypography>
            </MDBox>
            <MDBox display="block" style={{ textAlign: "center" }} p={2}></MDBox>
          </MDBox>
          <MDBox display={"flex"} justifyContent={"space-around"}>
            <MDBox sx={{ width: "20%", maxHeight: "calc(100vh - 270px)", overflowY: "auto" }}>
              <Card sx={{ padding: "10px", marginBottom: "10px" }}>
                <MDTypography variant="body2" fontWeight="medium">
                  지시사항
                </MDTypography>
                <MDBox sx={{ marginTop: "10px" }}>
                  <MDTypography display="block" variant="caption" fontWeight="medium">
                    {orderMemo.split("\n").map((item, key) => {
                      return <p key={key}>{item}</p>;
                    })}
                  </MDTypography>
                </MDBox>
              </Card>
              <Card sx={{ padding: "10px", marginBottom: "10px" }}>
                <MDTypography variant="body2" fontWeight="medium">
                  상담메모
                </MDTypography>
                <MDBox sx={{ marginTop: "10px" }}>
                  <MDInput
                    multiline
                    rows={2}
                    size={"large"}
                    fullWidth
                    value={memo}
                    onChange={(event) => setMemo(event.target.value)}
                  />
                </MDBox>
                <MDBox display={"flex"} flexDirection={"row-reverse"} sx={{ marginTop: "10px" }}>
                  <MDButton variant="gradient" color="info" onClick={(event) => saveMemoHandle()}>
                    저장
                  </MDButton>
                </MDBox>
              </Card>
              <Card sx={{ padding: "10px", marginBottom: "10px" }}>
                <MDTypography variant="body2" fontWeight="medium">
                  재통화 예정일
                </MDTypography>
                <MDBox display="flex" sx={{ marginTop: "10px" }}>
                  <DrivenDateTimePicker
                    ampm={false}
                    type={"list"}
                    timeSteps={{ hours: 1, minutes: 5 }}
                    value={callbackDate}
                    onChange={(event) => {
                      var datetime = new Date(event.$d);
                      setCallbackDate(datetime.toISOString().substring(0, 19));
                    }}
                  />
                </MDBox>
                <MDBox display={"flex"} flexDirection={"row-reverse"} sx={{ marginTop: "10px" }}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={(event) => saveCallbackDateHandle()}
                  >
                    저장
                  </MDButton>
                </MDBox>
              </Card>
              <Card sx={{ padding: "10px", marginBottom: "10px" }}>
                <MDTypography variant="body2" fontWeight="medium">
                  전환 예정일
                </MDTypography>
                <MDBox sx={{ marginTop: "10px" }}>
                  <DrivenDateTimePicker
                    ampm={false}
                    type={"list"}
                    timeSteps={{ hours: 1, minutes: 5 }}
                    value={conversionDate}
                    onChange={(event) => {
                      var datetime = new Date(event.$d);
                      setConversionDate(datetime.toISOString().substring(0, 19));
                    }}
                  />
                </MDBox>
                <MDBox display={"flex"} flexDirection={"row-reverse"} sx={{ marginTop: "10px" }}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    onClick={(event) => saveConversionDateHandle()}
                  >
                    저장
                  </MDButton>
                </MDBox>
              </Card>
            </MDBox>
            <MDBox sx={{ width: "50%" }}>
              <Card sx={{ paddingX: "10px", marginBottom: "10px" }}>상담중 : {displayHeader}</Card>
              <MDBox sx={{ maxHeight: "470px", overflowY: "auto" }}>
                {outboundList.map((outbound, index) => (
                  <Card key={index} sx={{ padding: "10px", marginBottom: "10px" }}>
                    <Accordion
                      sx={{ width: "100%", border: "0px", boxShadow: "0" }}
                      onClick={() => {
                        setCardExpanded(index);
                        clickOutbound(index);
                      }}
                      expanded={cardExpanded === index}
                    >
                      <AccordionSummary sx={{ width: "100%" }}>
                        <MDBox display={"flex"} flexDirection={"column"} sx={{ width: "100%" }}>
                          <MDBox
                            display={"flex"}
                            justifyContent={"space-between"}
                            sx={{ width: "100%" }}
                          >
                            {outbound?.settings?.length > 0 && (
                              <MDBox>
                                {outbound.settings[0].displayPrefix}
                                {outbound.cardDetail[outbound.settings[0].columnName]}
                                {outbound.settings[0].displaySuffix}
                              </MDBox>
                            )}
                            {outbound?.settings?.length > 1 && (
                              <MDBox>
                                {outbound.settings[1].displayPrefix}
                                {outbound.cardDetail[outbound.settings[1].columnName]}
                                {outbound.settings[1].displaySuffix}
                              </MDBox>
                            )}
                          </MDBox>
                          <MDBox
                            display={"flex"}
                            justifyContent={"space-between"}
                            sx={{ width: "100%" }}
                          >
                            <MDBox>재통화 예약일 : {outbound.callbackDateDisplay}</MDBox>
                            <MDBox>{cardExpanded === index ? `상담중` : outbound.상태}</MDBox>
                          </MDBox>
                        </MDBox>
                      </AccordionSummary>
                      <AccordionDetails>
                        {outbound?.settings?.length > 2 && outbound?.settings?.index >= 2 ? (
                          outbound.settings.map((setting, index2) => (
                            <MDBox key={index2}>
                              {setting.displayPrefix}
                              {outbound.cardDetail[setting.columnName]}
                              {setting.displaySuffix}
                            </MDBox>
                          ))
                        ) : (
                          <MDBox>표시할 내용이 없습니다.</MDBox>
                        )}
                      </AccordionDetails>
                    </Accordion>
                    {cardExpanded === index && (
                      <MDBox display={"flex"} justifyContent={"flex-end"}>
                        <MDButton variant="gradient" color="secondary" sx={{ marginX: "10px" }}>
                          이전 상담 이력 보기
                        </MDButton>
                        <MDButton
                          variant="gradient"
                          color="info"
                          sx={{ marginX: "10px" }}
                          onClick={(event) => saveHandle(outbound.idx)}
                        >
                          상담완료
                        </MDButton>
                      </MDBox>
                    )}
                  </Card>
                ))}
              </MDBox>
            </MDBox>
            <MDBox sx={{ width: "20%" }}>
              <Card sx={{ padding: "10px", marginBottom: "10px" }}>
                <MDTypography variant="body2" fontWeight="medium">
                  상태
                </MDTypography>
                <MDBox sx={{ marginY: "10px" }}>
                  <DrivenInput
                    label={""}
                    variant={"standard"}
                    type={"select"}
                    value={selectCdbsCode}
                    selectItems={cdbsCodes}
                    onChange={(event) => setSelectCdbsCode(event.target.value)}
                  />
                </MDBox>
                <MDBox>
                  <MDInput
                    multiline
                    rows={2}
                    fullWidth
                    size={"small"}
                    label={"변경사유"}
                    value={statusChangeReason}
                    onChange={(event) => setStatusChangeReason(event.target.value)}
                  />
                </MDBox>
                <MDBox display={"flex"} flexDirection={"row-reverse"} sx={{ marginTop: "10px" }}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    disabled={selectCdbsCode === "init"}
                    onClick={(event) => saveCdbsHandle()}
                  >
                    저장
                  </MDButton>
                </MDBox>
              </Card>
              <Card sx={{ padding: "10px", marginBottom: "10px" }}>
                <MDTypography variant="body2" fontWeight="medium">
                  품질
                </MDTypography>
                <MDBox sx={{ marginY: "10px" }}>
                  <DrivenInput
                    label={""}
                    variant={"standard"}
                    type={"select"}
                    value={selectCdbqCode}
                    selectItems={cdbqCodes}
                    onChange={(event) => setSelectCdbqCode(event.target.value)}
                  />
                </MDBox>
                <MDBox>
                  <MDInput
                    multiline
                    rows={2}
                    size={"small"}
                    fullWidth
                    label={"변경사유"}
                    value={qualityChangeReason}
                    onChange={(event) => setQualityChangeReason(event.target.value)}
                  />
                </MDBox>
                <MDBox display={"flex"} flexDirection={"row-reverse"} sx={{ marginTop: "10px" }}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    disabled={selectCdbqCode === "init"}
                    onClick={(event) => saveCdbqHandle()}
                  >
                    저장
                  </MDButton>
                </MDBox>
              </Card>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default OutboundList;
