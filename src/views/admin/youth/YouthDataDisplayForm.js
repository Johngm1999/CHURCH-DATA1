import React from "react";
import { Formik, Form, Field } from "formik";
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
} from "@mui/material";

const ReadOnlyTextField = ({ label, value, ...rest }) => {
    return (
        <TextField
            label={label}
            value={value}
            InputProps={{
                readOnly: true,
                style: {
                    backgroundColor: "#f5f5f5",
                },
            }}
            variant="outlined" // You can use 'filled' or 'standard' as well
            fullWidth
            {...rest}
        />
    );
};

const YouthDataDisplayForm = ({ updateValues }) => {
    const initialValues = updateValues;

    return (
        <Formik initialValues={initialValues}>
            {({ values, setFieldValue, errors, touched }) => (
                <Form>
                    <Grid item xs={12} sm={6} my={2}>
                        <ReadOnlyTextField
                            label="Form Number"
                            value={updateValues.formNumber}
                        />
                    </Grid>
                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#1976d2", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Personal Information
                    </FormLabel>

                    {/* Full Name and Date of Birth in the same row */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Full Name"
                                value={updateValues.fullName}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Date of Birth"
                                value={updateValues.dateOfBirth}
                            />
                        </Grid>
                    </Grid>

                    {/* Age and Gender */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Age"
                                value={updateValues.age}
                            />
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
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
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
                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#1976d2", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Contact Information
                    </FormLabel>
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Permanent Address"
                                value={updateValues.permanentAddress}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Current Address"
                                value={updateValues.currentAddress}
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>

                    {/* Mobile Number and WhatsApp Number */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Mobile Number"
                                value={updateValues.mobileNumber}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Whatsapp Number"
                                value={updateValues.whatsappNumber}
                            />
                        </Grid>
                    </Grid>

                    {/* Email and Educational Qualification */}

                    <Grid item xs={12} sm={6} mb={2}>
                        <ReadOnlyTextField
                            label="Email Address (if available)"
                            value={updateValues.email}
                        />
                    </Grid>

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#1976d2", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Educational Information
                    </FormLabel>
                    <Grid item xs={12} sm={6} my={2}>
                        <ReadOnlyTextField
                            label=" Highest Educational Qualification"
                            value={updateValues.educationalQualification}
                        />
                    </Grid>

                    {/* Current Occupation and Professional Details */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Current Occupation"
                                value={updateValues.currentOccupation}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Are you a Professional? Specify & Details"
                                value={updateValues.professionalDetails}
                            />
                        </Grid>
                    </Grid>

                    {/* Current Course and Pending Sacraments */}
                    <Grid spacing={2} my={2}>
                        <ReadOnlyTextField
                            label="Current Course (if any)"
                            value={updateValues.currentCourse}
                        />
                    </Grid>

                    {/* Sacraments Checkboxes */}
                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#1976d2", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
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
                                            disabled
                                            as={Checkbox}
                                        />
                                    }
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontWeight: 500,
                                                fontSize: "18px",
                                                WebkitTextFillColor: "#000", // Force text color in disabled state
                                                color: "#000", // For compatibility with browsers that use 'color'
                                            },
                                        },
                                    }}
                                    sx={{
                                        "& .Mui-disabled": {
                                            WebkitTextFillColor: "#000", // Override text color in disabled input
                                            color: "#000", // Fallback for other browsers
                                        },
                                    }}
                                    label="Baptism"
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="sacraments.confirmation"
                                            type="checkbox"
                                            disabled
                                            as={Checkbox}
                                        />
                                    }
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontWeight: 500,
                                                fontSize: "18px",
                                                WebkitTextFillColor: "#000", // Force text color in disabled state
                                                color: "#000", // For compatibility with browsers that use 'color'
                                            },
                                        },
                                    }}
                                    sx={{
                                        "& .Mui-disabled": {
                                            WebkitTextFillColor: "#000", // Override text color in disabled input
                                            color: "#000", // Fallback for other browsers
                                        },
                                    }}
                                    label="Confirmation"
                                />
                                <FormControlLabel
                                    control={
                                        <Field
                                            name="sacraments.holyCommunion"
                                            type="checkbox"
                                            disabled
                                            as={Checkbox}
                                        />
                                    }
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontWeight: 500,
                                                fontSize: "18px",
                                                WebkitTextFillColor: "#000", // Force text color in disabled state
                                                color: "#000", // For compatibility with browsers that use 'color'
                                            },
                                        },
                                    }}
                                    sx={{
                                        "& .Mui-disabled": {
                                            WebkitTextFillColor: "#000", // Override text color in disabled input
                                            color: "#000", // Fallback for other browsers
                                        },
                                    }}
                                    label="Holy Communion"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Pending Sacraments (if any)"
                                value={updateValues.pendingSacraments}
                            />
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
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
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
                                <ReadOnlyTextField
                                    label="Organisation Group"
                                    value={updateValues.organisationGroup}
                                />
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
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
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
                                <ReadOnlyTextField
                                    label="Parish Activity"
                                    value={updateValues.parishActivity}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#1976d2", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
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
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
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
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
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
                            <ReadOnlyTextField
                                label="Country & City"
                                value={updateValues.countryCity}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Contact Number"
                                value={updateValues.parishContact}
                            />
                        </Grid>
                    </Grid>

                    <ReadOnlyTextField
                        label="Residential Address"
                        value={updateValues.residentialAddress}
                        multiline
                        rows={4}
                    />

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
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        disabled
                                        slotProps={{
                                            input: {
                                                style: {
                                                    fontWeight: 500,
                                                    fontSize: "18px",
                                                    WebkitTextFillColor: "#000", // Force text color in disabled state
                                                    color: "#000", // For compatibility with browsers that use 'color'
                                                },
                                            },
                                        }}
                                        sx={{
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000", // Override text color in disabled input
                                                color: "#000", // Fallback for other browsers
                                            },
                                        }}
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
                                <ReadOnlyTextField
                                    label="If Yes,Where do you attend Sunday Mass"
                                    value={updateValues.sundayMassLocation}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#1976d2", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Family Details
                    </FormLabel>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="House Name"
                                value={updateValues.houseName}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Parent's Name"
                                value={updateValues.parentsName}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Parent's Contact Number"
                                value={updateValues.parentsNumber}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Unit"
                                value={updateValues.unit}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Special Skills or Talents (music,sports..etc.)"
                                value={updateValues.specials}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <ReadOnlyTextField
                                label="Any health issues or disabilities we should be aware of"
                                value={updateValues.healthIssues}
                            />
                        </Grid>
                    </Grid>
                    <ReadOnlyTextField
                        label="Additional Information"
                        value={updateValues?.additionalInfo}
                        multiline
                        rows={4}
                    />

                    {/* Submit Button */}

                    {/* <FormSubmissionBtn onCancel={onCancel} /> */}
                </Form>
            )}
        </Formik>
    );
};

export default YouthDataDisplayForm;
