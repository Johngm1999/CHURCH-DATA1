import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Box,
    FormLabel,
    RadioGroup,
    Radio,
    FormHelperText,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";
import FormSubmissionBtn from "../../../components/FormSubmissionBtn";
import toast from "react-hot-toast";
import axios from "axios";

// Validation Schema with Yup
const validationSchema = Yup.object({
    formNumber: Yup.string().required("Required"),
    familyName: Yup.string(),
    address: Yup.string(),
    contactNumber: Yup.string(),
    email: Yup.string().email("Invalid email"),
    headName: Yup.string(),
    headAge: Yup.number(),
    headOccupation: Yup.string(),
    headMobile: Yup.string(),
    member1Name: Yup.string(),
    member1Age: Yup.number(),
    member1Occupation: Yup.string(),
    member1Mobile: Yup.string(),
    member2Mobile: Yup.string(),
    member3Mobile: Yup.string(),
    member4Mobile: Yup.string(),
    member5Mobile: Yup.string(),
    member2Name: Yup.string(),
    member2Age: Yup.number(),
    member2Occupation: Yup.string(),
    member3Name: Yup.string(),
    member3Age: Yup.number(),
    member3Occupation: Yup.string(),
    child1Name: Yup.string(),
    child1Age: Yup.number(),
    child1Occupation: Yup.string(),
    child2Name: Yup.string(),
    child2Age: Yup.number(),
    child2Occupation: Yup.string(),
    child3Name: Yup.string(),
    child3Age: Yup.number(),
    child3Occupation: Yup.string(),
    child4Name: Yup.string(),
    child4Age: Yup.number(),
    child4Occupation: Yup.string(),
    healthConcerns: Yup.string(),
    financialSituation: Yup.string(),
    educationalNeeds: Yup.string(),
    specialConcerns: Yup.string(),
    attendingChurch: Yup.string(),
    needSacraments: Yup.string(),
    prayerRequests: Yup.string(),
    isParishWhatsappGroup: Yup.string(),
    suggestedMobile: Yup.string(),
    generalObservations: Yup.string(),
    additionalInfo: Yup.string(),
});

const initialValues = {
    formNumber: "",
    familyName: "",
    address: "",
    contactNumber: "",
    email: "",
    headName: "",
    headAge: "",
    headOccupation: "",
    member1Name: "",
    member1Age: "",
    member1Occupation: "",
    member2Name: "",
    member2Age: "",
    member2Occupation: "",
    member3Name: "",
    member3Age: "",
    member3Occupation: "",
    child1Name: "",
    child1Age: "",
    child1Occupation: "",
    child2Name: "",
    child2Age: "",
    child2Occupation: "",
    child3Name: "",
    child3Age: "",
    child3Occupation: "",
    child4Name: "",
    child4Age: "",
    child4Occupation: "",
    healthConcerns: "",
    financialSituation: "",
    educationalNeeds: "",
    specialConcerns: "",
    attendingChurch: "",
    needSacraments: "",
    prayerRequests: "",
    isParishWhatsappGroup: "",
    suggestedMobile: "",
    generalObservations: "",
    additionalInfo: "",
    member1Mobile: "",
    member2Mobile: "",
    member3Mobile: "",
    member4Mobile: "",
    member5Mobile: "",
};

const ParishForm = ({
    endpoint,
    onCancel,
    onAfterSubmit,
    updateValues,
    getIncompleteDataCount,
}) => {
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
            initialValues={updateValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, touched, errors, setFieldValue }) => (
                <Form>
                    <Box sx={{ py: 2 }}>
                        <Field
                            name="formNumber"
                            as={TextField}
                            label="Form Number"
                            fullWidth
                        />
                        <ErrorMessage name="formNumber" component="div" />
                    </Box>
                    {/* Section 1: Family Information */}

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
                        Family Information
                    </FormLabel>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Field
                                name="familyName"
                                as={TextField}
                                label="Family Name"
                                fullWidth
                            />
                            <ErrorMessage name="familyName" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="contactNumber"
                                as={TextField}
                                label="Contact Number"
                                fullWidth
                                type="number"
                            />
                            <ErrorMessage
                                name="contactNumber"
                                component="div"
                            />
                        </Grid>
                    </Grid>
                    <Grid my={2}>
                        <Field
                            name="email"
                            as={TextField}
                            label="Email"
                            fullWidth
                            type="email"
                        />
                        <ErrorMessage name="email" component="div" />
                    </Grid>
                    <Grid my={2}>
                        <Field
                            name="address"
                            as={TextField}
                            label="Address"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <ErrorMessage name="address" component="div" />
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
                        Members of the Household
                    </FormLabel>

                    <Grid container spacing={2} my={2}>
                        <Grid item xs={6}>
                            <Field
                                name="headName"
                                as={TextField}
                                label="Head of the Family (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="headName" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="headAge"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="headAge" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="headOccupation"
                                as={TextField}
                                label="Occupation"
                                fullWidth
                            />
                            <ErrorMessage
                                name="headOccupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="headMobile"
                                as={TextField}
                                label="Mobile"
                                type="number"
                                fullWidth
                            />
                            <ErrorMessage name="headMobile" component="div" />
                        </Grid>
                    </Grid>
                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                            mt: 1,
                        }}
                    >
                        Other members (If Any)
                    </FormLabel>
                    {/* Other Members */}
                    <Grid container spacing={2}>
                        {/* Member 1 */}
                        <Grid item xs={6}>
                            <Field
                                name="member1Name"
                                as={TextField}
                                label="Other Member 1 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="member1Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member1Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="member1Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member1Occupation"
                                as={TextField}
                                label="Occupation"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member1Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="member1Mobile"
                                as={TextField}
                                label="Mobile"
                                type="number"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member1Mobile"
                                component="div"
                            />
                        </Grid>
                        {/* Member 2 */}
                        <Grid item xs={6}>
                            <Field
                                name="member2Name"
                                as={TextField}
                                label="Other Member 2 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="member2Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member2Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="member2Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member2Occupation"
                                as={TextField}
                                label="Occupation"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member2Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="member2Mobile"
                                as={TextField}
                                label="Mobile"
                                type="number"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member2Mobile"
                                component="div"
                            />
                        </Grid>
                        {/* Member 3 */}
                        <Grid item xs={6}>
                            <Field
                                name="member3Name"
                                as={TextField}
                                label="Other Member 3 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="member3Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member3Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="member3Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member3Occupation"
                                as={TextField}
                                label="Occupation"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member3Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="member3Mobile"
                                as={TextField}
                                label="Mobile"
                                type="number"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member3Mobile"
                                component="div"
                            />
                        </Grid>

                        {/* Member 4 */}
                        <Grid item xs={6}>
                            <Field
                                name="member4Name"
                                as={TextField}
                                label="Other Member 4 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="member4Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member4Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="member4Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member4Occupation"
                                as={TextField}
                                label="Occupation"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member4Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="member4Mobile"
                                as={TextField}
                                label="Mobile"
                                type="number"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member4Mobile"
                                component="div"
                            />
                        </Grid>

                        {/* Member 5 */}
                        <Grid item xs={6}>
                            <Field
                                name="member5Name"
                                as={TextField}
                                label="Other Member 5 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="member5Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member5Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="member5Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="member5Occupation"
                                as={TextField}
                                label="Occupation"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member5Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                name="member5Mobile"
                                as={TextField}
                                label="Mobile"
                                type="number"
                                fullWidth
                            />
                            <ErrorMessage
                                name="member5Mobile"
                                component="div"
                            />
                        </Grid>
                    </Grid>

                    {/* Children */}
                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                            mt: 1,
                        }}
                    >
                        Children (If any)
                    </FormLabel>
                    <Grid container spacing={2}>
                        {/* Child 1 */}
                        <Grid item xs={6}>
                            <Field
                                name="child1Name"
                                as={TextField}
                                label="Child 1 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="child1Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child1Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="child1Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child1Occupation"
                                as={TextField}
                                label="Occupation/School"
                                fullWidth
                            />
                            <ErrorMessage
                                name="child1Occupation"
                                component="div"
                            />
                        </Grid>

                        {/* Child 2 */}
                        <Grid item xs={6}>
                            <Field
                                name="child2Name"
                                as={TextField}
                                label="Child 2 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="child2Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child2Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="child2Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child2Occupation"
                                as={TextField}
                                label="Occupation/School"
                                fullWidth
                            />
                            <ErrorMessage
                                name="child2Occupation"
                                component="div"
                            />
                        </Grid>

                        {/* Child 3 */}
                        <Grid item xs={6}>
                            <Field
                                name="child3Name"
                                as={TextField}
                                label="Child 3 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="child3Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child3Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="child3Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child3Occupation"
                                as={TextField}
                                label="Occupation/School"
                                fullWidth
                            />
                            <ErrorMessage
                                name="child3Occupation"
                                component="div"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Field
                                name="child4Name"
                                as={TextField}
                                label="Child 4 (Name)"
                                fullWidth
                            />
                            <ErrorMessage name="child4Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child4Age"
                                as={TextField}
                                label="Age"
                                fullWidth
                            />
                            <ErrorMessage name="child4Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                name="child4Occupation"
                                as={TextField}
                                label="Occupation/School"
                                fullWidth
                            />
                            <ErrorMessage
                                name="child4Occupation"
                                component="div"
                            />
                        </Grid>
                    </Grid>

                    {/* Section 3: Family's Current Status */}

                    <FormLabel
                        component="legend"
                        sx={{
                            fontSize: "1.5rem", // Customize font size
                            fontWeight: "bold", // Customize font weight
                            color: "#a184b0", // Customize text color
                            textTransform: "uppercase", // Uppercase text
                            letterSpacing: "0.5px", // Customize letter spacing
                            mt: 1,
                        }}
                    >
                        Family's Current Status
                    </FormLabel>
                    {/* Add more fields here */}
                    <Grid container spacing={2} my={2}>
                        <Grid item xs={6}>
                            <Field
                                name="healthConcerns"
                                as={TextField}
                                label="Health Conrcerns"
                                fullWidth
                            />
                            <ErrorMessage
                                name="healthConcerns"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="financialSituation"
                                as={TextField}
                                label="Financial Situation"
                                fullWidth
                            />
                            <ErrorMessage
                                name="financialSituation"
                                component="div"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Field
                                name="educationalNeeds"
                                as={TextField}
                                label="Educational Needs"
                                fullWidth
                            />
                            <ErrorMessage
                                name="educationalNeeds"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="specialConcerns"
                                as={TextField}
                                label="Special Concerns/Requests"
                                fullWidth
                            />
                            <ErrorMessage
                                name="specialConcerns"
                                component="div"
                            />
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
                            mt: 1,
                        }}
                    >
                        Spiritual Life
                    </FormLabel>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormLabel component="legend">
                                Are they actively attending Church services?
                            </FormLabel>
                            <Field name="attendingChurch">
                                {({ field }) => (
                                    <RadioGroup
                                        row
                                        {...field}
                                        aria-label="attendingChurch"
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
                                )}
                            </Field>
                            <ErrorMessage
                                name="attendingChurch"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="needSacraments"
                                as={TextField}
                                label="Need for Sacraments (Confession, Holy Communion, etc.)"
                                fullWidth
                            />
                            <ErrorMessage
                                name="needSacraments"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                name="prayerRequests"
                                as={TextField}
                                label="Any specific prayer requests"
                                fullWidth
                            />
                            <ErrorMessage
                                name="prayerRequests"
                                component="div"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormLabel
                                component="legend"
                                style={{ fontSize: 14 }}
                            >
                                Is any family member included in parish WhatsApp
                                group
                            </FormLabel>
                            <Field name="isParishWhatsappGroup">
                                {({ field }) => (
                                    <RadioGroup
                                        row
                                        {...field}
                                        aria-label="isParishWhatsappGroup"
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
                                )}
                            </Field>
                            <ErrorMessage
                                name="isParishWhatsappGroup"
                                component="div"
                            />
                        </Grid>

                        {values.isParishWhatsappGroup === "no" && (
                            <Grid item xs={6}>
                                <Field
                                    name="suggestedMobile"
                                    as={TextField}
                                    label="If No, please suggest a mobile no"
                                    fullWidth
                                    type="number"
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Grid my={2}>
                        <Field
                            name="generalObservations"
                            as={TextField}
                            label=" General Observations/Notes"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <ErrorMessage
                            name="generalObservations"
                            component="div"
                        />
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
                                Unit
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

                    <Grid xs={12} sm={6} my={2}>
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

                    <FormSubmissionBtn onCancel={onCancel} />
                </Form>
            )}
        </Formik>
    );
};

export default ParishForm;
