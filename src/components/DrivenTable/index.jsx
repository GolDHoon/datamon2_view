import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MDBox from "../MDBox";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "../MDInput";
import MDTypography from "../MDTypography";
import MDPagination from "../MDPagination";
import Icon from "@mui/material/Icon";
import MDButton from "../MDButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBadge from "../MDBadge";
import { NativeSelect } from "@mui/material";
import Switch from "@mui/material/Switch";

const tableCellStyle = (wdith) => ({
  width: `${wdith}`,
  whiteSpace: "nowrap",
  overflowX: "hidden",
  textOverflow: "ellipsis",
  borderBottom: "none",
  margin: "auto 0px",
});
const tableRow = {
  display: "flex",
  // justifyContent: "space-around",
  // width: "100%",
  borderBottom: "1px solid rgba(224,224,224,1)",
};

export default function DrivenTable(props) {
  const {
    rows,
    columns,
    entries,
    usePaging,
    useSearch,
    useDel,
    handleDel,
    useModify,
    handleModify,
    useSort,
    useCustomCell,
  } = props;

  if (Object.keys(columns).length === 0) {
    return null;
  }

  if (Object.keys(rows).length === 0) {
    return null;
  }

  const [rowsData, setRowsData] = useState(rows);
  const [columnsData, setColumnsData] = useState(columns);
  const [entriesData, setEntriesData] = useState(entries);
  const [pageSize, setPageSize] = useState(entriesData[0]);
  const [usePagination, setUsePagination] = useState(false);
  const [pagination, setPagination] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [displayRowsData, setDisplayRowsData] = useState(rowsData);
  const [selectSearch, setSelectSearch] = useState();
  const [filterList, setFilterList] = useState([]);
  const [useDataFunction, setUseDataFunction] = useState(false);
  const [sortOrder, setSortOrder] = useState([]);
  const [menu, setMenu] = useState(null);
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const handleSerchFilterAdd = (keyword) => {
    let filterListData = [...filterList]; // filterList copy
    filterListData.push({ column: selectSearch, keyword: keyword });

    var newRowsData = [...rows]; // rows copy
    for (var i = 0; i < filterListData.length; i++) {
      for (var j = 0; j < newRowsData.length; j++) {
        if (!newRowsData[j][filterListData[i].column].includes(filterListData[i].keyword)) {
          newRowsData.splice(j, 1);
          j--;
        }
      }
    }

    setFilterList(filterListData);
    setRowsData(newRowsData);
  };

  const handleSerchFilterDelete = (filter) => {
    let filterListData = [];

    for (var i = 0; i < filterList.length; i++) {
      if (
        !filterList[i]["column"] === filter["column"] &&
        filterList[i]["keyword"] === filter["keyword"]
      ) {
        filterListData.push(filterList[i]);
      }
    }

    var newRowsData = [...rows]; // rows copy
    for (var i = 0; i < filterListData.length; i++) {
      for (var j = 0; j < newRowsData.length; j++) {
        if (!newRowsData[j][filterListData[i].column].includes(filterListData[i].keyword)) {
          newRowsData.splice(j, 1);
          j--;
        }
      }
    }

    setFilterList(filterListData);
    setRowsData(newRowsData);
  };

  const handelAscSort = (index) => {
    var newColumnsData = [...columnsData];
    newColumnsData[index].sort = "asc";
    newColumnsData[index].sortalbe = true;
    setColumnsData(newColumnsData);

    var newSortOrder = [...sortOrder];

    for (var i = 0; i < newSortOrder.length; i++) {
      if (newSortOrder[i] === newColumnsData[index].name) {
        newSortOrder.splice(i, 1);
        break;
      }
    }
    newSortOrder.push(newColumnsData[index].name);
    setSortOrder(newSortOrder);

    sortedRows();
  };
  const handelDescSort = (index) => {
    var newColumnsData = [...columnsData];
    newColumnsData[index].sort = "desc";
    newColumnsData[index].sortalbe = true;
    setColumnsData(newColumnsData);

    var newSortOrder = [...sortOrder];

    for (var i = 0; i < newSortOrder.length; i++) {
      if (newSortOrder[i] === newColumnsData[index].name) {
        newSortOrder.splice(i, 1);
        break;
      }
    }
    newSortOrder.push(newColumnsData[index].name);
    setSortOrder(newSortOrder);

    sortedRows();
  };

  const sortedRows = () => {
    var newRowsData = [...rowsData];
    for (var i = 0; i < sortOrder.length; i++) {
      for (var j = 0; j < columnsData.length; j++) {
        if (columnsData[j].name === sortOrder[i]) {
          if (columnsData[j].sortalbe) {
            if (columnsData[j].sort === "asc") {
              newRowsData.sort((a, b) =>
                a[columnsData[j].name].localeCompare(b[columnsData[j].name])
              );
            } else {
              newRowsData.sort((a, b) =>
                b[columnsData[j].name].localeCompare(a[columnsData[j].name])
              );
            }
          }
        }
      }
    }
    setRowsData(newRowsData);
  };

  const handleSortOrderDelet = (itemName) => {
    var newSortOrder = [...sortOrder];

    for (var i = 0; i < newSortOrder.length; i++) {
      if (newSortOrder[i] === itemName) {
        newSortOrder.splice(i, 1);
        break;
      }
    }

    setSortOrder(newSortOrder);

    var newColumnsData = [...columnsData];
    for (var i = 0; i < columnsData.length; i++) {
      if (newColumnsData[i].name === itemName) {
        newColumnsData[i].sort = "";
        newColumnsData[i].sortalbe = false;
        break;
      }
    }

    setColumnsData(newColumnsData);
  };

  useEffect(() => {
    if (useDel) setUseDataFunction(true);
    if (useModify) setUseDataFunction(true);
    if (!useDel && !useModify) setUseDataFunction(false);
    // debugger;
    setRowsData(rows);
    setEntriesData(entries);
    setSelectedPage(1);
    setSortOrder([]);
  }, [rows]);

  useEffect(() => {
    var newColumnsData = [];
    for (var i = 0; i < columns.length; i++) {
      var newColumns = columns[i];
      newColumns.sort = "";
      newColumns.sortalbe = false;
      newColumnsData.push(newColumns);
    }
    setColumnsData(newColumnsData);
  }, []);

  useEffect(() => {}, [filterList, sortOrder]);

  useEffect(() => {
    if (usePaging) {
      setUsePagination(rowsData.length / parseInt(pageSize) > 1);

      let firstDataIndex = selectedPage - 1;
      firstDataIndex = firstDataIndex * parseInt(pageSize);
      let lastDataIndex = selectedPage * parseInt(pageSize);

      setDisplayRowsData(
        rowsData.slice(
          firstDataIndex,
          lastDataIndex > rowsData.length ? rowsData.length : lastDataIndex
        )
      );

      let paginationData = [];

      let pages = rowsData.length / parseInt(pageSize);

      for (var i = 1; i <= (Number.isInteger(pages) ? pages : Math.floor(pages) + 1); i++) {
        paginationData.push(i);
      }

      setPagination(paginationData);

      if (selectedPage > pagination.length && pagination.length !== 0) {
        setSelectedPage(pagination.length);
      }
    }
  }, [rowsData, pageSize, selectedPage, rows]);

  const renderBadge = (itemName) => {
    let sortIndex = sortOrder.indexOf(itemName);
    if (sortIndex !== -1) {
      sortIndex = sortIndex + 1;
      return (
        <MDBadge
          key={itemName}
          badgeContent={`정렬순서 : ${sortIndex}`}
          sx={{ marginRight: "5px", display: "point", cursor: "pointer", userSelect: "none" }}
          onClick={() => {
            handleSortOrderDelet(itemName);
          }}
          container
          // color="primary"
          // max={999}
        />
      );
    }
  };

  const widthCss = (key) => {
    var width = 0;
    columns.forEach((column) => {
      if (!column.width.includes("%")) {
        width = width + Number(column.width.replace("px", ""));
      }
    });

    var widthStr = "";

    if (width === 0) {
      widthStr = "100%";
    } else {
      widthStr = width + "px";
    }

    if (key === "head") {
      return {
        width: widthStr,
        display: "flex",
        justifyContent: "space-between",
      };
    } else if (key === "common") {
      return {
        width: widthStr,
      };
    } else {
      return null;
    }
  };

  return (
    <MDBox sx={{ padding: "16px", overflowX: "auto" }}>
      {rows.length === 0 ? (
        <MDBox display={"flex"} justifyContent={"space-evenly"}>
          <MDTypography>데이터가 없습니다.</MDTypography>
        </MDBox>
      ) : (
        <>
          <MDBox>
            <MDBox sx={widthCss("head")}>
              <MDBox>
                {usePaging && (
                  <>
                    <Autocomplete
                      disableClearable
                      value={pageSize.toString()}
                      options={entries}
                      onChange={(event, newValue) => {
                        setPageSize(newValue);
                      }}
                      size="small"
                      sx={{ marginLeft: "16px", width: "5rem" }}
                      renderInput={(params) => <MDInput {...params} />}
                    />
                    <MDTypography variant="caption" color="secondary">
                      &nbsp;&nbsp;페이지 표시 선택
                    </MDTypography>
                  </>
                )}
              </MDBox>
              <MDBox>
                {useSearch && (
                  <MDBox display="flex">
                    <MDButton
                      variant={menu ? "outlined" : "contained"}
                      color="dark"
                      onClick={openMenu}
                      style={{ whiteSpace: "nowrap", marginRight: "10px" }}
                    >
                      검색필터
                      <Icon>keyboard_arrow_down</Icon>
                    </MDButton>
                    <Menu
                      anchorEl={menu}
                      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                      open={Boolean(menu)}
                      onClose={closeMenu}
                      keepMounted
                    >
                      <MDBox>
                        {columnsData.map((column) => (
                          <MenuItem
                            key={column.name}
                            onClick={() => {
                              setSelectSearch(column.name);
                              closeMenu();
                            }}
                          >
                            {column.name}
                          </MenuItem>
                        ))}
                      </MDBox>
                    </Menu>
                    <MDInput
                      placeholder={
                        selectSearch
                          ? `${selectSearch} 키워드 입력 후 enter`
                          : "검색필터를 선택해 주세요"
                      }
                      size="small"
                      disabled={!selectSearch}
                      fullWidth
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSerchFilterAdd(event.target.value);
                          event.target.value = "";
                        }
                      }}
                    />
                  </MDBox>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
          {useSearch && (
            <MDBox sx={widthCss("common")}>
              <MDBox sx={{ marginLeft: "16px" }}>
                {filterList.map((filter) => (
                  <MDBadge
                    key={`${filter.column} : ${filter.keyword}`}
                    badgeContent={`${filter.column} : ${filter.keyword}\u00A0\u00A0\u00A0X`}
                    sx={{
                      marginRight: "5px",
                      display: "point",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    onClick={() => {
                      handleSerchFilterDelete(filter);
                    }}
                    container
                  />
                ))}
              </MDBox>
            </MDBox>
          )}
          <MDBox sx={widthCss("common")}>
            <Table sx={{ overflowX: "scroll" }}>
              <TableHead>
                <TableRow style={tableRow}>
                  {columnsData.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.type !== "customCell" ? (
                        <>
                          <TableCell key={item.name} style={tableCellStyle(item.width)}>
                            <MDBox display={"flex"} justifyContent={"space-between"}>
                              {item.name}
                              <MDBox>{renderBadge(item.name)}</MDBox>
                            </MDBox>
                          </TableCell>
                          {useSort && (
                            <MDBox position="relative">
                              <MDBox
                                position="absolute"
                                top={"30%"}
                                right={"20px"}
                                sx={({ typography: { size } }) => ({
                                  fontSize: size.lg,
                                })}
                              >
                                <MDBox
                                  position="absolute"
                                  top={-6}
                                  color={item.sort === "asc" ? "text" : "secondary"}
                                  opacity={item.sort === "asc" ? 1 : 0.5}
                                  onClick={() => {
                                    handelAscSort(index);
                                  }}
                                >
                                  <Icon>arrow_drop_up</Icon>
                                </MDBox>
                                <MDBox
                                  position="absolute"
                                  top={0}
                                  color={item.sort === "desc" ? "text" : "secondary"}
                                  opacity={item.sort === "desc" ? 1 : 0.5}
                                  onClick={() => {
                                    handelDescSort(index);
                                  }}
                                >
                                  <Icon>arrow_drop_down</Icon>
                                </MDBox>
                              </MDBox>
                            </MDBox>
                          )}
                        </>
                      ) : (
                        <>
                          <TableCell key={item.name} style={tableCellStyle(item.width)}>
                            <MDBox display={"flex"} justifyContent={"space-between"}>
                              {item.name}
                              <MDBox>{renderBadge(item.name)}</MDBox>
                            </MDBox>
                          </TableCell>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                  {useDataFunction && (
                    <TableCell
                      key={"function"}
                      style={tableCellStyle("10%")}
                      sx={{ textAlign: "center" }}
                    >
                      데이터 변경
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody sx={{ display: "block", padding: "0px 16px 0px 16px" }}>
                {displayRowsData.map((row, index) => (
                  <TableRow key={`table-row-${index}`} style={tableRow}>
                    {columnsData.map((item) =>
                      row[item.name] ? (
                        <TableCell
                          key={`table-cell-${row.idx}-${item.name}-${index}`}
                          style={tableCellStyle(item.width)}
                          sx={{ fontSize: "0.85rem", fontWeight: "500" }}
                        >
                          {item.type === "text" && (
                            <MDTypography variant="caption" fontWeight={"bold"}>
                              {row[item.name]}
                            </MDTypography>
                          )}
                          {item.type === "select" && (
                            <NativeSelect
                              value={row[item.name]}
                              variant={"outlined"}
                              onChange={(event) => {
                                item.selectFunction(item.selectParam, row.idx, event.target.value);
                              }}
                            >
                              {item.selectList.map((select) => (
                                <option
                                  value={select.value}
                                  key={`table-cell-${row.idx}-${item.name}-${index}-${select.value}`}
                                >
                                  {select.text}
                                </option>
                              ))}
                            </NativeSelect>
                          )}
                          {item.type === "switch" && (
                            <>
                              {row[item.name] === "true" && (
                                <Switch
                                  checked={true}
                                  onClick={(event) => {
                                    item.switchFunction(
                                      item.switchParam,
                                      row.idx,
                                      event.target.checked
                                    );
                                  }}
                                ></Switch>
                              )}
                              {row[item.name] === true && (
                                <Switch
                                  checked={true}
                                  onClick={(event) => {
                                    item.switchFunction(
                                      item.switchParam,
                                      row.idx,
                                      event.target.checked
                                    );
                                  }}
                                ></Switch>
                              )}
                              {row[item.name] === "false" && (
                                <Switch
                                  checked={false}
                                  onClick={(event) => {
                                    item.switchFunction(
                                      item.switchParam,
                                      row.idx,
                                      event.target.checked
                                    );
                                  }}
                                ></Switch>
                              )}
                              {row[item.name] === false && (
                                <Switch
                                  checked={false}
                                  onClick={(event) => {
                                    item.switchFunction(
                                      item.switchParam,
                                      row.idx,
                                      event.target.checked
                                    );
                                  }}
                                ></Switch>
                              )}
                            </>
                          )}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={`table-cell-${row.idx}-${item.name}-${index}`}
                          style={tableCellStyle(item.width)}
                          sx={{ fontSize: "0.85rem", fontWeight: "500" }}
                        >
                          <MDTypography variant="caption" fontWeight={"bold"}></MDTypography>
                        </TableCell>
                      )
                    )}

                    {useCustomCell
                      ? columnsData.map(
                          (item) =>
                            item.type === "customCell" && (
                              <TableCell
                                key={`table-cell-${row.idx}-customCell-${index}`}
                                style={tableCellStyle(item.width)}
                                sx={{ fontSize: "0.85rem", fontWeight: "500" }}
                              >
                                {item.customCellContent(item.customCellParam, row.idx)}
                              </TableCell>
                            )
                        )
                      : null}

                    {useDataFunction && (
                      <TableCell
                        key={`table-cell-function-${row.idx}`}
                        style={tableCellStyle("10%")}
                        sx={{
                          fontSize: "0.85rem",
                          fontWeight: "500",
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {useDel && (
                          <MDButton
                            color={"error"}
                            size={"small"}
                            onClick={() => {
                              handleDel(row.idx);
                            }}
                          >
                            삭제
                          </MDButton>
                        )}
                        {useModify && (
                          <MDButton
                            color={"info"}
                            size={"small"}
                            onClick={() => {
                              handleModify(row.idx);
                            }}
                          >
                            수정
                          </MDButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </MDBox>
          <MDBox
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ marginTop: "20px" }}
            style={widthCss("common")}
          >
            <MDBox>
              <MDTypography variant="button" color="secondary" fontWeight="regular">
                총 {rowsData.length} 개 데이터, {pagination.length} 페이지 중 {selectedPage} 페이지
                출력중
              </MDTypography>
            </MDBox>
            <MDBox display={"flex"}>
              {usePagination && (
                <>
                  {selectedPage > 1 && (
                    <MDPagination>
                      <MDPagination
                        item
                        onClick={() => {
                          setSelectedPage(selectedPage - 1);
                        }}
                      >
                        <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                      </MDPagination>
                    </MDPagination>
                  )}
                  {pagination && (
                    <MDPagination>
                      {pagination.map((page) => (
                        <MDPagination
                          item
                          key={page}
                          onClick={() => setSelectedPage(page)}
                          active={selectedPage === page}
                        >
                          {page}
                        </MDPagination>
                      ))}
                    </MDPagination>
                  )}
                  {selectedPage < pagination.length && (
                    <MDPagination>
                      <MDPagination item onClick={() => setSelectedPage(selectedPage + 1)}>
                        <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                      </MDPagination>
                    </MDPagination>
                  )}
                </>
              )}
            </MDBox>
          </MDBox>
        </>
      )}
    </MDBox>
  );
}

DrivenTable.defaultProps = {
  rows: [],
  columns: [],
  entries: ["5", "10", "15", "20", "25"],
  usePaging: true,
  useSearch: true,
  useDel: false,
  handleDel: () => {},
  useModify: false,
  handleModify: () => {},
  useSort: true,
  useCustomCell: false,
};

DrivenTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  entries: PropTypes.array,
  usePaging: PropTypes.bool,
  useSearch: PropTypes.bool,
  useDel: PropTypes.bool,
  handleDel: PropTypes.func,
  useModify: PropTypes.bool,
  handleModify: PropTypes.func,
  useSort: PropTypes.bool,
  useCustomCell: PropTypes.bool,
};
