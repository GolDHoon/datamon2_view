const form = {
  formId: "userList-master",
  formField: {
    ID: {
      name: "ID",
      label: "ID",
      type: "text",
      errorMsg: "아이디를 입력해 주세요.",
    },
    PW: {
      name: "PW",
      label: "PW",
      type: "password",
      errorMsg: "비밀번호를 입력해 주세요.",
    },
    name: {
      name: "name",
      label: "담당자명",
      type: "text",
      errorMsg: "담당자명을 입력해 주세요",
    },
    role: {
      name: "role",
      label: "소속",
      type: "text",
      errorMsg: "소속을 입력해 주세요",
    },
    contactPhone: {
      name: "contactPhone",
      label: "연락처",
      type: "text",
      errorMsg: "연락처를 입력해 주세요",
    },
    email: {
      name: "email",
      label: "메일",
      type: "email",
      errorMsg: "메일을 입력해 주세요.",
    },
  },
};

export default form;
