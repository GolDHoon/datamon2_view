import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";

// Material Dashboard 2 PRO React examples
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../components/MDTypography";
import Footer from "../../common/Footer";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";
import { getSessionStorage } from "../../../common/common";
import { useNavigate } from "react-router-dom";
import DrivenTable from "../../../components/DrivenTable";
import DrivenAlert from "../../../components/DrivenAlert";
import CreateModal from "./components/CreateModal";
import BlockIpModal from "./components/BlockIpModal";
import BlockKeywordModal from "./components/BlockKeywordModal";
import DetailSettingsModal from "./components/DetailSettingsModal";

function LandingPageManagement() {
  const [showPage, setShowPage] = useState(false);
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [creatModalOpen, setCreatModalOpen] = useState(false);
  const [blockIpModalOpen, setBlockIpModalOpen] = useState(false);
  const [blockKeywordModalOpen, setBlockKeywordModalOpen] = useState(false);
  const [detailSettingsModalOpen, setDetailSettingsModalOpen] = useState();
  const [selectCode, setSelectCode] = useState();
  const navigate = useNavigate();

  const handleCreatModalOpen = () => setCreatModalOpen(true);
  const handleCreatModalClose = () => setCreatModalOpen(false);
  const handleBlockIpModalOpen = () => setBlockIpModalOpen(true);
  const handleBlockIpModalClose = () => setBlockIpModalOpen(false);
  const handleBlockKeywordModalOpen = () => setBlockKeywordModalOpen(true);
  const handleBlockKeywordModalClose = () => setBlockKeywordModalOpen(false);
  const handleDetailSettingsModalOpen = () => setDetailSettingsModalOpen(true);
  const handleDetailSettingsModalClose = () => setDetailSettingsModalOpen(false);

  const useYnSwitch = (cdbtCode, rowIdx, switchValue) => {
    serverCommunicationUtil("main", "axioPost", "/landingPageManage/useUpdate", {
      lpgeCode: rowIdx,
      useYn: switchValue,
    })
      .then((result) => {
        getList();
      })
      .catch((error) => {
        console.log("");
      });
  };

  const ipBlockHandler = (param1, idx) => {
    setSelectCode(idx);
    handleBlockIpModalOpen();
  };

  const keywordBlockHandler = (param1, idx) => {
    setSelectCode(idx);
    handleBlockKeywordModalOpen();
  };

  const DetailedSettingsHandler = (param1, idx) => {
    setSelectCode(idx);
    handleDetailSettingsModalOpen();
  };

  const customCellContents = (param1, param2, idx) => {
    return (
      <MDBox display="flex" justifyContent={"space-evenly"}>
        <MDButton variant="outlined" color="dark" onClick={(evnet) => ipBlockHandler(param1, idx)}>
          차단ip
        </MDButton>
        <MDButton
          variant="outlined"
          color="dark"
          onClick={(evnet) => keywordBlockHandler(param1, idx)}
        >
          차단키워드
        </MDButton>
        <MDButton
          variant="outlined"
          color="dark"
          onClick={(evnet) => DetailedSettingsHandler(param1, idx)}
        >
          세부설정
        </MDButton>
      </MDBox>
    );
  };

  const getList = () => {
    serverCommunicationUtil("main", "axioGet", "/landingPageManage/list", {})
      .then((result) => {
        setRows(result.rows);

        var columnsData = [];
        for (var i = 0; i < result.keyList.length; i++) {
          var key = result.keyList[i];

          switch (key) {
            case "사용유무":
              columnsData.push({
                name: key,
                width: "10%",
                type: "switch",
                switchParam: [],
                switchFunction: (cdbtCode, rowIdx, switchValue) =>
                  useYnSwitch(cdbtCode, rowIdx, switchValue),
              });
              break;
            default:
              columnsData.push({ name: key, width: "30%", type: "text" });
              break;
          }
        }

        columnsData.push({
          name: "기타 설정 사항",
          width: "30%",
          type: "customCell",
          customCellParam: [],
          customCellContent: customCellContents,
        });

        setColumns(columnsData);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    sessionChecker()
      .then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
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
        <MDBox display="flex" justifyContent="space-between">
          <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
            <MDTypography variant="h4" fontWeight="medium">
              랜딩페이지 관리
            </MDTypography>
            <MDTypography variant="body2" color="text" fontWeight="regular">
              랜딩페이지 목록 및 랜딩페이지 관리화면입니다.
            </MDTypography>
          </MDBox>
          <MDBox display="block" style={{ textAlign: "center" }} p={2}>
            <MDButton
              variant="gradient"
              color="info"
              style={{ whiteSpace: "nowrap", marginTop: "20%" }}
              size="large"
              onClick={() => handleCreatModalOpen()}
            >
              <Icon>add</Icon>
              &nbsp;신규 생성
            </MDButton>
          </MDBox>
        </MDBox>
        <Card>
          <DrivenTable
            rows={rows}
            columns={columns}
            useDel={false}
            useModify={false}
            useSearch={true}
            useSort={true}
            usePaging={true}
            useCustomCell={true}
            entries={["10", "25", "50", "100"]}
          />
        </Card>
      </MDBox>
      <Footer />
      {creatModalOpen && (
        <CreateModal
          open={creatModalOpen}
          handleClose={handleCreatModalClose}
          setAlertColor={setAlertColor}
          setAlertText={setAlertText}
          setUseAlert={setUseAlert}
          getList={getList}
        />
      )}
      {blockIpModalOpen && (
        <BlockIpModal
          open={blockIpModalOpen}
          handleClose={handleBlockIpModalClose}
          setAlertColor={setAlertColor}
          setAlertText={setAlertText}
          setUseAlert={setUseAlert}
          code={selectCode}
        />
      )}
      {blockKeywordModalOpen && (
        <BlockKeywordModal
          open={blockKeywordModalOpen}
          handleClose={handleBlockKeywordModalClose}
          setAlertColor={setAlertColor}
          setAlertText={setAlertText}
          setUseAlert={setUseAlert}
          code={selectCode}
        />
      )}
      {detailSettingsModalOpen && (
        <DetailSettingsModal
          open={detailSettingsModalOpen}
          handleClose={handleDetailSettingsModalClose}
          setAlertColor={setAlertColor}
          setAlertText={setAlertText}
          setUseAlert={setUseAlert}
          code={selectCode}
        />
      )}
    </DashboardLayout>
  );
}

export default LandingPageManagement;
