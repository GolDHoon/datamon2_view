import checkout from "./form";
import * as Yup from "yup";

const {
  formField: { ID, PW, company, corporateNumber, name, item, status, email },
} = checkout;

const validations = [
  Yup.object().shape({
    [ID.name]: Yup.string().required(ID.errorMsg),
    [PW.name]: Yup.string().required(PW.errorMsg),
    [company.name]: Yup.string().required(company.errorMsg),
    [corporateNumber.name]: Yup.number().integer().required(corporateNumber.errorMsg),
    [name.name]: Yup.string().required(name.errorMsg),
    [item.name]: Yup.string().required(item.errorMsg),
    [status.name]: Yup.string().required(status.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg),
  }),
];

export default validations;
