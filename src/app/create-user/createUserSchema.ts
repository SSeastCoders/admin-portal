import * as Yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;

// schema to validate form memebers
export const CreateUserSchema = Yup.object().shape({
username: Yup.string().matches(/^[a-z0-9A-Z]+$/, "username must be alphanumeric")
    .min(4, "username must be greater than 4 characters")
    .max(20, "username must less than 20 characters")
    .required(),
password: Yup.string()
    .required()
    .matches(PASSWORD_REGEX, "Password must contain a number, uppercase and be 7 characters long")
    .max(20, "Password must be less than 20 characters"),
//confirmPassword: Yup.string().required().when("password", {
//    is: (val: any) => (val && val.length > 0 ? true : false),
 //   then: Yup.string().oneOf([Yup.ref("password")], "Password does not match")
email: Yup.string().email("Must be a valid email").required()
//email: Yup.string().email("Must be a valid email").required()
//checked: Yup.bool().isTrue("Must agree to terms")
});
