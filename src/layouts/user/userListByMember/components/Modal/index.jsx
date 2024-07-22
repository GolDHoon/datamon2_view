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
  const [nameToolTip, setNameToolTip] = useState("담당자명을 입력해주세요.");
  const [role, setRole] = useState("");
  const [roleStatus, setRoleStatus] = useState(false);
  const [roleToolTip, setRoleToolTip] = useState("소속을 입력해주세요.");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberStatus, setContactNumberStatus] = useState(false);
  const [contactNumberToolTip, setContactNumberToolTip] = useState("연락처를 입력해주세요.");
  const [mail, setMail] = useState("");
  const [mailStatus, setMailStatus] = useState(false);
  const [mailToolTip, setMailToolTip] = useState("메일을 입력해주세요.");

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [saveButtonTooltip, setSaveButtonTooltip] = useState("생성가능");

  const saveHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/user/createMemberUser", {
      userId: userId,
      pw: pw,
      name: name,
      role: role,
      contactPhone: contactNumber,
      mail: mail,
      companyId: getSessionStorage("companyId"),
    })
      .then((result) => {
        if (result === "createMember-fail:idDuplication") {
          setAlertColor("error");
          setAlertText("중복된 계정입니다.");
          setUseAlert(true);
          setTimeout(() => {
            setUseAlert(false);
          }, 1500);
        } else {
          getList();
          handleClose();
          setAlertColor("success");
          setAlertText("생성이 완료되었습니다.");
          setUseAlert(true);
          setTimeout(() => {
            setUseAlert(false);
          }, 1500);
        }
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  const idDuplicationChecker = () => {
    serverCommunicationUtil("main", "axioPost", "/user/checkMemberIdDuplicate", {
      userId: userId,
      companyId: getSessionStorage("companyId"),
    })
      .then((result) => {
        if (result === "checkId-fail:sessionError") {
          setAlertColor("error");
          setAlertText("세션이 종료되었습니다. 재로그인 후 이용해주세요.");
          setUseAlert(true);
          setTimeout(() => {
            setUseAlert(false);
            window.close();
          }, 1500);
        } else if (result === "checkId-fail:idDuplication") {
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
    setNameToolTip("담당자명을 입력해주세요.");
    setRole("");
    setRoleStatus(false);
    setRoleToolTip("소속을 입력해주세요.");
    setContactNumber("");
    setContactNumberStatus(false);
    setContactNumberToolTip("연락처를 입력해주세요.");
    setMail("");
    setMailStatus(false);
    setMailToolTip("메일을 입력해주세요.");
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

    if (!roleStatus) {
      setSaveButtonTooltip(roleToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!contactNumberStatus) {
      setSaveButtonTooltip(contactNumberToolTip);
      setSaveButtonDisabled(true);
      return;
    }

    if (!mailStatus) {
      setSaveButtonTooltip(mailToolTip);
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
    roleStatus,
    contactNumberStatus,
    mailStatus,
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
                label={"성함"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  const isKoreanInitial = /[\u3131-\u314E]/g.test(event.target.value);
                  if (event.target.value.length === 0) {
                    setNameStatus(false);
                    setNameToolTip("담당자명을 입력해주세요.");
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
                label={"소속"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  if (event.target.value.length === 0) {
                    setRoleStatus(false);
                    setRoleToolTip("소속을 입력해주세요.");
                  } else {
                    setRoleStatus(true);
                    setRoleToolTip("완료");
                  }
                  setRole(event.target.value);
                }}
                valiBool={roleStatus}
                errorMessage={roleToolTip}
              />
            </MDBox>
          </MDBox>
          <MDBox display={"flex"}>
            <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
              <DrivenInput
                label={"연락처"}
                variant={"standard"}
                size={"small"}
                onChange={(event) => {
                  if (/\D/.test(event.target.value)) {
                    event.preventDefault();
                    event.target.value = contactNumber;
                    setContactNumberStatus(false);
                    setContactNumberToolTip("숫자만 입력해주세요.");

                    setAlertColor("warning");
                    setAlertText("숫자만 입력해주세요.");
                    setUseAlert(true);
                    setTimeout(() => {
                      setUseAlert(false);
                    }, 1500);
                  } else {
                    const isValidPhoneNumber =
                      /^(010\d{8,9}|02\d{7,8}|0[3-9]{1}\d{2}\d{6,7}|070\d{8})$/.test(
                        event.target.value
                      );

                    if (event.target.value.length === 0) {
                      setContactNumberStatus(false);
                      setContactNumberToolTip("연락처를 입력해주세요.");
                    } else {
                      if (!isValidPhoneNumber) {
                        setContactNumberStatus(false);
                        setContactNumberToolTip("유효한 전화번호 형식이 아닙니다.");
                      } else {
                        setContactNumberStatus(true);
                        setContactNumberToolTip("완료");
                      }
                    }

                    setContactNumber(event.target.value);
                  }
                }}
                valiBool={contactNumberStatus}
                errorMessage={contactNumberToolTip}
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
                    setMailStatus(false);
                    setMailToolTip("메일을 입력해주세요.");
                  } else {
                    if (!isValidEMail) {
                      setMailStatus(false);
                      setMailToolTip("올바른 메일 형식을 입력해 주세요.");
                    } else {
                      setMailStatus(true);
                      setMailToolTip("완료");
                    }
                  }
                  setMail(event.target.value);
                }}
                valiBool={mailStatus}
                errorMessage={mailToolTip}
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
