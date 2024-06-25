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
import IdxCell from "layouts/user/userListByMember/components/IdxCell";
import DefaultCell from "layouts/user/userListByMember/components/DefaultCell";
import StatusCell from "layouts/user/userListByMaster/components/StatusCell";
import CustomerCell from "layouts/user/userListByMaster/components/CustomerCell";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import ivana from "assets/images/ivana-squares.jpg";

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
