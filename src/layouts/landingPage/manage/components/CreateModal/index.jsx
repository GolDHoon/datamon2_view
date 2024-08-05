import DrivenModal from "../../../../../components/DrivenModal";
import PropTypes from "prop-types";
import MDBox from "../../../../../components/MDBox";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "../../../../../components/MDButton";
import { useEffect, useState } from "react";
import DrivenInput from "../../../../../components/DrivenInput";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../../../components/MDTypography";

export default function CreateModal(props) {
  const { open, handleClose, setAlertColor, setAlertText, setUseAlert, getList } = props;
  const [domain, setDomain] = useState("");
  const [domainStatus, setDomainStatus] = useState(false);
  const [domainToolTip, setDomainToolTip] = useState("도메인을 입력해주세요");
  const [description, setDescription] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState(true);
  const [descriptionToolTip, setDescriptionToolTip] = useState("");

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [saveButtonTooltip, setSaveButtonTooltip] = useState("생성가능");

  const saveHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/createLpge", {
      domain: domain,
      description: description,
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
        console.log("");
      });
  };

  useEffect(() => {
    setDomain("");
    setDomainStatus(false);
    setDomainToolTip("도메인을 입력해주세요.");
    setDescription("");
    setDescriptionStatus(true);
    setDescriptionToolTip("");
  }, [open]);

  useEffect(() => {
    setSaveButtonDisabled(false);
    setSaveButtonTooltip("생성가능");
  }, []);

  return (
    <DrivenModal open={open}>
      <MDBox mt={2} display="flex">
        <DrivenInput
          label={"도메인"}
          variant={"standard"}
          size={"small"}
          onChange={(event) => {
            var url = event.target.value;
            const validation = url.match(
              /^((([a-z\d]([a-z\d-]*[a-z\d])*)\.)*[a-z\d]{4,}|((\d{1,3}\.){3}\d{1,3}))(?::\d+)?$/i
            );
            if (event.target.value.length === 0) {
              setDomainStatus(false);
              setDomainToolTip("도메인을 입력해주세요.");
            } else {
              if (validation) {
                setDomainStatus(false);
                setDomainToolTip("유효한 URL을 입력해주세요");
              } else {
                setDomainStatus(true);
                setDomainToolTip("완료");

                url = url.replace("https://", "");
                url = url.replace("http://", "");
                url = url.replace("www.", "");
              }
            }

            setDomain(url);
          }}
          valiBool={domainStatus}
          errorMessage={domainToolTip}
        />
      </MDBox>
      <MDBox mt={2} display="flex">
        <DrivenInput
          type={"multiline"}
          label={"설명"}
          onChange={(event) => {
            if (event.target.value.length > 66) {
              setDescriptionStatus(false);
              setDescriptionToolTip("설명은 66자를 초과할 수 없습니다.");
            } else {
              setDescriptionStatus(true);
              setDescriptionToolTip("완료");
            }

            setDescription(event.target.value);
          }}
          valiBool={descriptionStatus}
          errorMessage={descriptionToolTip}
        />
      </MDBox>
      <MDBox display="flex" flexDirection="row-reverse" sx={{ marginRight: "10px" }}>
        <MDTypography variant="caption">
          {description.length}
          {"/66"}
        </MDTypography>
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
CreateModal.defaultProps = {
  open: false,
  handleClose: () => {},
  getList: () => {},
};

CreateModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setAlertColor: PropTypes.func,
  setAlertText: PropTypes.func,
  setUseAlert: PropTypes.func,
  getList: PropTypes.func,
};
