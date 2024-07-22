import DrivenModal from "../../../../../components/DrivenModal";
import PropTypes from "prop-types";
import MDBox from "../../../../../components/MDBox";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "../../../../../components/MDButton";
import { useEffect, useState } from "react";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import { getSessionStorage } from "../../../../../common/common";
import DrivenInput from "../../../../../components/DrivenInput";

export default function Modal(props) {
  const { open, handleClose, setAlertColor, setAlertText, setUseAlert, getList } = props;

  const [userId, setUserId] = useState("");
  const [userIdStatus, setUserIdStatus] = useState(false);
  const [userIdToolTip, setUserIdToolTip] = useState("ID를 입력해주세요.");
  const [idDuplication, setIdDuplication] = useState(false);
  const [pw, setPw] = useState("");
  const [pwStatus, setPwStatus] = useState(false);
  const [pwToolTip, setPwToolTip] = useState("패스워드를 입력해주세요.");
  const [name, setName] = useState("");
  const [nameStatus, setNameStatus] = useState(false);
  const [nameToolTip, setNameToolTip] = useState("업체명을 입력해주세요.");
  const [ceo, setCeo] = useState("");
  const [ceoStatus, setCeoStatus] = useState(false);
  const [ceoToolTip, setCeoToolTip] = useState("대표자명을 입력해주세요.");
  const [corporateNumber, setCorporateNumber] = useState("");
  const [corporateNumberStatus, setCorporateNumberStatus] = useState(false);
  const [corporateNumberToolTip, setCorporateNumberToolTip] =
    useState("사업자등록번호를 입력해주세요.");
  const [userType, setUserType] = useState("init");
  const [userTypeStatus, setUserTypeStatus] = useState(false);
  const [userTypeToolTip, setUserTypeToolTip] = useState("유저유형을 선택해주세요.");
  const [corporateAddress, setCorporateAddress] = useState("");
  const [corporateAddressStatus, setCorporateAddressStatus] = useState(false);
  const [corporateAddressToolTip, setCorporateAddressToolTip] =
    useState("사업장주소를 입력해주세요.");
  const [corporateMail, setCorporateMail] = useState("");
  const [corporateMailStatus, setCorporateMailStatus] = useState(false);
  const [corporateMailToolTip, setCorporateMailToolTip] = useState("메일을 입력해주세요.");
  const [businessStatus, setBusinessStatus] = useState("");
  const [businessStatusStatus, setBusinessStatusStatus] = useState(false);
  const [businessStatusToolTip, setBusinessStatusToolTip] = useState("업태를 입력해주세요.");
  const [businessItem, setBusinessItem] = useState("");
  const [businessItemStatus, setBusinessItemStatus] = useState(false);
  const [businessItemToolTip, setBusinessItemToolTip] = useState("업종을 입력해주세요.");

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [saveButtonTooltip, setSaveButtonTooltip] = useState("생성가능");

  const saveHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/user/createCompanyUser", {
      userId: userId,
      pw: pw,
      name: name,
      ceo: ceo,
      corporateNumber: corporateNumber,
      userType: userType,
      corporateAddress: corporateAddress,
      corporateMail: corporateMail,
      businessStatus: businessStatus,
      businessItem: businessItem,
    })
      .then((result) => {
        getList();
        handleClose();
        setAlertColor("success");
        setAlertText("생성이 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  const idDuplicationChecker = () => {
    serverCommunicationUtil("main", "axioPost", "/user/checkCompanyIdDuplicate", {
      userId: userId,
      companyId: getSessionStorage("companyId"),
    })
      .then((result) => {
        if (result === "checkId-fail:idDuplication") {
          setIdDuplication(false);
          setAlertColor("warning");
          setAlertText("중복된 ID 입니다.");
          setUseAlert(true);
          setTimeout(() => {
            setUseAlert(false);
          }, 1500);
        } else {
          setIdDuplication(true);
          setAlertColor("success");
          setAlertText("생성가능한 ID입니다.");
          setUseAlert(true);
          setUserIdToolTip("완료");
          setTimeout(() => {
            setUseAlert(false);
          }, 1500);
        }
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  useEffect(() => {
    setUserId("");
    setUserIdStatus(false);
    setUserIdToolTip("ID를 입력해주세요.");
    setIdDuplication(false);
    setPw("");
    setPwStatus(false);
    setPwToolTip("패스워드를 입력해주세요.");
    setName("");
    setNameStatus(false);
    setNameToolTip("업체명을 입력해주세요.");
    setCeo("");
    setCeoStatus(false);
    setCeoToolTip("대표자명을 입력해주세요.");
    setCorporateNumber("");
    setCorporateNumberStatus(false);
    setCorporateNumberToolTip("사업자등록번호를 입력해주세요.");
    setUserType("init");
    setUserTypeStatus(false);
    setUserTypeToolTip("유저유형을 선택해주세요.");
    setCorporateAddress("");
    setCorporateAddressStatus(false);
    setCorporateAddressToolTip("사업장주소를 입력해주세요.");
    setCorporateMail("");
    setCorporateMailStatus(false);
    setCorporateMailToolTip("메일을 입력해주세요.");
    setBusinessStatus("");
    setBusinessStatusStatus(false);
    setBusinessStatusToolTip("업태를 입력해주세요.");
    setBusinessItem("");
    setBusinessItemStatus(false);
    setBusinessItemToolTip("업종을 입력해주세요.");
  }, [open]);

  useEffect(() => {
    if (!userIdStatus) {
      setSaveButtonTooltip(userIdToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!idDuplication) {
      setSaveButtonTooltip(userIdToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!pwStatus) {
      setSaveButtonTooltip(pwToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!nameStatus) {
      setSaveButtonTooltip(nameToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!ceoStatus) {
      setSaveButtonTooltip(ceoToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!corporateNumberStatus) {
      setSaveButtonTooltip(corporateNumberToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!userTypeStatus) {
      setSaveButtonTooltip(userTypeToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!corporateAddressStatus) {
      setSaveButtonTooltip(corporateAddressToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!corporateMailStatus) {
      setSaveButtonTooltip(corporateMailToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!businessStatusStatus) {
      setSaveButtonTooltip(businessStatusToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!businessItemStatus) {
      setSaveButtonTooltip(businessItemToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    setSaveButtonDisabled(false);
    setSaveButtonTooltip("생성가능");
  }, [
    userIdStatus,
    idDuplication,
    pwStatus,
    nameStatus,
    ceoStatus,
    corporateNumberStatus,
    userTypeStatus,
    corporateAddressStatus,
    corporateMailStatus,
    businessStatusStatus,
    businessItemStatus,
  ]);

  return (
    <DrivenModal open={open}>
      <MDBox>
        <MDBox>
          <MDBox display={"flex"}>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"ID"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  if (event.target.value.length === 0) {
                    setUserIdStatus(false);
                    setUserIdToolTip("ID를 입력해주세요.");
                  } else {
                    setUserIdStatus(true);
                    setUserIdToolTip("ID 중복체크를 해주세요.");
                  }
                  setIdDuplication(false);
                  setUserId(event.target.value);
                }}
                valiBool={userIdStatus && idDuplication}
                errorMessage={userIdToolTip}
              />
              <MDBox>
                {idDuplication ? (
                  <MDButton
                    variant="gradient"
                    color="success"
                    disabled={true}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    사용가능
                  </MDButton>
                ) : (
                  <MDButton
                    variant="gradient"
                    color="info"
                    sx={{ whiteSpace: "nowrap" }}
                    onClick={(event) => {
                      idDuplicationChecker();
                    }}
                  >
                    중복체크
                  </MDButton>
                )}
              </MDBox>
            </MDBox>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"PW"}
                type={"password"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  if (event.target.value.length === 0) {
                    setPwStatus(false);
                    setPwToolTip("패스워드를 입력해주세요.");
                  } else {
                    setPwStatus(true);
                    setPwToolTip("완료");
                  }
                  setPw(event.target.value);
                }}
                valiBool={pwStatus}
                errorMessage={pwToolTip}
              />
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          <MDBox display={"flex"}>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"업체명"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  const isKoreanInitial = /[\u3131-\u314E]/g.test(event.target.value);
                  if (event.target.value.length === 0) {
                    setNameStatus(false);
                    setNameToolTip("업체명을 입력해주세요.");
                  } else {
                    if (isKoreanInitial) {
                      setNameStatus(false);
                      setNameToolTip("초성만 입력할 수 없습니다.");
                    } else {
                      setNameStatus(true);
                      setNameToolTip("완료");
                    }
                  }
                  setName(event.target.value);
                }}
                valiBool={nameStatus}
                errorMessage={nameToolTip}
              />
            </MDBox>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"대표자명"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  const isKoreanInitial = /[\u3131-\u314E]/g.test(event.target.value);
                  if (event.target.value.length === 0) {
                    setCeoStatus(false);
                    setCeoToolTip("대표자명을 입력해주세요.");
                  } else {
                    if (isKoreanInitial) {
                      setCeoStatus(false);
                      setCeoToolTip("초성만 입력할 수 없습니다.");
                    } else {
                      setCeoStatus(true);
                      setCeoToolTip("완료");
                    }
                  }
                  setCeo(event.target.value);
                }}
                valiBool={ceoStatus}
                errorMessage={ceoToolTip}
              />
            </MDBox>
          </MDBox>
          <MDBox display={"flex"}>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"사업자등록번호"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  if (/\D/.test(event.target.value)) {
                    event.preventDefault();
                    event.target.value = corporateNumber;
                    setCorporateNumberStatus(false);
                    setCorporateNumberToolTip("숫자만 입력해주세요.");

                    setAlertColor("warning");
                    setAlertText("숫자만 입력해주세요.");
                    setUseAlert(true);
                    setTimeout(() => {
                      setUseAlert(false);
                    }, 1500);
                  } else {
                    if (event.target.value.length === 0) {
                      setCorporateNumberStatus(false);
                      setCorporateNumberToolTip("사업자등록번호를 입력해주세요.");
                    } else {
                      if (event.target.value.length !== 10) {
                        setCorporateNumberStatus(false);
                        setCorporateNumberToolTip("유효한 사업자등록번호를 입력해주세요.");
                      } else {
                        setCorporateNumberStatus(true);
                        setCorporateNumberToolTip("완료");
                      }
                    }
                  }

                  setCorporateNumber(event.target.value);
                }}
                valiBool={corporateNumberStatus}
                errorMessage={corporateNumberToolTip}
              />
            </MDBox>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"유저유형"}
                variant={"standard"}
                size={"small"}
                type={"select"}
                selectItems={[
                  { key: "광고주", value: "USTY_CLNT" },
                  { key: "광고대행사", value: "USTY_ADAC" },
                  { key: "CRM", value: "USTY_CRAC" },
                ]}
                onChange={(event) => {
                  if (event.target.value.length === "init") {
                    setUserTypeStatus(false);
                    setUserTypeToolTip("유저유형을 선택해주세요.");
                  } else {
                    setUserTypeStatus(true);
                    setUserTypeToolTip("완료");
                  }
                  setUserType(event.target.value);
                }}
                valiBool={userTypeStatus}
                errorMessage={userTypeToolTip}
              />
            </MDBox>
          </MDBox>
          <MDBox display={"flex"}>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"사업장주소"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  const isKoreanInitial = /[\u3131-\u314E]/g.test(event.target.value);
                  if (event.target.value.length === 0) {
                    setCorporateAddressStatus(false);
                    setCorporateAddressToolTip("사업장주소를 입력해주세요.");
                  } else {
                    if (isKoreanInitial) {
                      setCorporateAddressStatus(false);
                      setCorporateAddressToolTip("초성만 입력할 수 없습니다.");
                    } else {
                      setCorporateAddressStatus(true);
                      setCorporateAddressToolTip("완료");
                    }
                  }

                  setCorporateAddress(event.target.value);
                }}
                valiBool={corporateAddressStatus}
                errorMessage={corporateAddressToolTip}
              />
            </MDBox>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"이메일"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  const isValidEMail = /\S+@\S+\.\S+/.test(event.target.value);
                  if (event.target.value.length === 0) {
                    setCorporateMailStatus(false);
                    setCorporateMailToolTip("메일을 입력해주세요.");
                  } else {
                    if (!isValidEMail) {
                      setCorporateMailStatus(false);
                      setCorporateMailToolTip("올바른 메일 형식을 입력해 주세요.");
                    } else {
                      setCorporateMailStatus(true);
                      setCorporateMailToolTip("완료");
                    }
                  }
                  setCorporateMail(event.target.value);
                }}
                valiBool={corporateMailStatus}
                errorMessage={corporateMailToolTip}
              />
            </MDBox>
          </MDBox>
          <MDBox display={"flex"}>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"업태"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  const isKoreanInitial = /[\u3131-\u314E]/g.test(event.target.value);
                  if (event.target.value.length === 0) {
                    setBusinessStatusStatus(false);
                    setBusinessStatusToolTip("업태를 입력해주세요.");
                  } else {
                    if (isKoreanInitial) {
                      setBusinessStatusStatus(false);
                      setBusinessStatusToolTip("초성만 입력할 수 없습니다.");
                    } else {
                      setBusinessStatusStatus(true);
                      setBusinessStatusToolTip("완료");
                    }
                  }

                  setBusinessStatus(event.target.value);
                }}
                valiBool={businessStatusStatus}
                errorMessage={businessStatusToolTip}
              />
            </MDBox>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"업종"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  const isKoreanInitial = /[\u3131-\u314E]/g.test(event.target.value);
                  if (event.target.value.length === 0) {
                    setBusinessItemStatus(false);
                    setBusinessItemToolTip("업종을 입력해주세요.");
                  } else {
                    if (isKoreanInitial) {
                      setBusinessItemStatus(false);
                      setBusinessItemToolTip("초성만 입력할 수 없습니다.");
                    } else {
                      setBusinessItemStatus(true);
                      setBusinessItemToolTip("완료");
                    }
                  }

                  setBusinessItem(event.target.value);
                }}
                valiBool={businessItemStatus}
                errorMessage={businessItemToolTip}
              />
            </MDBox>
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
Modal.defaultProps = {
  open: false,
  handleClose: () => {},
  getList: () => {},
};

Modal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setAlertColor: PropTypes.func,
  setAlertText: PropTypes.func,
  setUseAlert: PropTypes.func,
  getList: PropTypes.func,
};
