<template>
    <b-dropdown :user="user" :text="userMsg" right>
        <b-list-group v-if="user.username">
            <b-list-group-item>
                <b-button disabled>Change password</b-button>
            </b-list-group-item>
            <b-list-group-item>
                <b-button v-on:click="emitLogoutGlobalEvent">Logout</b-button>
            </b-list-group-item>
        </b-list-group>
        
        <b-list-group v-else>
            <b-list-group>
                <b-list-group-item>
                    <b-button v-b-toggle.login-form>Login</b-button>
                </b-list-group-item>
                <login-form
                    
                />
            </b-list-group>
            <b-list-group>
                <b-list-group-item>
                    <b-button v-b-toggle.create-form>Create an account</b-button>
                </b-list-group-item>
                <create-account-form/>
            </b-list-group>
        </b-list-group>
    </b-dropdown>
</template>

<script>
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import { EventBus } from '../event-bus';

export default {
    name:'UserMenu',
    props: {
        user: Object
    },
    components: {
        LoginForm,
        CreateAccountForm
    },
    computed: {
        userMsg() {
            return this.user.username ? this.user.username : 'Login here!'
        }
    },
    methods: {
        emitLogoutGlobalEvent: function () {
            EventBus.$emit('logout');
        }
    }
}
</script>