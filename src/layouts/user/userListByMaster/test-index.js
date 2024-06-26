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

import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import * as React from "react";

// formik components
import { Form, Formik } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";

import { useState } from "react";

// NewUser page components
import Address from "layouts/login/components/pages/users/new-user/components/Address";
import Profile from "layouts/login/components/pages/users/new-user/components/Profile";
import Socials from "layouts/login/components/pages/users/new-user/components/Socials";
import UserInfo from "layouts/login/components/pages/users/new-user/components/UserInfo";

import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";

function NewUser() {
  const { formId, formField } = form;

  const handleClose = () => setOpen(false);

  const handleSubmit = (values, actions) => {};

  return (
    <MDBox id="thisIsPopup">
      <MDBox id="thisIsDim">
        <MDBox>
          <Grid container justifyContent="center" alignItems="center">
            <Grid width="100%">
              <Formik
                initialValues={initialValues}
                validationSchema={validations}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting }) => (
                  <Form id={formId} autoComplete="off">
                    <MDBox>
                      <UserInfo formData={{ values, touched, formField, errors }} />
                      <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                        <MDButton variant="gradient" color="info" style={{ margin: "0 2% 0 0" }}>
                          완료
                        </MDButton>
                        <MDButton MDButton color="black" onClick={handleClose}>
                          취소
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default NewUser;
