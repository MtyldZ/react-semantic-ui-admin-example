import React, {memo, useCallback, useState} from "react";
import {Button, Checkbox, Form, Input, Radio, Select, TextArea} from "semantic-ui-react";

import './index.scss'

const options = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
    {key: 'o', text: 'Other', value: 'other'},
];

type SubmittedDataType = {
    [value: string]: string | number | boolean;
}

export const CustomFormComponent = memo(function CustomFormComponent() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<string>();
    const [value, setValue] = useState<string>('');
    const [textArea, setTextArea] = useState<string>('');
    const [checkBox, setCheckBox] = useState<boolean>(false);
    const [submittedData, setSubmittedData] = useState<SubmittedDataType>();

    const firstNameChanged = useCallback((e, data) => {
        setFirstName(data.value);
    }, []);
    const lastNameChanged = useCallback((e, data) => {
        setLastName(data.value);
    }, []);
    const genderChanged = useCallback((e, data) => {
        setGender(data.value);
    }, []);
    const textAreaChanged = useCallback((e, data) => {
        setTextArea(data.value);
    }, []);

    const handleChange = useCallback((e, {value}) => setValue(value), []);

    const handleSubmit = useCallback(() => {
        setSubmittedData({
            firstName, lastName, 'gender': gender || '', value, textArea, checkBox,
        });
    }, [checkBox, firstName, gender, lastName, textArea, value])
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    error={submittedData != null && submittedData.lastName === "" ? {
                        content: 'Please enter your first name',
                        pointing: 'below',
                    } : null}
                    control={Input}
                    label='First name'
                    placeholder='First name'
                    value={firstName}
                    onChange={firstNameChanged}
                />
                <Form.Field
                    error={submittedData != null && submittedData.lastName === "" ? {
                        content: 'Please enter your last name',
                    } : null}
                    control={Input}
                    label='Last name'
                    placeholder='Last name'
                    value={lastName}
                    onChange={lastNameChanged}
                />
                <Form.Field
                    error={submittedData != null && submittedData.gender === "" ? true : null}
                    control={Select}
                    label='Gender'
                    options={options}
                    placeholder='Gender'
                    value={gender}
                    onChange={genderChanged}
                />
            </Form.Group>
            <Form.Group inline>
                <label>Quantity</label>
                <Form.Field
                    control={Radio}
                    label='One'
                    value='1'
                    checked={value === '1'}
                    onChange={handleChange}
                />
                <Form.Field
                    control={Radio}
                    label='Two'
                    value='2'
                    checked={value === '2'}
                    onChange={handleChange}
                />
                <Form.Field
                    control={Radio}
                    label='Three'
                    value='3'
                    checked={value === '3'}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Field
                control={TextArea}
                label='About'
                placeholder='Tell us more about you...'
                value={textArea}
                onChange={textAreaChanged}
            />
            <Form.Field
                error={submittedData != null && submittedData.checkBox === false ? {
                    content: 'You must agree to the terms and conditions',
                    pointing: 'left',
                } : null}
                control={Checkbox}
                label='I agree to the Terms and Conditions'
                checked={checkBox}
                onChange={() => setCheckBox(pre => !pre)}
            />
            <Form.Field control={Button}>
                Submit
            </Form.Field>

            <div>
                <strong>onChange:</strong>
                <pre>{JSON.stringify({
                    firstName,
                    lastName,
                    gender: gender || '',
                    value,
                    textArea,
                    checkBox
                }, null, 2)}</pre>
                <strong>onSubmit:</strong>
                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
        </Form>
    );
})