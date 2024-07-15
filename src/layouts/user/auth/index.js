// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import Card from "@mui/material/Card";
import DataTable from "layouts/user/auth/DataTable/index";
import CategoriesList from "layouts/user/auth/components/CategoriesList";
import Header from "layouts/user/auth/components/Header";
import dataTableData from "layouts/user/auth/data/dataTableData";
import { useEffect, useState } from "react";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../components/MDTypography";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";
import DrivenTable from "../../../components/DrivenTable";
import MDButton from "../../../components/MDButton";
import DrivenAlert from "../../../components/DrivenAlert";
import { useNavigate } from "react-router-dom";

function AuthMenagement() {
  const [showPage, setShowPage] = useState(false);
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);
  const [cdbtList, setCdbtList] = useState([]);
  const [selectedCdbt, setSelectedCdbt] = useState("");
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const navigate = useNavigate();

  const maskingViewSwitch = (param, idx, switchValue) => {
    serverCommunicationUtil("main", "axioPost", "/userAuth/modifyUserAuth", {
      idx: idx,
      usatCode: "AUTH_USAT_0000000005",
      cdbtLowCode: param[0],
      value: switchValue,
    })
      .then((result) => {
        onRowClick(param[0]);
        setAlertColor("success");
        setAlertText("권한수정이 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const totalViewSwitch = (param, idx, switchValue) => {
    serverCommunicationUtil("main", "axioPost", "/userAuth/modifyUserAuth", {
      idx: idx,
      usatCode: "AUTH_USAT_0000000004",
      cdbtLowCode: param[0],
      value: switchValue,
    })
      .then((result) => {
        onRowClick(param[0]);
        setAlertColor("success");
        setAlertText("권한수정이 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const selectAuth = (param, idx, auth) => {
    serverCommunicationUtil("main", "axioPost", "/userAuth/modifyUserAuth", {
      idx: idx,
      usatCode: auth,
      cdbtLowCode: param[0],
    })
      .then((result) => {
        onRowClick(param[0]);
        setAlertColor("success");
        setAlertText("권한수정이 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const outHandler = (param, idx) => {
    serverCommunicationUtil("main", "axioPost", "/userAuth/deleteUserCdbtMappingByCopanyAndCdbt", {
      userId: idx,
      cdbtCode: param[0],
    })
      .then((result) => {
        onRowClick(param[0]);
        setAlertColor("success");
        setAlertText("맴버삭제가 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const customCellContents = (param, idx) => {
    return (
      <MDBox display="flex" justifyContent={"space-evenly"}>
        <MDButton variant="outlined" color="dark" onClick={(evnet) => outHandler(param, idx)}>
          내보내기
        </MDButton>
      </MDBox>
    );
  };

  const onRowClick = (code) => {
    setSelectedCdbt(code);
    serverCommunicationUtil("main", "axioPost", "/userAuth/userListByCdbtCode", {
      cdbtCode: code,
    })
      .then((result) => {
        setRows(result.rows);

        var columnsData = [];
        for (var i = 0; i < result.keyList.length; i++) {
          var key = result.keyList[i];
          switch (key) {
            case "권한":
              columnsData.push({
                name: key,
                width: "20%",
                type: "select",
                selectParam: [code],
                selectList: [
                  { value: "AUTH_USAT_0000000001", text: "관리자" },
                  { value: "AUTH_USAT_0000000002", text: "편집자" },
                  { value: "AUTH_USAT_0000000003", text: "뷰어" },
                ],
                selectFunction: (cdbtCode, rowIdx, selectedValue) =>
                  selectAuth(cdbtCode, rowIdx, selectedValue),
              });
              break;
            case "전체조회":
              columnsData.push({
                name: key,
                width: "20%",
                type: "switch",
                switchParam: [code],
                switchFunction: (cdbtCode, rowIdx, switchValue) =>
                  totalViewSwitch(cdbtCode, rowIdx, switchValue),
              });
              break;
            case "마스킹 해제":
              columnsData.push({
                name: key,
                width: "20%",
                type: "switch",
                switchParam: [code],
                switchFunction: (cdbtCode, rowIdx, switchValue) =>
                  maskingViewSwitch(cdbtCode, rowIdx, switchValue),
              });
              break;
            default:
              columnsData.push({ name: key, width: "20%", type: "text" });
              break;
          }
        }

        columnsData.push({
          name: "맴버관리",
          width: "20%",
          type: "customCell",
          customCellParam: [code],
          customCellContent: customCellContents,
        });

        setColumns(columnsData);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    serverCommunicationUtil("main", "axioGet", "/userAuth/cdbtList", {})
      .then((result) => {
        var newCdbtList = [];
        result.forEach((data) => {
          newCdbtList.push({
            name: data.name,
            code: data.code,
            description: <></>,
          });
        });
        setCdbtList(newCdbtList);
      })
      .catch((error) => {
        console.log("");
      });
  }, [setCdbtList]);

  useEffect(() => {
    sessionChecker()
      .then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => navigate("/login"));
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  return (
    <DashboardLayout>
      {useAlert && <DrivenAlert alertColor={alertColor} alertText={alertText} />}
      <DashboardNavbar />
      <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
        <MDTypography variant="h4" fontWeight="medium">
          권한 관리자
        </MDTypography>
        <MDTypography variant="body2" color="text" fontWeight="regular">
          유저의 고객DB 권한을 관리하는 페이지입니다.
        </MDTypography>
      </MDBox>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Card>
              <CategoriesList
                categories={cdbtList}
                title="등록된 고객DB"
                onRowClick={onRowClick}
              ></CategoriesList>
            </Card>
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header
                    selectedCdbt={selectedCdbt}
                    reLoadHandler={() => onRowClick(selectedCdbt)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    {selectedCdbt && (
                      <DrivenTable
                        rows={rows}
                        columns={columns}
                        useDel={false}
                        useModify={false}
                        useSearch={true}
                        useSort={true}
                        usePaging={true}
                        useCustomCell={true}
                      />
                    )}
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AuthMenagement;
