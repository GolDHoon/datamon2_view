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
function UserInfo({ formData, valueMap, setValueMap }) {
  const { formField, values, errors, touched } = formData;
  const { ID, PW, company, corporateNumber, name, item, status, email, address } = formField;
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
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.idValue}
              error={errors.ID && touched.ID}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.idValue.length > 0 && !errors.ID}
              onChange={(event) => setValueMap({ ...valueMap, idValue: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={PW.type}
              label={PW.label}
              name={PW.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.pwValue}
              error={errors.PW && touched.PW}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.pwValue.length > 0 && !errors.PW}
              onChange={(event) => setValueMap({ ...valueMap, pwValue: event.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={company.type}
              label={company.label}
              name={company.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.companyValue}
              error={errors.company && touched.company}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.companyValue.length > 0 && !errors.company}
              onChange={(event) => setValueMap({ ...valueMap, companyValue: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={corporateNumber.type}
              label={corporateNumber.label}
              name={corporateNumber.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.corporateNumberValue}
              error={errors.corporateNumber && touched.corporateNumber}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.corporateNumberValue.length > 0 && !errors.corporateNumber}
              onChange={(event) =>
                setValueMap({ ...valueMap, corporateNumberValue: event.target.value })
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={name.type}
              label={name.label}
              name={name.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.nameValue}
              error={errors.name && touched.name}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.nameValue.length > 0 && !errors.name}
              onChange={(event) => setValueMap({ ...valueMap, nameValue: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={address.type}
              label={address.label}
              name={address.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.addressValue}
              error={errors.address && touched.address}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.addressValue.length > 0 && !errors.address}
              onChange={(event) => setValueMap({ ...valueMap, addressValue: event.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={item.type}
              label={item.label}
              name={item.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.itemValue}
              error={errors.item && touched.item}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.itemValue.length > 0 && !errors.item}
              onChange={(event) => setValueMap({ ...valueMap, itemValue: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={status.type}
              label={status.label}
              name={status.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.statusValue}
              error={errors.status && touched.status}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.statusValue.length > 0 && !errors.PW}
              onChange={(event) => setValueMap({ ...valueMap, statusValue: event.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.emailValue}
              error={errors.email && touched.email}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.emailValue.length > 0 && !errors.PW}
              onChange={(event) => setValueMap({ ...valueMap, emailValue: event.target.value })}
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
