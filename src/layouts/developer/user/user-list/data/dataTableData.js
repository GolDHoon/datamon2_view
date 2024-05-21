/* eslint-disable react/prop-types */
// ProductsList page components
import IdxCell from "layouts/developer/user/user-list/components/IdxCell";
import DefaultCell from "layouts/developer/user/user-list/components/DefaultCell";
import StatusCell from "layouts/developer/user/user-list/components/StatusCell";
import CustomerCell from "layouts/developer/user/user-list/components/CustomerCell";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";

const dataTableData = (data) => {
  return {
    columns: [
      {
        Header: "userId",
        accessor: "userId",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "userPw",
        accessor: "userPw",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "salt",
        accessor: "salt",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "userType",
        accessor: "userType",
        Cell: ({ value }) => {
          let status;

          switch (value) {
            case "USER_MAST":
              status = <StatusCell status="마스터계정" />;
              break;
            case "USER_DEVL":
              status = <StatusCell status="개발자계정" />;
              break;
            case "USER_INME":
              status = <StatusCell status="내부직원계정" />;
              break;
            case "USER_CLNT":
              status = <StatusCell status="클라이언트계정" />;
              break;
            case "USER_ADAC":
              status = <StatusCell status="에이전시 계정" />;
              break;
            case "USER_CLME":
              status = <StatusCell status="클라이언트 직원 계정" />;
              break;
            case "USER_AAME":
              status = <StatusCell status="에이전시 직원 계정" />;
              break;
            case "USER_CRAC":
              status = <StatusCell status="CRM 계정" />;
              break;
            case "USER_CAME":
              status = <StatusCell status="CRM 직원 계정" />;
              break;
          }

          return status;
        },
      },
      {
        Header: "idx",
        accessor: "idx",
        Cell: ({ value }) => <CustomerCell value={value} />,
      },
    ],
    rows: data,
  };
};

export default dataTableData;
