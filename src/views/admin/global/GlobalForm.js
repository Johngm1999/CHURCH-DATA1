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
    FormHelperText,
    Grid,
    Select,
    MenuItem,
} from "@mui/material";
import FormSubmissionBtn from "../../../components/FormSubmissionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import MandatoryIndicator from "../../../components/MandatoryIndicator";

const findAge = (dateOfBirth) => {
    if (dateOfBirth) {
        const birthDate = new Date(dateOfBirth); // Convert the string to a Date object
        const today = new Date(); // Get the current date

        let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years
        const monthDifference = today.getMonth() - birthDate.getMonth(); // Get the difference in months

        // Adjust the age if the current month/day is before the birth month/day
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--; // If birthday hasn't occurred this year, subtract one year
        }

        // console.log("Age:", age);
        return age < 0 ? 0 : age;
    }
    return 0;
};

const GlobalForm = ({
    endpoint,
    onCancel,
    onAfterSubmit,
    updateValues,
    getIncompleteDataCount,
}) => {
    const initialValues = updateValues || {
        formNumber: "",
        baptismName: "",
        houseName: "",
        fullName: "",
        dateOfBirth: "",
        age: "",
        contactNumber: "",
        additionalInfo: "",
        whatsAppNumber: "",
        email: "",
        country: "",
        city: "",
        streetAddress: "",
        postalCode: "",
        contactNumberAbroad: "",
        whatsAppNumberAbroad: "",
        emailAbroad: "",
        spouseName: "",
        childrenNames: "",
        contacsOfFamily: "",
        ocupationOrField: "",
        currentEmployerOrInstitution: "",
        hasAffiliatedWithAnyChurch: "",
        nameOfChurchAffiliated: "",
        hasChanceForSundayMass: "",
        contactInfoParishPriest: "",
        unit: "",
        maritialStatus: "",
    };

    const validationSchema = Yup.object({
        formNumber: Yup.string().required("Required"), // Required field
        baptismName: Yup.string().nullable(),
        houseName: Yup.string().nullable(),
        fullName: Yup.string().nullable(), // Optional, but validates if a value is present
        dateOfBirth: Yup.date()
            .nullable()
            .max(new Date(), "Date of Birth cannot be in the future"),
        age: Yup.number().nullable().positive().integer(), // Optional, should be a positive integer if present
        contactNumber: Yup.string().nullable(),
        whatsAppNumber: Yup.string().nullable(),
        email: Yup.string().nullable(),
        country: Yup.string().nullable(),
        city: Yup.string().nullable(),
        streetAddress: Yup.string().nullable(),
        postalCode: Yup.string().nullable(),
        contactNumberAbroad: Yup.string().nullable(),
        whatsAppNumberAbroad: Yup.string().nullable(),
        emailAbroad: Yup.string().nullable(),
        spouseName: Yup.string().nullable(),
        childrenNames: Yup.string().nullable(),
        contacsOfFamily: Yup.string().nullable(),
        ocupationOrField: Yup.string().nullable(),
        additionalInfo: Yup.string().nullable(),
        currentEmployerOrInstitution: Yup.string().nullable(),
        hasAffiliatedWithAnyChurch: Yup.string().nullable(),
        nameOfChurchAffiliated: Yup.string().nullable(),
        hasChanceForSundayMass: Yup.string().nullable(),
        contactInfoParishPriest: Yup.string().nullable(),
        unit: Yup.string().nullable(),
        maritialStatus: Yup.string().nullable(),
    });

    const callCount = async () => await getIncompleteDataCount();

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            // Make the POST request to add or update the record
            await axios.post(endpoint, values);

            // Call after submit actions
            onAfterSubmit();

            // Show success toast
            toast.success(
                `Record has been ${
                    updateValues ? "updated" : "added"
                } successfully`
            );

            // Fetch the incomplete data count
            callCount();
        } catch (err) {
            // Log the error and display error message in toast
            console.error("Server Error:", err);
            toast.error(
                err.response?.data?.errorMesaage || "Something went wrong"
            );
        } finally {
            // Set submitting state to false
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, setFieldValue, errors, touched }) => (
                <Form>
                    <div
                        style={{
                            display: "flex",
                            color: "#d95757",
                            fontSize: 12,
                            justifyContent: "center",
                        }}
                    >
                        Fields need to mark the data as completed is indicated
                        by <div style={{ color: "red", fontSize: 18 }}>*</div>
                    </div>
                    <Grid item xs={12} sm={6} my={2}>
                        <Field name="formNumber">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label={
                                        <MandatoryIndicator>
                                            Form Number
                                        </MandatoryIndicator>
                                    }
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                Full Name
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                Baptism Name
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                House Name
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label={
                                            <MandatoryIndicator>
                                                Date of Birth (DD/MM/YYYY)
                                            </MandatoryIndicator>
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        {...field}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "dateOfBirth",
                                                e.target.value
                                            );
                                            setFieldValue(
                                                "age",
                                                findAge(e.target.value)
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                Age
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                Contact Number (India)
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                whatsApp Number (India)
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                Email Address
                                            </MandatoryIndicator>
                                        }
                                        type="email"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} my={2}>
                        <FormControl
                            fullWidth
                            component="fieldset"
                            error={
                                touched.maritialStatus &&
                                Boolean(errors.maritialStatus)
                            }
                        >
                            <div
                                // component="legend"
                                style={{
                                    position: "absolute",
                                    top: -8,
                                    left: 21,
                                    backgroundColor: "white",
                                    zIndex: 10000,
                                    fontSize: "11px",
                                    color: "#54527C",
                                }}
                            >
                                <MandatoryIndicator>
                                    Marital Status
                                </MandatoryIndicator>
                            </div>
                            <Field
                                sx={{ position: "relative" }}
                                name="maritialStatus"
                            >
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        label="Highest Educational Qualification"
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "maritialStatus",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select your Maritial Status</em>
                                        </MenuItem>
                                        {[
                                            {
                                                key: "Single",
                                                value: "Single",
                                            },
                                            {
                                                key: "Widow",
                                                value: "Widow",
                                            },
                                            {
                                                key: "Single Parent",
                                                value: "Single Parent",
                                            },
                                            {
                                                key: "Married",
                                                value: "Married",
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
                            {touched.maritialStatus && (
                                <FormHelperText>
                                    {errors.maritialStatus}
                                </FormHelperText>
                            )}
                        </FormControl>
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
                        Current Address (Abroad)
                    </FormLabel>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={12} sm={6}>
                            <Field name="country">
                                {({ field }) => (
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                Country of Residence
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                City
                                            </MandatoryIndicator>
                                        }
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
                                <TextField
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
                                    <TextField
                                        fullWidth
                                        label={
                                            <MandatoryIndicator>
                                                Postal Code
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label={
                                            <MandatoryIndicator>
                                                Contact Number (Abroad)
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label={
                                            <MandatoryIndicator>
                                                WhatsApp Number (Abroad)
                                            </MandatoryIndicator>
                                        }
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
                                    <TextField
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
                                <TextField
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
                                    <TextField
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
                                    <TextField
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
                                <TextField
                                    fullWidth
                                    label={
                                        <MandatoryIndicator>
                                            Occupation/Field of study
                                        </MandatoryIndicator>
                                    }
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
                                <TextField
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
                                    onChange={(e) => {
                                        setFieldValue(
                                            "hasAffiliatedWithAnyChurch",
                                            e.target.value
                                        );
                                        if (e.target.value === "no") {
                                            setFieldValue(
                                                "nameOfChurchAffiliated",
                                                ""
                                            );
                                        }
                                    }}
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
                                        <TextField
                                            fullWidth
                                            label={
                                                <MandatoryIndicator>
                                                    Name of Church
                                                </MandatoryIndicator>
                                            }
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
                                    <MandatoryIndicator>
                                        {" "}
                                        Do you have a chance for sunday mass ?
                                    </MandatoryIndicator>
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
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
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
                                    <TextField
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

                    <Grid item xs={12} sm={6} my={2}>
                        <FormControl
                            fullWidth
                            component="fieldset"
                            error={touched.unit && Boolean(errors.unit)}
                        >
                            <div
                                // component="legend"
                                style={{
                                    position: "absolute",
                                    top: -8,
                                    left: 21,
                                    backgroundColor: "white",
                                    zIndex: 10000,
                                    fontSize: "11px",
                                    color: "#54527C",
                                    paddingRight: 4,
                                }}
                            >
                                <MandatoryIndicator>Unit</MandatoryIndicator>
                            </div>
                            <Field sx={{ position: "relative" }} name="unit">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        label="Unit"
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            setFieldValue(
                                                "unit",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>Select your Unit</em>
                                        </MenuItem>
                                        {[
                                            {
                                                key: "St Augustine",
                                                value: "St_Augustine",
                                            },
                                            {
                                                key: "St Alphonsa",
                                                value: "St_Alphonsa",
                                            },
                                            {
                                                key: "St Chavara",
                                                value: "St_Chavara",
                                            },
                                            {
                                                key: "St Domenic Savio",
                                                value: "St_Domenic_Savio",
                                            },
                                            {
                                                key: "St George",
                                                value: "St_George",
                                            },
                                            {
                                                key: "St John's",
                                                value: "St_Johns",
                                            },
                                            {
                                                key: "St Joseph",
                                                value: "St_Joseph",
                                            },
                                            {
                                                key: "St Little Flower",
                                                value: "St_Little_Flower",
                                            },
                                            {
                                                key: "St Matthews",
                                                value: "St_Matthews",
                                            },
                                            {
                                                key: "St Mary's",
                                                value: "St_Marys",
                                            },
                                            {
                                                key: "St Mother Theresa",
                                                value: "St_Mother_Theresa",
                                            },
                                            {
                                                key: "St Mariagorety",
                                                value: "St_Mariagorety",
                                            },
                                            {
                                                key: "St Peter and Paul",
                                                value: "St_Peter_and_Paul",
                                            },
                                            {
                                                key: "St Jude",
                                                value: "St_Jude",
                                            },
                                            {
                                                key: "St Thomas",
                                                value: "St_Thomas",
                                            },
                                            {
                                                key: "St Antony's",
                                                value: "St_Antonys",
                                            },
                                            {
                                                key: "St Xavier's",
                                                value: "St_Xaviers",
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
                            {touched.unit && (
                                <FormHelperText>{errors.unit}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Field name="additionalInfo">
                            {({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Additional Information"
                                    multiline
                                    rows={4} // Adjust rows for larger text area
                                    {...field}
                                />
                            )}
                        </Field>
                    </Grid>

                    {/* Submit Button */}

                    <FormSubmissionBtn onCancel={onCancel} />
                    {/* {(isSubmitting || loading) && <Loader />} */}
                </Form>
            )}
        </Formik>
    );
};

export default GlobalForm;
