import { requestMaker } from "../api-common";

type autoToken_Request = {
  body: {
    username;
    password;
    grant_type;
  };
};

export type authToken_Response = {
  access;
  refresh;
  expires;
};

export const authToken = requestMaker<autoToken_Request, authToken_Response>({
  id: "authToken",
  path: "/auth/token",
  verb: "POST",
  parameters: [{ name: "body", in: "body", required: true }]
});
