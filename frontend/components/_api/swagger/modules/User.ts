import { requestMaker } from "../api-common";

export type userRequestCreate_Request = {
  email;
};

export type userRequestCreate_Response = {
  token; //enviado no e-mail, está aqui por testes
};

export const userRequestCreate = requestMaker<
  userRequestCreate_Request,
  userRequestCreate_Response
>({
  id: "userRequestCreate",
  path: "/user/request/create",
  verb: "POST",
  parameters: [{ name: "body", in: "body", required: true }]
});

export type userRequestConfirm_Request = {
  token;
  password;
};

export type userRequestConfirm_Response = {};

export const userRequestConfirm = requestMaker<
  userRequestConfirm_Request,
  userRequestConfirm_Response
>({
  id: "userRequestConfirm",
  path: "/user/request/confirm",
  verb: "POST",
  parameters: [{ name: "body", in: "body", required: true }]
});
