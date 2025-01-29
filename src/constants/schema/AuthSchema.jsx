import * as yup from 'yup'


export const authSchema = yup.object({
    email: yup.string().email("please enter a valid email").required("Email cannot be blank"),
    username: yup.string("please enter a valid Username").required("Username cannot be blank"),
    password: yup.string()
        .required("Password cannot be blank")
        .min(6, "Password length must not be less than 6")
        .matches(
            /^(?=.*[a-z])/,
            "Password must Contain One Lowercase Character"
        )
        .matches(
        /^(?=.*[A-Z])/,
            "Password must Contain One Uppercase Character"
        )
        .matches(
        /^(?=.*[0-9])/,
            "Password must Contain One Number Character"
        )
        .matches(
        /^(?=.*[!@#\$%\^&\*])/,
        "  Password must Contain  One Special Case Character"
        )
        ,
        confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match').required('Passwords must match')
})

export const loginSchema = yup.object({
    email: yup.string().email("please enter a valid email").required("Email cannot be blank"),
    password: yup.string()
        .required("Password cannot be blank")
        .min(6, "Password length must not be less than 6")
        // .matches(
        //     /^(?=.*[a-z])/,
        //     "Password must Contain One Lowercase Character"
        // )
        // .matches(
        // /^(?=.*[A-Z])/,
        //     "Password must Contain One Uppercase Character"
        // )
        // .matches(
        // /^(?=.*[0-9])/,
        //     "Password must Contain One Number Character"
        // )
        // .matches(
        // /^(?=.*[!@#\$%\^&\*])/,
        // "  Password must Contain  One Special Case Character"
        // )
})