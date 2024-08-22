import React, { useState } from "react";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import { serverCommunicationUtil } from "../../../common/util/serverCommunicationUtil";
import { DateTimePicker, LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { GlobalStyles } from "@mui/material";
import DrivenDateTimePicker from "../../../components/DrivenDateTimePicker";
import MDEditor from "../../../components/MDEditor"; // Korean locale import

// Set dayjs locale globally
dayjs.locale("ko");

const migration = () => {
  serverCommunicationUtil("main", "axioPost", "/developer/migration", {})
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("");
    });
};

function DeveloperTool() {
  const [dateTime, setDateTime] = useState();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDButton variant="gradient" color="info" onClick={() => migration()}>
          마이그레이션
        </MDButton>
        <MDBox>
          <Card>
            데이트 타임 피커
            <MDBox>
              <DrivenDateTimePicker
                ampm={false}
                // type={"list"}
                type={"analog"}
                minutesStep={5}
                label={"날짜를 선택해주세요"}
                // value={dateTime}
                // onChange={(event) => {
                //   setDateTime("2022-04-17T15:30");
                //   console.log(event);
                // }}
              />
            </MDBox>
            <MDEditor value="<h1>Quill</h1>" />
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default DeveloperTool;
