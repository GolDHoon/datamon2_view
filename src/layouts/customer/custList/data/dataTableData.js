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
import IdCell from "layouts/customer/custList/components/IdxCell";
import DefaultCell from "layouts/customer/custList/components/DefaultCell";
import StatusCell from "layouts/customer/custList/components/StatusCell";
import CustomerCell from "layouts/customer/custList/components/CustomerCell";

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
    Header: "utmSourse",
    accessor: "utmSourse",
    Cell: ({ value }) => <DefaultCell value={value} />,
  });

  columns.push({
    Header: "utmMedium",
    accessor: "utmMedium",
    Cell: ({ value }) => <DefaultCell value={value} />,
  });

  columns.push({
    Header: "utmCampaign",
    accessor: "utmCampaign",
    Cell: ({ value }) => <DefaultCell value={value} />,
  });

  columns.push({
    Header: "utmTerm",
    accessor: "utmTerm",
    Cell: ({ value }) => <DefaultCell value={value} />,
  });

  columns.push({
    Header: "utmContent",
    accessor: "utmContent",
    Cell: ({ value }) => <DefaultCell value={value} />,
  });

  columns.push({
    Header: "생성일",
    accessor: "createDate",
    Cell: ({ value }) => <DefaultCell value={value} />,
  });

  columns.push({
    Header: "수정일",
    accessor: "modifyDate",
    Cell: ({ value }) => <DefaultCell value={value} />,
  });

  columns.push({
    Header: "사용유무",
    accessor: "useYn",
    Cell: ({ value }) => {
      let status;

      if (value) status = <StatusCell status="사용" />;
      else status = <StatusCell status="미사용" />;

      return status;
    },
  });

  result.columns = columns;
  result.rows = data;
  return result;
};

export default dataTableData;
