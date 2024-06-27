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
  const { ID, PW, name, role, contactPhone, email } = formField;
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
              type={role.type}
              label={role.label}
              name={role.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.roleValue}
              error={errors.role && touched.role}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.roleValue.length > 0 && !errors.role}
              onChange={(event) => setValueMap({ ...valueMap, roleValue: event.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={contactPhone.type}
              label={contactPhone.label}
              name={contactPhone.name}
              /* eslint-disable-next-line react/prop-types */
              value={valueMap.contactPhoneValue}
              error={errors.contactPhone && contactPhone.item}
              /* eslint-disable-next-line react/prop-types */
              success={valueMap.contactPhoneValue.length > 0 && !errors.contactPhone}
              onChange={(event) =>
                setValueMap({ ...valueMap, contactPhoneValue: event.target.value })
              }
            />
          </Grid>
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
