import {store} from './store.js';

export default {
    data() {
        return {
            store,
            username: null,
        };
    },

    methods: {
        async login() {
            try {
                const result = await axios.get(`/api/users`);
                const users = result.data;
                const found = users.find(user => user.username == this.username);
                if (found) {
                    this.store.login = found;
                } else {
                    alert(`No encuentro ningún usuario ${this.username}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    },

    template: `
<div class="component">
    <h1>Login</h1>
    <input type="text" class="form-control" placeholder="username" v-model="username">
    <p class="mt-2">
        <button class="btn btn-primary" @click="login">Login</button>
    </p>
    <p>
        <strong>Login:</strong> {{ store.login }}
    </p>
</div>
    `
};