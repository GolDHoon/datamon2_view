import DrivenModal from "../../../../../components/DrivenModal";
import PropTypes from "prop-types";
import MDBox from "../../../../../components/MDBox";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "../../../../../components/MDButton";
import { useEffect, useState } from "react";
import DrivenInput from "../../../../../components/DrivenInput";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../../../components/MDTypography";

export default function CustSelectModal(props) {
  const {
    open,
    handleClose,
    setAlertColor,
    setAlertText,
    setUseAlert,
    getList,
    getList2,
    selectCustIdxs,
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
    console.log(selectCustIdxs);
    serverCommunicationUtil("main", "axioPost", "/call/distribution/multi", {
      userId: selectMemberIdx,
      custId: selectCustIdxs.map((data) => data.idx),
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
          size={"small"}
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
      <MDBox mt={2} display="flex" justifyContent={"space-between"}>
        <MDBox sx={{ width: "100%" }}>
          <DrivenInput
            type={"multiline"}
            label={"지시사항"}
            size={"large"}
            onChange={(event) => {
              setOrder(event.target.value);
            }}
          />
        </MDBox>
        <MDBox sx={{ maxHeight: "260px", overflowY: "auto", marginLeft: "10px", width: "100%" }}>
          <MDTypography variant="body2" fontWeight="medium">
            저장목록
          </MDTypography>
          {selectCustIdxs.map((custInfo, index) => (
            <MDBox key={index} sx={{ whiteSpace: "nowrap" }}>
              {Object.keys(custInfo).map(
                (key, index2) =>
                  key !== "idx" && (
                    <MDTypography variant="button" fontWeight="regular" key={index2}>
                      [{key} : {custInfo[key]}]&nbsp;
                    </MDTypography>
                  )
              )}
            </MDBox>
          ))}
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
CustSelectModal.defaultProps = {
  open: false,
  handleClose: () => {},
  getList: () => {},
};

CustSelectModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setAlertColor: PropTypes.func,
  setAlertText: PropTypes.func,
  setUseAlert: PropTypes.func,
  getList: PropTypes.func,
  getList2: PropTypes.func,
  selectCustIdxs: PropTypes.array,
  employeeList: PropTypes.array,
};
