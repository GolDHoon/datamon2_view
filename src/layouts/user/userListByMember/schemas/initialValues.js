import checkout from "./form";

const {
  formField: { ID, PW, name, role, contactPhone, email },
} = checkout;

const initialValues = {
  [ID.name]: "",
  [PW.name]: "",
  [name.name]: "",
  [role.name]: "",
  [contactPhone.name]: "",
  [email.name]: "",
};

export default initialValues;
