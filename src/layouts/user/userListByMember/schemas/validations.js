import checkout from "./form";
import * as Yup from "yup";

const {
  formField: { ID, PW, company, corporateNumber, name, item, status, email },
} = checkout;

const validations = [Yup.object().shape({})];

export default validations;
