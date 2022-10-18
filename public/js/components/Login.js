import {store} from './store.js';

export default {
    data() {
        return {
            title: 'Login',
            store,
            username: null,
            password: null,
            privatekey: null,
        };
    },

    methods: {
        async login() {
            try {
                const result = await axios.get(`/api/users`);
                const users = result.data;
                const isValidUser = (user) => user.username == this.username && user.password == this.password;
                const found = users.find(user => isValidUser(user));
                if (found) {
                    found.privatekey = this.privatekey;
                    this.store.login = found;
                } else {
                    alert(`Revisar username y password y reintentar`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    },

    template: `
<div class="component">
    <h1>{{ title }}</h1>

    <form>
        <div class="mb-3">
            <label for="addUserInputUsername" class="form-label">username</label>
            <input v-model="username" type="text" class="form-control" id="addUserInputUsername" aria-describedby="addUserInputUsernameHelp">
            <div id="addUserInputUsernameHelp" class="form-text">Nombre de usuario</div>
        </div>
        <div class="mb-3">
            <label for="editUserInputPassword" class="form-label">password</label>
            <input v-model="password" type="text" class="form-control" id="editUserInputPassword" aria-describedby="editUserInputPasswordHelp">
            <div id="editUserInputPasswordHelp" class="form-text">Contraseña</div>
        </div>
        <div class="mb-3">
            <label for="addUserInputPrivatekey" class="form-label">privatekey</label>
            <textarea v-model="privatekey" class="form-control" id="addUserInputPrivatekey" aria-describedby="addUserInputPrivatekeyHelp"></textarea>
            <div id="addUserInputPrivatekeyHelp" class="form-text">Llave privada</div>
        </div>
    </form>
    <p class="mt-2">
        <button class="btn btn-primary" @click="login">Login</button>
    </p>
    <p>
        <strong>Login:</strong> {{ store.login }}
    </p>
</div>
    `
};