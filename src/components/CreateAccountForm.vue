<template>
    <b-collapse id="create-form">
        <b-list-group-item>
            <b-form @submit="onSubmit">
                <b-form-group
                    id="create-group-input-username"
                    label="Username"
                    label-for="create-input-username"
                    :invalid-feedback="invalidFeedback"
                    :valid-feedback="validFeedback"
                    :state="state"
                >
                    <b-form-input
                        id="create-input-username"
                        v-model="form.username"
                        type="text"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    id="create-group-input-pass"
                    label="Password"
                    label-for="login-input-pass"
                    :invalid-feedback="invalidFeedbackPass"
                    :valid-feedback="validFeedbackPass"
                    :state="statePass"
                >
                    <b-form-input
                        id="create-input-pass"
                        v-model="form.pass"
                        type="password"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    id="create-group-input-pass-confirm"
                    label="Confirm your password"
                    label-for="create-input-pass-confirm"
                    :state="statePassConfirm"
                    :invalid-feedback="invalidFeedbackPassConfirm"
                    :valid-feedback="validFeedbackPassConfirm"
                >
                    <b-form-input
                        id="create-input-pass-confirm"
                        v-model="form.passConfirm"
                        type="password"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" :disabled="submitBtnState" v-on:click="emitGlobalCreateEvent">Submit</b-button>
            </b-form>
        </b-list-group-item>
    </b-collapse>
</template>

<script>
import { EventBus } from '../event-bus';
export default {
    name: 'CreateAccountForm',
    props: {

    },
    data: function () {
        return {
            form: {
                username: '',
                pass: '',
                passConfirm: ''
            }
        }
    },
    computed: {
        state() {
            return this.form.username.length >= 6 ? true : false;
        },
        statePass() {
            return this.form.pass.length >= 6 ? true : false;
        },
        statePassConfirm() {
            return this.form.pass === this.form.passConfirm && this.form.passConfirm.length >= 6 ? true : false;
        },
        invalidFeedbackPassConfirm() {
            if (this.form.pass === this.form.passConfirm && this.form.passConfirm.length >= 6) {
                return ''
            } else if (this.form.passConfirm.length > 0) {
                return 'Make sure your passwords match.'
            } else {
                return 'Please enter something'
            }
        },
        validFeedbackPassConfirm() {
            return this.statePassConfirm === true ? 'Great!' : ''
        },
        invalidFeedbackPass() {
            if (this.form.pass.length > 6) {
                return ''
            } else if (this.form.pass.length > 0) {
                return 'Enter at least 6 characters'
            } else {
                return 'Please enter something'
            }
        },
        validFeedbackPass() {
            return this.statePass === true ? 'Great!' : ''
        },
        invalidFeedback() {
            if (this.form.username.length > 6) {
                return ''
            } else if (this.form.username.length > 0) {
                return 'Enter at least 6 characters'
            } else {
                return 'Please enter something'
            }
        },
        validFeedback() {
            return this.state === true ? 'Yes!' : ''
        },
        submitBtnState() {
            return (this.state && this.statePass && this.statePassConfirm) ? false : true;
        }
    },
    methods: {
        onSubmit: function (evt) {
            evt.preventDefault();
        },
        emitGlobalCreateEvent: function () {
            EventBus.$emit('create', this.form);
        }
    }
}
</script>