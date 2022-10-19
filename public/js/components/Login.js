import {store} from './store.js';

export default {
    data() {
        return {
            title: 'Login',
            store,
            username: null,
            password: null,
        };
    },

    mounted() {
        if (localStorage.login) {
            this.store.login = JSON.parse(localStorage.login);
        }
    },

    methods: {
        async login() {
            try {
                const result = await axios.get(`/api/users`);
                const users = result.data;console.log(users);
                const isValidUser = (user) => user.username == this.username && user.password == this.password;
                const found = users.find(user => isValidUser(user));
                if (found) {
                    console.log(found);
                    this.store.login = found;
                    localStorage.login = JSON.stringify(this.store.login);
                } else {
                    alert(`Revisar username y password y reintentar`);
                }
            } catch (error) {
                console.log(error);
            }
        },

        logout() {
            this.store.login = null;
            localStorage.login = JSON.stringify(this.store.login);
        }
    },

    template: `
<div class="component">
    <h1>{{ title }}</h1>

    <div v-if="store.login">
        <pre style="white-space:pre-line;">{{ store.login }}</pre>
        <p class="mt-2">
            <button class="btn btn-primary" @click="logout">Logout</button>
        </p>
    </div>

    <div v-else>
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
    </div>
</div>
    `
};