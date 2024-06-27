/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
// ProductsList page components
import IdxCell from "../../../landingPage/manage/components/IdxCell";
import DefaultCell from "../../../landingPage/manage/components/DefaultCell";
import StatusCell from "../components/StatusCell";

const dataTableData = (data, keyList) => {
  let result = {};
  let columns = [];
  for (var i = 0; i < keyList.length; i++) {
    if (keyList[i] === "사용유무") {
      columns.push({
        Header: keyList[i],
        accessor: keyList[i],
        Cell: ({ value }) => <StatusCell value={value} />,
      });
    } else {
      columns.push({
        Header: keyList[i],
        accessor: keyList[i],
        Cell: ({ value }) => <DefaultCell value={value} />,
      });
    }
  }
  columns.push({
    Header: "",
    accessor: "code",
    Cell: ({ value }) => <IdxCell code={value} />,
  });

  result.columns = columns;
  result.rows = data;
  return result;
};

export default dataTableData;
