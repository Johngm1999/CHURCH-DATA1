import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    TextField,
    Grid,
    FormControlLabel,
    Box,
    FormLabel,
    RadioGroup,
    Radio,
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

const ParishDataDisplayForm = ({ onCancel, updateValues }) => {
    return (
        <Formik
            initialValues={updateValues}
            // validationSchema={validationSchema}
            // onSubmit={onSubmit}
        >
            {({ values, touched, errors, setFieldValue }) => (
                <Form>
                    <Box sx={{ py: 2 }}>
                        <ReadOnlyTextField
                            name="formNumber"
                            label="Form Number"
                            value={updateValues.formNumber}
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
                            <ReadOnlyTextField
                                name="familyName"
                                label="Family Name"
                                value={updateValues.familyName}
                                fullWidth
                            />
                            <ErrorMessage name="familyName" component="div" />
                        </Grid>
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="contactNumber"
                                label="Contact Number"
                                fullWidth
                                value={updateValues.contactNumber}
                            />
                            <ErrorMessage
                                name="contactNumber"
                                component="div"
                            />
                        </Grid>
                    </Grid>
                    <Grid my={2}>
                        <ReadOnlyTextField
                            name="email"
                            label="Email"
                            fullWidth
                            type="email"
                            value={updateValues.email}
                        />
                        <ErrorMessage name="email" component="div" />
                    </Grid>
                    <Grid my={2}>
                        <ReadOnlyTextField
                            name="address"
                            label="Address"
                            fullWidth
                            multiline
                            rows={4}
                            value={updateValues.address}
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
                            <ReadOnlyTextField
                                name="headName"
                                label="Head of the Family (Name)"
                                fullWidth
                                value={updateValues.headName}
                            />
                            <ErrorMessage name="headName" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="headAge"
                                label="Age"
                                fullWidth
                                value={updateValues.headAge}
                            />
                            <ErrorMessage name="headAge" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="headOccupation"
                                label="Occupation"
                                fullWidth
                                value={updateValues.headOccupation}
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
                            <ReadOnlyTextField
                                name="member1Name"
                                label="Other Member 1 (Name)"
                                fullWidth
                                value={updateValues.member1Name}
                            />
                            <ErrorMessage name="member1Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member1Age"
                                label="Age"
                                fullWidth
                                value={updateValues.member1Age}
                            />
                            <ErrorMessage name="member1Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member1Occupation"
                                label="Occupation"
                                fullWidth
                                value={updateValues.member1Occupation}
                            />
                            <ErrorMessage
                                name="member1Occupation"
                                component="div"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ReadOnlyTextField
                                name="member1Mobile"
                                label="Mobile"
                                fullWidth
                                value={updateValues.member1Mobile}
                            />
                            <ErrorMessage
                                name="member1Mobile"
                                component="div"
                            />
                        </Grid>

                        {/* Member 2 */}
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="member2Name"
                                label="Other Member 2 (Name)"
                                fullWidth
                                value={updateValues.member2Name}
                            />
                            <ErrorMessage name="member2Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member2Age"
                                label="Age"
                                fullWidth
                                value={updateValues.member2Age}
                            />
                            <ErrorMessage name="member2Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member2Occupation"
                                label="Occupation"
                                fullWidth
                                value={updateValues.member2Occupation}
                            />
                            <ErrorMessage
                                name="member2Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ReadOnlyTextField
                                name="member2Mobile"
                                label="Mobile"
                                fullWidth
                                value={updateValues.member2Mobile}
                            />
                            <ErrorMessage
                                name="member2Mobile"
                                component="div"
                            />
                        </Grid>

                        {/* Member 3 */}
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="member3Name"
                                label="Other Member 3 (Name)"
                                fullWidth
                                value={updateValues.member3Name}
                            />
                            <ErrorMessage name="member3Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member3Age"
                                label="Age"
                                fullWidth
                                value={updateValues.member3Age}
                            />
                            <ErrorMessage name="member3Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member3Occupation"
                                label="Occupation"
                                fullWidth
                                value={updateValues.member3Occupation}
                            />
                            <ErrorMessage
                                name="member3Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ReadOnlyTextField
                                name="member3Mobile"
                                label="Mobile"
                                fullWidth
                                value={updateValues.member3Mobile}
                            />
                            <ErrorMessage
                                name="member3Mobile"
                                component="div"
                            />
                        </Grid>

                        {/* Member 4 */}
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="member4Name"
                                label="Other Member 4 (Name)"
                                fullWidth
                                value={updateValues.member4Name}
                            />
                            <ErrorMessage name="member4Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member4Age"
                                label="Age"
                                fullWidth
                                value={updateValues.member4Age}
                            />
                            <ErrorMessage name="member4Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member4Occupation"
                                label="Occupation"
                                fullWidth
                                value={updateValues.member4Occupation}
                            />
                            <ErrorMessage
                                name="member4Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ReadOnlyTextField
                                name="member4Mobile"
                                label="Mobile"
                                fullWidth
                                value={updateValues.member4Mobile}
                            />
                            <ErrorMessage
                                name="member4Mobile"
                                component="div"
                            />
                        </Grid>

                        {/* Member 5 */}
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="member5Name"
                                label="Other Member 5 (Name)"
                                fullWidth
                                value={updateValues.member5Name}
                            />
                            <ErrorMessage name="member5Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member5Age"
                                label="Age"
                                fullWidth
                                value={updateValues.member5Age}
                            />
                            <ErrorMessage name="member5Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="member5Occupation"
                                label="Occupation"
                                fullWidth
                                value={updateValues.member5Occupation}
                            />
                            <ErrorMessage
                                name="member5Occupation"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ReadOnlyTextField
                                name="member5Mobile"
                                label="Mobile"
                                fullWidth
                                value={updateValues.member5Mobile}
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
                            <ReadOnlyTextField
                                name="child1Name"
                                label="Child 1 (Name)"
                                fullWidth
                                value={updateValues.child1Name}
                            />
                            <ErrorMessage name="child1Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child1Age"
                                label="Age"
                                fullWidth
                                value={updateValues.child1Age}
                            />
                            <ErrorMessage name="child1Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child1Occupation"
                                label="Occupation/School"
                                fullWidth
                                value={updateValues.child1Occupation}
                            />
                            <ErrorMessage
                                name="child1Occupation"
                                component="div"
                            />
                        </Grid>

                        {/* Child 2 */}
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="child2Name"
                                label="Child 2 (Name)"
                                fullWidth
                                value={updateValues.child2Name}
                            />
                            <ErrorMessage name="child2Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child2Age"
                                label="Age"
                                fullWidth
                                value={updateValues.child2Age}
                            />
                            <ErrorMessage name="child2Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child2Occupation"
                                label="Occupation/School"
                                fullWidth
                                value={updateValues.child2Occupation}
                            />
                            <ErrorMessage
                                name="child2Occupation"
                                component="div"
                            />
                        </Grid>

                        {/* Child 3 */}
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="child3Name"
                                label="Child 3 (Name)"
                                fullWidth
                                value={updateValues.child3Name}
                            />
                            <ErrorMessage name="child3Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child3Age"
                                label="Age"
                                fullWidth
                                value={updateValues.child3Age}
                            />
                            <ErrorMessage name="child3Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child3Occupation"
                                label="Occupation/School"
                                fullWidth
                                value={updateValues.child3Occupation}
                            />
                            <ErrorMessage
                                name="child3Occupation"
                                component="div"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="child4Name"
                                label="Child 4 (Name)"
                                fullWidth
                                value={updateValues.child4Name}
                            />
                            <ErrorMessage name="child4Name" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child4Age"
                                label="Age"
                                fullWidth
                                value={updateValues.child4Age}
                            />
                            <ErrorMessage name="child4Age" component="div" />
                        </Grid>
                        <Grid item xs={3}>
                            <ReadOnlyTextField
                                name="child4Occupation"
                                label="Occupation/School"
                                fullWidth
                                value={updateValues.child4Occupation}
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
                            <ReadOnlyTextField
                                name="healthConcerns"
                                label="Health Conrcerns"
                                fullWidth
                                value={updateValues.healthConcerns}
                            />
                            <ErrorMessage
                                name="healthConcerns"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="financialSituation"
                                label="Financial Situation"
                                fullWidth
                                value={updateValues.financialSituation}
                            />
                            <ErrorMessage
                                name="financialSituation"
                                component="div"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="educationalNeeds"
                                label="Educational Needs"
                                fullWidth
                                value={updateValues.educationalNeeds}
                            />
                            <ErrorMessage
                                name="educationalNeeds"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="specialConcerns"
                                label="Special Concerns/Requests"
                                fullWidth
                                value={updateValues.specialConcerns}
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
                                            disabled
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio />}
                                            label="No"
                                            disabled
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
                            <ReadOnlyTextField
                                name="needSacraments"
                                label="Need for Sacraments (Confession, Holy Communion, etc.)"
                                fullWidth
                                value={updateValues.needSacraments}
                            />
                            <ErrorMessage
                                name="needSacraments"
                                component="div"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ReadOnlyTextField
                                name="prayerRequests"
                                label="Any specific prayer requests"
                                fullWidth
                                value={updateValues.prayerRequests}
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
                                            disabled
                                        />
                                        <FormControlLabel
                                            value="no"
                                            control={<Radio />}
                                            label="No"
                                            disabled
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
                                <ReadOnlyTextField
                                    name="suggestedMobile"
                                    label="If No, please suggest a mobile no"
                                    fullWidth
                                    type="number"
                                    value={updateValues.suggestedMobile}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Grid my={2}>
                        <ReadOnlyTextField
                            name="generalObservations"
                            label=" General Observations/Notes"
                            fullWidth
                            multiline
                            rows={4}
                            value={updateValues.generalObservations}
                        />
                        <ErrorMessage
                            name="generalObservations"
                            component="div"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} my={2}>
                        <ReadOnlyTextField
                            value={updateValues.unit}
                            label={"Unit"}
                        />
                    </Grid>

                    <Grid xs={12} sm={6} my={2}>
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

                    {/* <FormSubmissionBtn onCancel={onCancel} /> */}
                </Form>
            )}
        </Formik>
    );
};

export default ParishDataDisplayForm;
