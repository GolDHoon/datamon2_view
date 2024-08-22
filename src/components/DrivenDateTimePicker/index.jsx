import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { GlobalStyles } from "@mui/material";
import React, { useEffect, useState } from "react";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

dayjs.locale("ko");

function DrivenDateTimePicker(props) {
  const { type, ampm, timeSteps, minutesStep, onChange, value } = props;
  const [pickerValue, setPickerValue] = useState(value ? dayjs(value) : null);
  const [isControlled, setIsControlled] = useState(value !== undefined);

  useEffect(() => {
    if (value !== undefined) {
      setPickerValue(dayjs(value));
      setIsControlled(true);
    } else if (!isControlled) {
      setPickerValue(null);
    }
  }, [value]);

  const handleValueChange = (newValue) => {
    setPickerValue(newValue);
    setIsControlled(true);
    if (onChange) {
      onChange(newValue);
    }
  };

  const dateTimePickerProps = {
    ampm: ampm,
    timeSteps: timeSteps || {},
    minutesStep: minutesStep || 1,
    onChange: handleValueChange,
    value: pickerValue,
  };

  if (type === "analog") {
    dateTimePickerProps.viewRenderers = {
      hours: renderTimeViewClock,
      minutes: renderTimeViewClock,
    };
  }

  return (
    <>
      <GlobalStyles
        styles={{
          "ul.MuiList-root.MuiList-padding.MuiMultiSectionDigitalClockSection-root": {
            width: "100%",
            overflow: "scroll",
            scrollbarWidth: "none",
          },
          "ul.MuiList-root.MuiList-padding.MuiMultiSectionDigitalClockSection-root>li": {
            padding: "8px 16px",
            margin: "0 10px",
            minWidth: "0",
          },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DateTimePicker {...dateTimePickerProps} sx={{ width: "100%" }} />
      </LocalizationProvider>
    </>
  );
}

export default DrivenDateTimePicker;

DrivenDateTimePicker.defaultProps = {};

DrivenDateTimePicker.propTypes = {
  type: PropTypes.string,
  ampm: PropTypes.bool,
  timeSteps: PropTypes.object,
  minutesStep: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
