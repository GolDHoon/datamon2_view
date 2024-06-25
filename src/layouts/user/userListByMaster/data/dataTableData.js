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
import IdxCell from "layouts/user/userListByMaster/components/IdxCell";
import DefaultCell from "layouts/user/userListByMaster/components/DefaultCell";

const dataTableData = (data, keyList) => {
  let result = {};
  let columns = [];
  for (var i = 0; i < keyList.length; i++) {
    columns.push({
      Header: keyList[i],
      accessor: keyList[i],
      Cell: ({ value }) => <DefaultCell value={value} />,
    });
  }
  columns.push({
    Header: "",
    accessor: "userIdx",
    Cell: ({ value }) => <IdxCell idx={value} />,
  });

  result.columns = columns;
  result.rows = data;
  return result;
};

export default dataTableData;
