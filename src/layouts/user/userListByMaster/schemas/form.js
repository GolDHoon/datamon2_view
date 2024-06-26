const form = {
  formId: "userList-master",
  formField: {
    ID: {
      name: "ID",
      label: "ID",
      type: "text",
      value: "",
      errorMsg: "아이디를 입력해 주세요.",
    },
    PW: {
      name: "PW",
      label: "PW",
      type: "password",
      value: "",
      errorMsg: "비밀번호를 입력해 주세요.",
    },
    company: {
      name: "company",
      label: "상호",
      type: "text",
      value: "",
      errorMsg: "상호를 입력해 주세요.",
    },
    corporateNumber: {
      name: "corporateNumber",
      label: "사업자등록번호",
      type: "text",
      value: "",
      errorMsg: "사업자등록번호를 입력해 주세요.",
      invalidMsg: "숫자만 입력해주세요.",
    },
    name: {
      name: "name",
      label: "대표자명",
      type: "text",
      value: "",
      errorMsg: "대표자명을 입력해 주세요",
    },
    address: {
      name: "address",
      label: "주소",
      type: "text",
      value: "",
      errorMsg: "주소를 입력해 주세요",
    },
    item: {
      name: "item",
      label: "품목",
      type: "text",
      value: "",
      errorMsg: "품목을 입력해 주세요",
    },
    status: {
      name: "status",
      label: "업태",
      type: "text",
      value: "",
      errorMsg: "업태를 입력해 주세요",
    },
    email: {
      name: "email",
      label: "메일",
      type: "email",
      value: "",
      errorMsg: "메일을 입력해 주세요.",
    },
  },
};

export default form;
