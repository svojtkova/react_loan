
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import './FormDemo.css';
import axios from 'axios';
import * as Loader from "react-loader-spinner";

export const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const terms = [
        { label: '36 months', value: '36' },
        { label: '60 months', value: '60' }
    ];
    const [showMessage, setShowMessage] = useState(false);

    const statuses = [
        { label: 'Not Verified', value: '0' },
        { label: 'Source Verified', value: '1' },
        { label: 'Verified', value: '2' }
    ];

    const grades = [
        { label: 'A', value: '0' },
        { label: 'B', value: '1' },
        { label: 'C', value: '2' },
        { label: 'D', value: '3' },
        { label: 'E', value: '4' },
        { label: 'F', value: '5' },
        { label: 'G', value: '6' }
    ]

    const subgrades = [
        { label: 'A1', value: '0' }, { label: 'A2', value: '1' }, { label: 'A3', value: '2' }, { label: 'A4', value: '3' }, { label: 'A5', value: '4' },
        { label: 'B1', value: '5' }, { label: 'B2', value: '6' }, { label: 'B3', value: '7' }, { label: 'B4', value: '8' }, { label: 'B5', value: '9' },
        { label: 'C1', value: '10' }, { label: 'C2', value: '11' }, { label: 'C3', value: '12' }, { label: 'C4', value: '13' }, { label: 'C5', value: '14' },
        { label: 'D1', value: '15' }, { label: 'D2', value: '16' }, { label: 'D3', value: '17' }, { label: 'D4', value: '18' }, { label: 'D5', value: '19' },
        { label: 'E1', value: '20' }, { label: 'E2', value: '21' }, { label: 'E3', value: '22' }, { label: 'E4', value: '23' }, { label: 'E5', value: '24' },
        { label: 'F1', value: '25' }, { label: 'F2', value: '26' }, { label: 'F3', value: '27' }, { label: 'F4', value: '28' }, { label: 'F5', value: '29' },
        { label: 'G1', value: '30' }, { label: 'G2', value: '31' }, { label: 'G3', value: '32' }, { label: 'G4', value: '33' }, { label: 'G5', value: '34' }
    ]

    const formik = useFormik({
        initialValues: {
            loan_amnt: 0,
            term: "",
            int_rate: 0.0,
            installment: 0.0,
            grade: '',
            subgrade: '',
            annual_inc: 0,
            verification_status: '',
            dti: 0,
            earliest_cr_line: 2000,
            open_acc: 0,
            pub_rec: 0,
            revol_bal: 0,
            revol_util: 0,
            total_acc: 0,
        },

        validate: (data) => {
            let errors = {};
            if (!data.loan_amnt) {
                errors.loan_amnt = 'Loan amount is required.';
            }
            if (!data.term) {
                errors.term = 'Term is required.';
            }
            if (!data.int_rate) {
                errors.int_rate = 'Interest rate is required.';
            }
            if (!data.installment) {
                errors.installment = 'Installment is required.';
            }
            if (!data.grade) {
                errors.grade = 'Grade is required.';
            }
            if (!data.subgrade) {
                errors.subgrade = 'Subgrade is required.';
            }
            if (!data.annual_inc) {
                errors.annual_inc = 'Annual income is required.';
            }
            if (!data.verification_status) {
                errors.verification_status = 'Verification status is required.';
            }
            if (!data.dti) {
                errors.dti = 'DTI ratio is required.'
            }
            if (!data.earliest_cr_line) {
                errors.earliest_cr_line = "Earliest credit line is required."
            }
            if (!data.open_acc) {
                errors.open_acc = "Open credit lines are required."
            }
            if (!data.revol_bal) {
                errors.revol_bal = "Total credit revolving balance is required."
            }
            if (!data.revol_util) {
                errors.revol_util = "Revolving line utilization rate is required."
            }

            return errors;
        },
        onSubmit: async (data) => {
            setIsLoading(true);
            setIsLoading(true); // Start loading

            try {
                const response = await axios.post('https://flask-production-a60d.up.railway.app/api/loan', data);
                setResponseMessage(response.data.message);
            } catch (error) {
                setResponseMessage('Error occurred.');
            } finally {
                setIsLoading(false); // Stop loading
            }
            setShowMessage(true);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Default Prediction</h5>
                    <p style={{ lineHeight: 1.5 }}>
                        {responseMessage}
                    </p>

                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                {isLoading ? (
                    <div className='loader'>
                                <Loader.TailSpin
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                style={{'selfAlign':'center'}}
                              />
                              </div>
                            ) : (
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputNumber id="loan_amnt" name="loan_amnt" value={formik.values.loan_amnt} onValueChange={formik.handleChange}
                                    mode="decimal" min={0}
                                    className={classNames({ 'p-invalid': isFormFieldValid('loan_amnt') })}
                                    tooltip="The listed amount of the loan applied for by the borrower."
                                />
                                <label htmlFor="loan_amnt" className={classNames({ 'p-error': isFormFieldValid('loan_amnt') })}>Loan amount</label>
                            </span>
                            {getFormErrorMessage('loan_amnt')}
                        </div>
                        <div className="field">
                            <span className="p-float-label" style={{ 'textAlign': 'left' }}>
                                <Dropdown id="term" name="term" value={formik.values.term} options={terms} onChange={(value) => formik.setFieldValue("term", value.value)}
                                    className={classNames({ 'p-invalid': isFormFieldValid('term') })} placeholder="Select a term" tooltip='The number of payments on the loan. Values are in months and can be either 36 or 60.' />
                                <label htmlFor="term" className={classNames({ 'p-error': isFormFieldValid('term') })}>Term</label>
                            </span>
                            {getFormErrorMessage('term')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <InputNumber id="int_rate" name="int_rate" value={formik.values.int_rate} onValueChange={formik.handleChange} mode="decimal" locale="en-US" minFractionDigits={2}
                                    className={classNames({ 'p-invalid': isFormFieldValid('int_rate') })} tooltip='Interest Rate on the loan' min={0} step={0.25} />
                                <label htmlFor="int_rate" className={classNames({ 'p-error': isFormFieldValid('int_rate') })}>Interest rate</label>
                            </span>
                            {getFormErrorMessage('int_rate')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <InputNumber id="installment" name="installment" value={formik.values.installment} onValueChange={formik.handleChange} mode="decimal" locale="en-US" minFractionDigits={2}
                                    className={classNames({ 'p-invalid': isFormFieldValid('installment') })} tooltip='The monthly payment owed by the borrower if the loan originates.' min={0} step={0.25} />
                                <label htmlFor="installment" className={classNames({ 'p-error': isFormFieldValid('installment') })}>Installment</label>
                            </span>
                            {getFormErrorMessage('installment')}
                        </div>
                        <div className="field">
                            <span className="p-float-label" style={{ 'textAlign': 'left' }}>
                                <Dropdown id="grade" name="grade" value={formik.values.grade} options={grades} onChange={(value) => formik.setFieldValue("grade", value.value)}
                                    className={classNames({ 'p-invalid': isFormFieldValid('grade') })} placeholder="Select a grade" tooltip='LC assigned loan grade.' />
                                <label htmlFor="grade" className={classNames({ 'p-error': isFormFieldValid('grade') })}>Grade</label>
                            </span>
                            {getFormErrorMessage('grade')}
                        </div>
                        <div className="field">
                            <span className="p-float-label" style={{ 'textAlign': 'left' }}>
                                <Dropdown id="subgrade" name="subgrade" value={formik.values.subgrade} options={subgrades} onChange={(value) => formik.setFieldValue("subgrade", value.value)}
                                    className={classNames({ 'p-invalid': isFormFieldValid('subgrade') })} placeholder="Select a subgrade" tooltip='LC assigned loan subgrade.' />
                                <label htmlFor="subgrade" className={classNames({ 'p-error': isFormFieldValid('subgrade') })}>Subgrade</label>
                            </span>
                            {getFormErrorMessage('subgrade')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputNumber id="annual_inc" name="annual_inc" value={formik.values.annual_inc} onValueChange={formik.handleChange}
                                    mode="decimal" min={0}
                                    className={classNames({ 'p-invalid': isFormFieldValid('annual_inc') })}
                                    tooltip="The self-reported annual income provided by the borrower during registration."
                                />
                                <label htmlFor="annual_inc" className={classNames({ 'p-error': isFormFieldValid('annual_inc') })}>Annual Income</label>
                            </span>
                            {getFormErrorMessage('annual_inc')}
                        </div>
                        <div className="field">
                            <span className="p-float-label" style={{ 'textAlign': 'left' }}>
                                <Dropdown id="verification_status" name="verification_status" value={formik.values.verification_status} options={statuses} onChange={(value) => formik.setFieldValue("verification_status", value.value)}
                                    className={classNames({ 'p-invalid': isFormFieldValid('verification_status') })} placeholder="Select a status" tooltip='Indicates if income was verified by LC, not verified, or if the income source was verified.' />
                                <label htmlFor="verification_status" className={classNames({ 'p-error': isFormFieldValid('verification_status') })}>Verification Status</label>
                            </span>
                            {getFormErrorMessage('verification_status')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <InputNumber id="dti" name="dti" value={formik.values.dti} onValueChange={formik.handleChange} mode="decimal" locale="en-US" minFractionDigits={2}
                                    className={classNames({ 'p-invalid': isFormFieldValid('dti') })} tooltip=' 	A ratio calculated using the borrower’s total monthly debt payments on the total debt obligations, excluding mortgage and the requested LC loan, divided by the borrower’s self-reported monthly income.' min={0} step={0.25} />
                                <label htmlFor="dti" className={classNames({ 'p-error': isFormFieldValid('dti') })}>DTI ratio</label>
                            </span>
                            {getFormErrorMessage('dti')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <InputNumber id="earliest_cr_line" name="earliest_cr_line" value={formik.values.earliest_cr_line} onValueChange={formik.handleChange}
                                    mode="decimal" min={2000} max={2500}
                                    className={classNames({ 'p-invalid': isFormFieldValid('earliest_cr_line') })}
                                    tooltip="The year the borrower's earliest reported credit line was opened"
                                />
                                <label htmlFor="earliest_cr_line" className={classNames({ 'p-error': isFormFieldValid('earliest_cr_line') })}>Year of the earliest credit line</label>
                            </span>
                            {getFormErrorMessage('earliest_cr_line')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputNumber id="open_acc" name="open_acc" value={formik.values.open_acc} onValueChange={formik.handleChange}
                                    mode="decimal" min={0}
                                    className={classNames({ 'p-invalid': isFormFieldValid('open_acc') })}
                                    tooltip="The number of open credit lines in the borrower's credit file."
                                />
                                <label htmlFor="open_acc" className={classNames({ 'p-error': isFormFieldValid('open_acc') })}>Open Credit Lines</label>
                            </span>
                            {getFormErrorMessage('open_acc')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputNumber id="pub_rec" name="pub_rec" value={formik.values.pub_rec} onValueChange={formik.handleChange}
                                    mode="decimal" min={-1}
                                    className={classNames({ 'p-invalid': isFormFieldValid('pub_rec') })}
                                    tooltip="Number of derogatory public records"
                                />
                                <label htmlFor="pub_rec" className={classNames({ 'p-error': isFormFieldValid('pub_rec') })}>Public Records</label>
                            </span>
                            {getFormErrorMessage('pub_rec')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <InputNumber id="revol_bal" name="revol_bal" value={formik.values.revol_bal} onValueChange={formik.handleChange} mode="decimal" locale="en-US" minFractionDigits={2}
                                    className={classNames({ 'p-invalid': isFormFieldValid('revol_bal') })} tooltip='Total credit revolving balance.' min={0} step={0.25} />
                                <label htmlFor="revol_bal" className={classNames({ 'p-error': isFormFieldValid('revol_bal') })}>Credit Revolving Balance</label>
                            </span>
                            {getFormErrorMessage('revol_bal')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <InputNumber id="revol_util" name="revol_util" value={formik.values.revol_util} onValueChange={formik.handleChange} mode="decimal" locale="en-US" minFractionDigits={2}
                                    className={classNames({ 'p-invalid': isFormFieldValid('revol_util') })} tooltip='Revolving line utilization rate, or the amount of credit the borrower is using relative to all available revolving credit.' min={0} step={0.25} />
                                <label htmlFor="revol_util" className={classNames({ 'p-error': isFormFieldValid('revol_util') })}>Revolving Line Utilization Rate</label>
                            </span>
                            {getFormErrorMessage('revol_util')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputNumber id="total_acc" name="total_acc" value={formik.values.total_acc} onValueChange={formik.handleChange}
                                    mode="decimal" min={0}
                                    className={classNames({ 'p-invalid': isFormFieldValid('total_acc') })}
                                    tooltip="The total number of credit lines currently in the borrower's credit file"
                                />
                                <label htmlFor="total_acc" className={classNames({ 'p-error': isFormFieldValid('total_acc') })}>Credit Lines</label>
                            </span>
                            {getFormErrorMessage('total_acc')}
                        </div>

                        <div>
                
                                <Button type="submit" label="Submit" />
                           

                        </div>
                    </form> )}
                </div>
            </div>
        </div>
    );
}
