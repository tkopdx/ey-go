<template>
    <b-collapse id="login-form">
        <b-list-group-item>
            <b-form @submit="onSubmit">
                <b-form-group
                    id="login-group-input-username"
                    label="Username"
                    label-for="login-input-username"
                >
                    <b-form-input
                        id="login-input-username"
                        v-model="form.username"
                        type="text"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group
                    id="login-group-input-pass"
                    label="Password"
                    label-for="login-input-pass"
                >
                    <b-form-input
                        id="login-input-pass"
                        v-model="form.pass"
                        type="password"
                        required
                    >
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" v-on:click="emitLoginGlobalEvent()">Submit</b-button>
            </b-form>
        </b-list-group-item>
    </b-collapse>
</template>

<script>
import { EventBus } from '../event-bus';

export default {
    name: 'LoginForm',
    props: {

    },
    data: function () {
        return {
            form: {
                username: '',
                pass: ''
            }
        }
    },
    methods: {
        onSubmit: function (evt) {
            evt.preventDefault();
        },
        emitLoginGlobalEvent: function () {
            EventBus.$emit('login', this.form);
        }
    }
}
</script>