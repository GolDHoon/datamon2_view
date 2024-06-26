import checkout from "./form";

const {
  formField: { ID, PW, company, corporateNumber, name, item, status, email },
} = checkout;

const initialValues = {
  [ID.name]: "",
  [PW.name]: "",
  [company.name]: "",
  [corporateNumber.name]: "1",
  [name.name]: "",
  [item.name]: "",
  [status.name]: "",
  [email.name]: "",
};

export default initialValues;
