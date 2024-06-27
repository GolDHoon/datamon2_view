// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// NewUser page components
import FormField from "../FormField";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function UserInfo({ formData, valueMap }) {
  const { formField, values, errors, touched } = formData;
  const { ID, PW, company, corporateNumber, name, item, status, email } = formField;
  const {
    ID: IDV = "",
    PW: PWV = "",
    company: companyV = "",
    corporateNumber: corporateNumberV = "",
    name: nameV = "",
    item: itemV = "",
    status: statusV = "",
    email: emailV = "",
  } = values;

  const [modValue, setModValue] = useState(values);

  const setIdHandler = (event) => {
    console.log(event.target.value);
    console.log(modValue);
    setModValue({ ...modValue, ID: event.target.value });
    console.log(modValue);
  };
  return (
    <MDBox>
      <MDBox>
        <MDTypography variant="h5">신규계정 생성</MDTypography>
        <MDTypography variant="button" color="text">
          신규계정을 생성하여 관리해 보세요.
        </MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={ID.type}
              label={ID.label}
              name={ID.name}
              value={IDV}
              error={errors.ID && touched.ID}
              success={IDV.length > 0 && !errors.ID}
              onChange={(evnet) => setIdHandler(evnet)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={PW.type}
              label={PW.label}
              name={PW.name}
              value={PWV}
              error={errors.PW && touched.PW}
              success={PWV.length > 0 && !errors.PW}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={company.type}
              label={company.label}
              name={company.name}
              value={companyV}
              error={errors.company && touched.company}
              success={companyV.length > 0 && !errors.company}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={corporateNumber.type}
              label={corporateNumber.label}
              name={corporateNumber.name}
              value={corporateNumberV}
              error={errors.corporateNumber && touched.corporateNumber}
              success={corporateNumberV.length > 0 && !errors.corporateNumber}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={name.type}
              label={name.label}
              name={name.name}
              value={nameV}
              error={errors.name && touched.name}
              success={nameV.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={item.type}
              label={item.label}
              name={item.name}
              value={itemV}
              error={errors.item && touched.item}
              success={itemV.length > 0 && !errors.item}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={status.type}
              label={status.label}
              name={status.name}
              value={statusV}
              error={errors.status && touched.status}
              success={statusV.length > 0 && !errors.status}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
UserInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserInfo;
