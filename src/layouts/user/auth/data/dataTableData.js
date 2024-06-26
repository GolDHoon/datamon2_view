import IdxCell from "layouts/user/auth/components/IdxCell";
import DefaultCell from "layouts/user/auth/components/DefaultCell";
import StatusCell from "layouts/user/auth/components/StatusCell";

const dataTableData = (data, keyList) => {
  let columns = keyList.map((key) => {
    if (["전체열람", "열람", "수정"].includes(key)) {
      return {
        Header: key,
        accessor: key,
        /* eslint-disable react/prop-types */
        Cell: ({ value }) => <StatusCell value={value} />,
        /* eslint-enable react/prop-types */
      };
    } else {
      return {
        Header: key,
        accessor: key,
        /* eslint-disable react/prop-types */
        Cell: ({ value }) => <DefaultCell value={value} />,
        /* eslint-enable react/prop-types */
      };
    }
  });

  columns.push({
    Header: "",
    accessor: "userIdx",
    /* eslint-disable react/prop-types */
    Cell: ({ value }) => <IdxCell idx={value} />,
    /* eslint-enable react/prop-types */
  });

  return {
    columns,
    rows: data,
  };
};

export default dataTableData;
