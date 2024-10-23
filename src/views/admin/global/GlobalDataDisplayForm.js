import React from "react";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    Grid,
    Select,
    MenuItem,
} from "@mui/material";
import FormSubmissionBtn from "../../../components/FormSubmissionBtn";

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

const GlobalForm = ({ onCancel, updateValues }) => {
    const initialValues = updateValues;

    return (
        <Formik initialValues={initialValues}>
            {({ values, setFieldValue, errors, touched }) => (
                <Form>
                    <Grid item xs={12} sm={6} my={2}>
                        <Field name="formNumber">
                            {({ field }) => (
                                <ReadOnlyTextField
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
                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Personal Information
                    </FormLabel>

                    {/* Full Name and Date of Birth in the same row */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="fullName">
                                {({ field }) => (
                                    <ReadOnlyTextField
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
                            <Field name="baptismName">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Baptism Name"
                                        {...field}
                                        error={
                                            touched.baptismName &&
                                            Boolean(errors.baptismName)
                                        }
                                        helperText={
                                            touched.baptismName &&
                                            errors.baptismName
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="houseName">
                                {({ field }) => (
                                    <ReadOnlyTextField
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
                            <Field name="dateOfBirth">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        type="date"
                                        label="Date of Birth (DD/MM/YYYY)"
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "dateOfBirth",
                                                e.target.value
                                            );
                                        }}
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
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="age">
                                {({ field }) => (
                                    <ReadOnlyTextField
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
                            <Field name="contactNumber">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Contact Number (India)"
                                        type="number"
                                        {...field}
                                        error={
                                            touched.contactNumber &&
                                            Boolean(errors.contactNumber)
                                        }
                                        helperText={
                                            touched.contactNumber &&
                                            errors.contactNumber
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="whatsAppNumber">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="whatsApp Number (India)"
                                        type="number"
                                        {...field}
                                        error={
                                            touched.whatsAppNumber &&
                                            Boolean(errors.whatsAppNumber)
                                        }
                                        helperText={
                                            touched.whatsAppNumber &&
                                            errors.whatsAppNumber
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="email">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Email Address"
                                        type="email"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <ReadOnlyTextField
                        label="Maritial Status"
                        value={updateValues.maritialStatus}
                    />

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Current Address (Abroad)
                    </FormLabel>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="country">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Country of Residence"
                                        {...field}
                                        error={
                                            touched.country &&
                                            Boolean(errors.country)
                                        }
                                        helperText={
                                            touched.country && errors.country
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="city">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="City"
                                        {...field}
                                        error={
                                            touched.city && Boolean(errors.city)
                                        }
                                        helperText={touched.city && errors.city}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Field name="streetAddress">
                            {({ field }) => (
                                <ReadOnlyTextField
                                    fullWidth
                                    label="Street Address"
                                    multiline
                                    rows={4} // Adjust rows for larger text area
                                    {...field}
                                    error={
                                        touched.streetAddress &&
                                        Boolean(errors.streetAddress)
                                    }
                                    helperText={
                                        touched.streetAddress &&
                                        errors.streetAddress
                                    }
                                />
                            )}
                        </Field>
                    </Grid>
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="postalCode">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Postal Code"
                                        {...field}
                                        error={
                                            touched.postalCode &&
                                            Boolean(errors.postalCode)
                                        }
                                        helperText={
                                            touched.postalCode &&
                                            errors.postalCode
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="contactNumberAbroad">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        type="number"
                                        label="Contact Number (Abroad)"
                                        {...field}
                                        error={
                                            touched.contactNumberAbroad &&
                                            Boolean(errors.contactNumberAbroad)
                                        }
                                        helperText={
                                            touched.contactNumberAbroad &&
                                            errors.contactNumberAbroad
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="whatsAppNumberAbroad">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        type="number"
                                        label="WhatsApp Number (Abroad)"
                                        {...field}
                                        error={
                                            touched.whatsAppNumberAbroad &&
                                            Boolean(errors.whatsAppNumberAbroad)
                                        }
                                        helperText={
                                            touched.whatsAppNumberAbroad &&
                                            errors.whatsAppNumberAbroad
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="emailAbroad">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Email Address (Abroad)"
                                        type="email"
                                        {...field}
                                        error={
                                            touched.emailAbroad &&
                                            Boolean(errors.emailAbroad)
                                        }
                                        helperText={
                                            touched.emailAbroad &&
                                            errors.emailAbroad
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Family Information (If living Abroad)
                    </FormLabel>

                    <Grid item xs={12} sm={6}>
                        <Field name="spouseName">
                            {({ field }) => (
                                <ReadOnlyTextField
                                    fullWidth
                                    label="Spouse's Name (if applicable)"
                                    {...field}
                                    error={
                                        touched.spouseName &&
                                        Boolean(errors.spouseName)
                                    }
                                    helperText={
                                        touched.spouseName && errors.spouseName
                                    }
                                />
                            )}
                        </Field>
                    </Grid>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="childrenNames">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Children's Names (if applicable)"
                                        multiline
                                        rows={4} // Adjust rows for larger text area
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field name="contacsOfFamily">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Contact number(s) of family members"
                                        multiline
                                        rows={4} // Adjust rows for larger text area
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        Work / study information
                    </FormLabel>

                    <Grid item xs={12} sm={6} my={2}>
                        <Field name="ocupationOrField">
                            {({ field }) => (
                                <ReadOnlyTextField
                                    fullWidth
                                    label="Occupation/Field of study"
                                    {...field}
                                    error={
                                        touched.ocupationOrField &&
                                        Boolean(errors.ocupationOrField)
                                    }
                                    helperText={
                                        touched.ocupationOrField &&
                                        errors.ocupationOrField
                                    }
                                />
                            )}
                        </Field>
                    </Grid>

                    <Grid item xs={12} sm={6} my={2}>
                        <Field name="currentEmployerOrInstitution">
                            {({ field }) => (
                                <ReadOnlyTextField
                                    fullWidth
                                    label="Current Employer/Institution"
                                    {...field}
                                    error={
                                        touched.ocupationOrField &&
                                        Boolean(errors.ocupationOrField)
                                    }
                                    helperText={
                                        touched.ocupationOrField &&
                                        errors.ocupationOrField
                                    }
                                />
                            )}
                        </Field>
                    </Grid>

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                        }}
                    >
                        church Affiliation
                    </FormLabel>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                component="fieldset"
                                error={
                                    touched.hasAffiliatedWithAnyChurch &&
                                    Boolean(errors.hasAffiliatedWithAnyChurch)
                                }
                            >
                                <FormLabel
                                    component="legend"
                                    sx={{ fontSize: 12 }}
                                >
                                    Are you a affiliated with any churches
                                    (Parish/Mass Centre)?
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="hasAffiliatedWithAnyChurch"
                                    value={values.hasAffiliatedWithAnyChurch}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "hasAffiliatedWithAnyChurch",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                        disabled
                                    />
                                </RadioGroup>
                                {touched.hasAffiliatedWithAnyChurch && (
                                    <FormHelperText>
                                        {errors.hasAffiliatedWithAnyChurch}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        {values.hasAffiliatedWithAnyChurch === "yes" && (
                            <Grid item xs={12} sm={6}>
                                <Field name="nameOfChurchAffiliated">
                                    {({ field }) => (
                                        <ReadOnlyTextField
                                            fullWidth
                                            label="Name of Church"
                                            {...field}
                                            error={
                                                touched.nameOfChurchAffiliated &&
                                                Boolean(
                                                    errors.nameOfChurchAffiliated
                                                )
                                            }
                                            helperText={
                                                touched.nameOfChurchAffiliated &&
                                                errors.nameOfChurchAffiliated
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
                                    touched.hasChanceForSundayMass &&
                                    Boolean(errors.hasChanceForSundayMass)
                                }
                            >
                                <FormLabel component="legend">
                                    Do you have a chance for sunday mass ?
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="hasChanceForSundayMass"
                                    value={values.hasChanceForSundayMass}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "hasChanceForSundayMass",
                                            e.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                        disabled
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                        disabled
                                    />
                                </RadioGroup>
                                {touched.hasChanceForSundayMass && (
                                    <FormHelperText>
                                        {errors.hasChanceForSundayMass}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field name="contactInfoParishPriest">
                                {({ field }) => (
                                    <ReadOnlyTextField
                                        fullWidth
                                        label="Contact Information of the parish priest (If available)"
                                        {...field}
                                        error={
                                            touched.contactInfoParishPriest &&
                                            Boolean(
                                                errors.contactInfoParishPriest
                                            )
                                        }
                                        helperText={
                                            touched.contactInfoParishPriest &&
                                            errors.contactInfoParishPriest
                                        }
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <ReadOnlyTextField label="Unit" value={updateValues.unit} />

                    <Grid item xs={12} sm={6} my={2}>
                        <Field name="additionalInfo">
                            {({ field }) => (
                                <ReadOnlyTextField
                                    fullWidth
                                    label="Additional Information"
                                    multiline
                                    rows={4} // Adjust rows for larger text area
                                    {...field}
                                />
                            )}
                        </Field>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default GlobalForm;
