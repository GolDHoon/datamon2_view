import DrivenModal from "../../../../../components/DrivenModal";
import PropTypes from "prop-types";
import MDBox from "../../../../../components/MDBox";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "../../../../../components/MDButton";
import { useEffect, useState } from "react";
import DrivenInput from "../../../../../components/DrivenInput";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";

export default function CustClickModal(props) {
  const {
    open,
    handleClose,
    setAlertColor,
    setAlertText,
    setUseAlert,
    getList,
    getList2,
    selectCustIdx,
    employeeList,
  } = props;
  const [order, setOrder] = useState("");
  const [selectMemberIdx, setSelectMemberIdx] = useState();
  const [selectMemberStatus, setSelectMemberStatus] = useState(false);
  const [selectMemberToolTip, setSelectMemberToolTip] = useState("대상 구성원을 선택해주세요.");
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [saveButtonTooltip, setSaveButtonTooltip] = useState("생성가능");
  const [memberList, setMemberList] = useState([]);

  const saveHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/call/distribution/single", {
      userId: selectMemberIdx,
      custId: selectCustIdx,
      orderMemo: order,
    })
      .then((result) => {
        getList();
        getList2();
        handleClose();
        setAlertColor("success");
        setAlertText("분배가 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    setSelectMemberStatus(false);
    setSelectMemberToolTip("대상 구성원을 선택해주세요.");
  }, [open]);

  useEffect(() => {
    setMemberList(
      employeeList
        .filter((data) => data.useYn === "true")
        .map((data) => ({ key: `${data.name}(${data.role})`, value: data.idx }))
    );
  }, [employeeList]);

  useEffect(() => {
    if (!selectMemberStatus) {
      setSaveButtonDisabled(true);
      setSaveButtonTooltip(selectMemberToolTip);
      return;
    }
    setSaveButtonDisabled(false);
    setSaveButtonTooltip("생성가능");
  }, [selectMemberStatus]);

  return (
    <DrivenModal open={open}>
      <MDBox display={"flex"} sx={{ width: "100%" }} m={1}>
        <DrivenInput
          label={"유저유형"}
          variant={"standard"}
          type={"select"}
          selectItems={memberList}
          onChange={(event) => {
            if (event.target.value.length === "init") {
              setSelectMemberStatus(false);
              setSelectMemberToolTip("대상 구성원을 선택해주세요.");
            } else {
              setSelectMemberStatus(true);
              setSelectMemberToolTip("완료");
            }
            setSelectMemberIdx(event.target.value);
          }}
          valiBool={selectMemberStatus}
          errorMessage={selectMemberToolTip}
        />
      </MDBox>
      <MDBox mt={2} display="flex">
        <DrivenInput
          type={"multiline"}
          label={"지시사항"}
          size={"large"}
          onChange={(event) => {
            setOrder(event.target.value);
          }}
        />
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
CustClickModal.defaultProps = {
  open: false,
  handleClose: () => {},
  getList: () => {},
};

CustClickModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setAlertColor: PropTypes.func,
  setAlertText: PropTypes.func,
  setUseAlert: PropTypes.func,
  getList: PropTypes.func,
  getList2: PropTypes.func,
  selectCustIdx: PropTypes.string,
  employeeList: PropTypes.array,
};
