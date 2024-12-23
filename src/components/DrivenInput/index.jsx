import MDInput from "../MDInput";
import PropTypes from "prop-types";
import MDTypography from "../MDTypography";
import MDBox from "../MDBox";
import { InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function DrivenInput(props) {
  const { type, label, variant, size, onChange, valiBool, errorMessage, selectItems, value } =
    props;

  return (
    <MDBox sx={{ width: "100%" }}>
      {type !== "select" && type !== "multiline" && (
        <>
          <MDInput
            fullWidth
            {...(type && { type })}
            {...(label && { label })}
            {...(value && { value })}
            {...(variant && { variant })}
            {...(valiBool !== undefined && { error: !valiBool })}
            {...(valiBool === undefined && { success: valiBool })}
            {...(size && { size })}
            {...(onChange && {
              onChange: (event) => {
                onChange(event);
              },
            })}
          />
          {errorMessage && !valiBool && (
            <MDTypography variant="caption" color={valiBool ? "success" : "error"}>
              {errorMessage}
            </MDTypography>
          )}
        </>
      )}
      {type === "multiline" && (
        <>
          <MDInput
            fullWidth
            multiline
            {...(label && { label })}
            {...(value && { value })}
            {...(valiBool !== undefined && { error: !valiBool })}
            {...(valiBool === undefined && { success: valiBool })}
            {...(onChange && {
              onChange: (event) => {
                onChange(event);
              },
            })}
          />
          {errorMessage && !valiBool && (
            <MDTypography variant="caption" color={valiBool ? "success" : "error"}>
              {errorMessage}
            </MDTypography>
          )}
        </>
      )}
      {type === "select" && (
        <>
          <InputLabel id="select-label">{label}</InputLabel>
          <Select
            labelId="select-label"
            fullWidth
            defaultValue={`init`}
            {...(type && { type })}
            {...(label && { label })}
            {...(variant && { variant })}
            {...(value && { value })}
            {...(size && { size })}
            {...(valiBool !== undefined && { error: !valiBool })}
            {...(valiBool === undefined && { success: valiBool })}
            {...(onChange && {
              onChange: (event) => {
                onChange(event);
              },
            })}
          >
            <MenuItem value={`init`} disabled={true}>
              <em>선택해주세요</em>
            </MenuItem>
            {selectItems.map((selectItem, index) => (
              <MenuItem value={selectItem.value} key={index}>
                {selectItem.key}
              </MenuItem>
            ))}
          </Select>
          {errorMessage && !valiBool && (
            <MDTypography variant="caption" color={valiBool ? "success" : "error"}>
              {errorMessage}
            </MDTypography>
          )}
        </>
      )}
    </MDBox>
  );
}
DrivenInput.defaultProps = {
  label: "입력해주세요",
};

DrivenInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  valiBool: PropTypes.bool,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  selectItems: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
