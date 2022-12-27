import { ADD_USER, GET_OTP } from "@/services/graphql/mutation";
import { VERIFY_OTP } from "@/services/graphql/queries";
import client from "apollo-client";

export const verifyOTP = async (otp, email) => {
  const { data } = await client.query({
    query: VERIFY_OTP,
    variables: {
      otp: otp,
      email: email,
    },
  });
  return data.verifyOTP;
};

// api to generate otp
export const getOtp = async (email) => {
  const { data } = await client.mutate({
    mutation: GET_OTP,
    variables: {
      email: email,
    },
  });
  return data.getOtp;
};

// api to register user
export const addUser = async (payload) => {
  const { data } = await client.mutate({
    mutation: ADD_USER,
    variables: {
      input: {
        name: payload.name || payload.email,
        email: payload.email,
        password: payload.password,
      },
    },
  });
  return data.createUser;
};
