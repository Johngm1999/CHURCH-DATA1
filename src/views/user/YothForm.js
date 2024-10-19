import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    FormGroup,
    FormHelperText,
    Grid,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "axios";
import FormSubmissionBtn from "../../components/FormSubmissionBtn";

const YouthDataCollectionForm = ({ onCancel, onAfterSubmit }) => {
    const initialValues = {
        formNumber: "",
        fullName: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        permanentAddress: "",
        currentAddress: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
        educationalQualification: "",
        currentOccupation: "",
        professionalDetails: "",
        currentCourse: "",
        sacraments: {
            baptism: false,
            confirmation: false,
            holyCommunion: false,
        },
        pendingSacraments: "",
        hasOrganisationGroup: "",
        organisationGroup: "",
        hasParishActivity: "",
        parishActivity: "",
        isOutsideParish: "",
        isStudent: "",
        countryCity: "",
        parishContact: "",
        residentialAddress: "",
        isAttendingSundayMass: "",
        sundayMassLocation: "",
        houseName: "",
        parentsName: "",
        parentsNumber: "",
        unit: "",
        specials: "",
        healthIssues: "",
    };

    const validationSchema = Yup.object({
        formNumber: Yup.string().required("Required"),
        fullName: Yup.string().required("Required"),
        dateOfBirth: Yup.string().required("Required"),
        age: Yup.number().required("Required"),
        gender: Yup.string().required("Required"),
        permanentAddress: Yup.string().required("Required"),
        mobileNumber: Yup.string().required("Required"),
        educationalQualification: Yup.string().required("Required"),
        currentOccupation: Yup.string(),
        professionalDetails: Yup.string(),
        currentCourse: Yup.string(),
        pendingSacraments: Yup.string(),
        hasOrganisationGroup: Yup.string().required("Required"),
        organisationGroup: Yup.string(),
        hasParishActivity: Yup.string().required("Required"),
        parishActivity: Yup.string(),
        isOutsideParish: Yup.string().required("Required"),
        isStudent: Yup.string().required("Required"),
        countryCity: Yup.string().required("Required"),
        parishContact: Yup.string().required("Required"),
        residentialAddress: Yup.string().required("Required"),
        isAttendingSundayMass: Yup.string().required("Required"),
        sundayMassLocation: Yup.string(),
        houseName: Yup.string().required("Required"),
        parentsName: Yup.string().required("Required"),
        parentsNumber: Yup.string().required("Required"),
        unit: Yup.string().required("Required"),
        specials: Yup.string(),
        healthIssues: Yup.string(),
    });

    const onSubmit = (values, { setSubmitting }) => {
        // axios
        //     .post(endpoint, values)
        //     .then(() => {
        //         onAfterSubmit();
        //     })
        //     .catch((err) => {
        //         showAlert(
        //             "error",
        //             err.response.data?.statusText || "Something went wrong"
        //         );
        //         console.log(err);
        //     })
        //     .finally((res) => setSubmitting(false));
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, setFieldValue, errors, touched }) => (
                <Form>
                    <Grid item xs={12} sm={6} my={2}>
                        <Field name="formNumber">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Form Number"
                                    {...field}
                                    error={
                                        touched.formNumber &&
                                        Boolean(errors.formNumber)
                                    }
                                    helperText={
                                        touched.formNumber && errors.formNumber
                                    }
                                />
                            )}
                        </Field>
                    </Grid>
                    <FormLabel component="legend">
                        Personal Information
                    </FormLabel>

                    {/* Full Name and Date of Birth in the same row */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="fullName">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        {...field}
                                        error={
                                            touched.fullName &&
                                            Boolean(errors.fullName)
                                        }
                                        helperText={
                                            touched.fullName && errors.fullName
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="dateOfBirth">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Date of Birth (DD/MM/YYYY)"
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        error={
                                            touched.dateOfBirth &&
                                            Boolean(errors.dateOfBirth)
                                        }
                                        helperText={
                                            touched.dateOfBirth &&
                                            errors.dateOfBirth
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    {/* Age and Gender */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="age">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        type="number"
                                        {...field}
                                        error={
                                            touched.age && Boolean(errors.age)
                                        }
                                        helperText={touched.age && errors.age}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl
                                component="fieldset"
                                error={touched.gender && Boolean(errors.gender)}
                            >
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={values.gender}
                                    onChange={(e) =>
                                        setFieldValue("gender", e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                </RadioGroup>
                                {touched.gender && (
                                    <FormHelperText>
                                        {errors.gender}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Permanent Address and Current Address */}
                    <FormLabel component="legend">
                        Contact Information
                    </FormLabel>
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="permanentAddress">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Permanent Address"
                                        multiline
                                        rows={4} // Adjust rows for larger text area
                                        {...field}
                                        error={
                                            touched.permanentAddress &&
                                            Boolean(errors.permanentAddress)
                                        }
                                        helperText={
                                            touched.permanentAddress &&
                                            errors.permanentAddress
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="currentAddress">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Current Address (if different)"
                                        multiline
                                        rows={4} // Adjust rows for larger text area
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    {/* Mobile Number and WhatsApp Number */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="mobileNumber">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Mobile Number"
                                        {...field}
                                        error={
                                            touched.mobileNumber &&
                                            Boolean(errors.mobileNumber)
                                        }
                                        helperText={
                                            touched.mobileNumber &&
                                            errors.mobileNumber
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="whatsappNumber">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="WhatsApp Number"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    {/* Email and Educational Qualification */}

                    <Grid item xs={12} sm={6} mb={2}>
                        <Field name="email">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Email Address (if available)"
                                    type="email"
                                    {...field}
                                />
                            )}
                        </Field>
                    </Grid>

                    <FormLabel component="legend">
                        Educational Information
                    </FormLabel>
                    <Grid item xs={12} sm={6} my={2}>
                        <FormControl
                            fullWidth
                            component="fieldset"
                            error={
                                touched.educationalQualification &&
                                Boolean(errors.educationalQualification)
                            }
                        >
                            <FormLabel component="legend">
                                Highest Educational Qualification
                            </FormLabel>
                            <Field name="educationalQualification">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        label="Highest Educational Qualification"
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "educationalQualification",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select your qualification</em>
                                        </MenuItem>
                                        {[
                                            {
                                                key: "Below 10th",
                                                value: "below_10th",
                                            },
                                            {
                                                key: "10th Pass",
                                                value: "10th_pass",
                                            },
                                            {
                                                key: "12th Pass",
                                                value: "12th_pass",
                                            },
                                            {
                                                key: "Graduate",
                                                value: "graduate",
                                            },
                                            {
                                                key: "Post Graduate",
                                                value: "post_graduate",
                                            },
                                            {
                                                key: "Diploma/Certification",
                                                value: "diploma_certification",
                                            },
                                            {
                                                key: "Other",
                                                value: "other",
                                            },
                                        ].map((option) => (
                                            <MenuItem
                                                value={option.value}
                                                key={option.value}
                                            >
                                                {option.key}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </Field>
                            {touched.educationalQualification && (
                                <FormHelperText>
                                    {errors.educationalQualification}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    {/* Current Occupation and Professional Details */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="currentOccupation">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Current Occupation/Profession"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="professionalDetails">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Are you a Professional? Specify & Details"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    {/* Current Course and Pending Sacraments */}
                    <Grid spacing={2} my={2}>
                        <Field name="currentCourse">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Current Course (if any)"
                                    {...field}
                                />
                            )}
                        </Field>
                    </Grid>

                    {/* Sacraments Checkboxes */}
                    <FormLabel component="legend">
                        Relegious Information
                    </FormLabel>
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormLabel component="legend">
                                    Sacraments Recieved
                                </FormLabel>
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="sacraments.baptism"
                                            type="checkbox"
                                            as={Checkbox}
                                        />
                                    }
                                    label="Baptism"
                                    sx={{
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.1)", // Change background color on hover
                                            borderRadius: "4px", // Add border-radius for rounded effect
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="sacraments.confirmation"
                                            type="checkbox"
                                            as={Checkbox}
                                        />
                                    }
                                    label="Confirmation"
                                    sx={{
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.1)", // Change background color on hover
                                            borderRadius: "4px", // Add border-radius for rounded effect
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="sacraments.holyCommunion"
                                            type="checkbox"
                                            as={Checkbox}
                                        />
                                    }
                                    label="Holy Communion"
                                    sx={{
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.1)", // Change background color on hover
                                            borderRadius: "4px", // Add border-radius for rounded effect
                                        },
                                    }}
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="pendingSacraments">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Pending Sacraments (if any)"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                component="fieldset"
                                error={
                                    touched.hasOrganisationGroup &&
                                    Boolean(errors.hasOrganisationGroup)
                                }
                            >
                                <FormLabel component="legend">
                                    Are you a member of any organization group
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="hasOrganisationGroup"
                                    value={values.hasOrganisationGroup}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "hasOrganisationGroup",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                                {touched.hasOrganisationGroup && (
                                    <FormHelperText>
                                        {errors.hasOrganisationGroup}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {values.hasOrganisationGroup === "yes" && (
                            <Grid item xs={12} sm={6}>
                                <Field name="organisationGroup">
                                    {({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Organisation Group"
                                            {...field}
                                            error={
                                                touched.organisationGroup &&
                                                Boolean(
                                                    errors.organisationGroup
                                                )
                                            }
                                            helperText={
                                                touched.organisationGroup &&
                                                errors.organisationGroup
                                            }
                                        />
                                    )}
                                </Field>
                            </Grid>
                        )}
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                component="fieldset"
                                error={
                                    touched.hasParishActivity &&
                                    Boolean(errors.hasParishActivity)
                                }
                            >
                                <FormLabel component="legend">
                                    Involvement in parish activity
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="hasParishActivity"
                                    value={values.hasParishActivity}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "hasParishActivity",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                                {touched.hasParishActivity && (
                                    <FormHelperText>
                                        {errors.hasParishActivity}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {values.hasParishActivity === "yes" && (
                            <Grid item xs={12} sm={6}>
                                <Field name="parishActivity">
                                    {({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Parish Activity"
                                            {...field}
                                            error={
                                                touched.parishActivity &&
                                                Boolean(errors.parishActivity)
                                            }
                                            helperText={
                                                touched.parishActivity &&
                                                errors.parishActivity
                                            }
                                        />
                                    )}
                                </Field>
                            </Grid>
                        )}
                    </Grid>

                    <FormLabel component="legend">
                        For Those Living Outside The Parish (if Applicable)
                    </FormLabel>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                component="fieldset"
                                error={
                                    touched.isOutsideParish &&
                                    Boolean(errors.isOutsideParish)
                                }
                            >
                                <FormLabel component="legend">
                                    Currently living/working/studying outside
                                    parish
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="isOutsideParish"
                                    value={values.isOutsideParish}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "isOutsideParish",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                                {touched.isOutsideParish && (
                                    <FormHelperText>
                                        {errors.isOutsideParish}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl
                                component="fieldset"
                                error={
                                    touched.isStudent &&
                                    Boolean(errors.isStudent)
                                }
                            >
                                <FormLabel component="legend">
                                    Are you a student
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="isStudent"
                                    value={values.isStudent}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "isStudent",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                                {touched.isStudent && (
                                    <FormHelperText>
                                        {errors.isStudent}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="countryCity">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Country & City"
                                        {...field}
                                        error={
                                            touched.countryCity &&
                                            Boolean(errors.countryCity)
                                        }
                                        helperText={
                                            touched.countryCity &&
                                            errors.countryCity
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="parishContact">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Contact Number"
                                        {...field}
                                        error={
                                            touched.parishContact &&
                                            Boolean(errors.parishContact)
                                        }
                                        helperText={
                                            touched.parishContact &&
                                            errors.parishContact
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Field name="residentialAddress">
                        {({ field }) => (
                            <TextField
                                fullWidth
                                label="Residential Address"
                                multiline
                                rows={4} // Adjust rows for larger text area
                                {...field}
                                error={
                                    touched.residentialAddress &&
                                    Boolean(errors.residentialAddress)
                                }
                                helperText={
                                    touched.residentialAddress &&
                                    errors.residentialAddress
                                }
                            />
                        )}
                    </Field>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                component="fieldset"
                                error={
                                    touched.isAttendingSundayMass &&
                                    Boolean(errors.isAttendingSundayMass)
                                }
                            >
                                <FormLabel component="legend">
                                    Are you attending sunday mass regularly
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="isAttendingSundayMass"
                                    value={values.isAttendingSundayMass}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "isAttendingSundayMass",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                                {touched.isAttendingSundayMass && (
                                    <FormHelperText>
                                        {errors.isAttendingSundayMass}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {values.isAttendingSundayMass === "yes" && (
                            <Grid item xs={12} sm={6}>
                                <Field name="sundayMassLocation">
                                    {({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="If Yes,Where do you attend Mass"
                                            {...field}
                                            error={
                                                touched.sundayMassLocation &&
                                                Boolean(
                                                    errors.sundayMassLocation
                                                )
                                            }
                                            helperText={
                                                touched.sundayMassLocation &&
                                                errors.sundayMassLocation
                                            }
                                        />
                                    )}
                                </Field>
                            </Grid>
                        )}
                    </Grid>

                    <FormLabel component="legend">Family Details</FormLabel>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="houseName">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="House Name"
                                        {...field}
                                        error={
                                            touched.houseName &&
                                            Boolean(errors.houseName)
                                        }
                                        helperText={
                                            touched.houseName &&
                                            errors.houseName
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="parentsName">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Parent's Name"
                                        {...field}
                                        error={
                                            touched.parentsName &&
                                            Boolean(errors.parentsName)
                                        }
                                        helperText={
                                            touched.parentsName &&
                                            errors.parentsName
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="parentsNumber">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Parent's Contact Number"
                                        {...field}
                                        error={
                                            touched.parentsNumber &&
                                            Boolean(errors.parentsNumber)
                                        }
                                        helperText={
                                            touched.parentsNumber &&
                                            errors.parentsNumber
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="unit">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Unit"
                                        {...field}
                                        error={
                                            touched.unit && Boolean(errors.unit)
                                        }
                                        helperText={touched.unit && errors.unit}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="specials">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Special Skills or Talents (music,sports..etc.)"
                                        {...field}
                                        error={
                                            touched.specials &&
                                            Boolean(errors.specials)
                                        }
                                        helperText={
                                            touched.specials && errors.specials
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="healthIssues">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Any health issues or disabilities we should be aware of"
                                        {...field}
                                        error={
                                            touched.healthIssues &&
                                            Boolean(errors.healthIssues)
                                        }
                                        helperText={
                                            touched.healthIssues &&
                                            errors.healthIssues
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    {/* Submit Button */}

                    <FormSubmissionBtn onCancel={onCancel} />
                    {/* {(isSubmitting || loading) && <Loader />} */}
                </Form>
            )}
        </Formik>
    );
};

export default YouthDataCollectionForm;
