import {store} from './store.js';

export default {
    data() {
        return {
            title: 'Usuarios',
            store,

            users: [],
            addUserData: {
                username: '',
                password: '',
                publickey: '',
                privatekey: '',
            },
            editUserData: {
                id: null,
                username: '',
                password: '',
                publickey: '',
                privatekey: '',
            },
            addUserModal: null,
            editUserModal: null,
            updateKeysModal: null,
            toast: null,
            toastMessage: 'Hola',
            toastClass: 'bg-secondary',
            toastOptions: {
                delay: 1000
            },
        };
    },

    mounted() {
        this.getUsers();
        this.addUserModal = new bootstrap.Modal('#addUserModal', {
            backdrop: 'static'
        });
        this.editUserModal = new bootstrap.Modal('#editUserModal', {
            backdrop: 'static'
        });
        this.updateKeysModal = new bootstrap.Modal('#updateKeysModal', {
            backdrop: 'static'
        });
        this.toast = new bootstrap.Toast('#toast', this.toastOptions);
    },

    methods: {
        toastSuccess(message) {
            this.toastMessage = message;
            this.toastClass = 'bg-success';
            this.toast.show();
        },

        toastError(message) {
            this.toastMessage = message;
            this.toastClass = 'bg-danger';
            this.toast.show();
        },

        async getUsers() {
            try {
                const result = await axios.get(`/api/users`);
                this.users = result.data;
            } catch (error) {
                console.log(error);
            }
        },

        addUserModalOpen() {
            this.addUserModal.show();
        },

        async addUser() {
            try {
                console.log(this.addUserData);
                const data = this.addUserData;
                const result = await axios.post(`/api/users`, data);
                console.log(result);
                await this.getUsers();

                this.toastSuccess('Usuario creado');

                this.addUserModal.hide();
            } catch (error) {
                console.log(error);
            }
        },

        async editUserModalOpen(userId) {
            try {
                const result = await axios.get(`/api/users/${userId}`);
                this.editUserData = result.data;
                this.editUserModal.show()
            } catch (error) {
                console.log(error);
            }
        },

        async updateUser() {
            try {
                console.log(this.editUserData);
                const data = this.editUserData;
                const result = await axios.put(`/api/users/${data.id}`, data);
                console.log(result);
                await this.getUsers();
                
                this.toastSuccess('Usuario modificado');

                this.editUserModal.hide();
            } catch (error) {
                console.log(error);
                this.toastError(error);
            }
        },

        async deleteUser() {
            try {
                console.log(this.editUserData);
                const data = this.editUserData;
                const result = await axios.delete(`/api/users/${data.id}`, data);
                console.log(result);
                await this.getUsers();
                this.editUserModal.hide();
                this.toastSuccess('Usuario eliminado');
            } catch (error) {
                console.log(error);
                this.toastError(error);
            }
        },

        async updateKeys() {
            try {
                console.log(this.editUserData);
                const data = this.editUserData;
                const userId = data.id;
                let result = await axios.put(`/api/users/${userId}/updatekeys`, data);
                result = await axios.get(`/api/users/${userId}`);
                console.log(result);
                this.editUserData = result.data;

                this.toastSuccess('Nuevas llaves creadas');

                this.updateKeysModalClose();
            } catch (error) {
                console.log(error);
                this.toastError(error);
            }
        },

        updateKeysModalOpen() {
            this.editUserModal.toggle();
            this.updateKeysModal.toggle();
        },

        updateKeysModalClose() {
            this.updateKeysModal.toggle();
            this.editUserModal.toggle();
        }
    },

    template: `
<div class="component" v-show="store.login && store.login['username'] == 'admin'">
    <h1>{{title}}</h1>

    <button type="button" class="btn btn-primary btn-sm ms-1 float-end" v-if="store.login" @click="addUserModalOpen"> Crear </button>
    <button class="btn btn-secondary btn-sm float-end" @click="getUsers">Traer items</button>

    <table class="table table-striped table-hover table-sm">
        <thead>
            <th>id</th>
            <th>username</th>
            <th>password</th>
            <th>publickey</th>
            <th>privatekey</th>
        </thead>
        <tbody>
            <tr v-for="user of users" :key="user.id">
                <td>{{ user.id }}</td>
                <td><a href="#" @click.prevent="editUserModalOpen(user.id)">{{ user.username }}</a></td>
                <td>{{ user.password }}</td>
                <td>{{ user.publickey ? ( user.publickey.length > 79 ? user.publickey.substr(71, 8) : user.publickey ) : '-' }}</td>
                <td>{{ user.privatekey ? ( user.publickey.length > 95 ? user.privatekey.substr(86, 8) : user.publickey ) : '-' }}</td>
            </tr> 
        </tbody>
    </table>

    <!-- addUserModal -->
    <div class="modal fade" id="addUserModal" ref="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-danger" id="addUserModalLabel">Crear Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="addUserInputUsername" class="form-label">username</label>
                        <input v-model="addUserData.username" type="text" class="form-control" id="addUserInputUsername" aria-describedby="addUserInputUsernameHelp">
                        <div id="addUserInputUsernameHelp" class="form-text">Nombre de usuario</div>
                    </div>
                    <div class="mb-3">
                        <label for="addUserInputPassword" class="form-label">password</label>
                        <input v-model="addUserData.password" type="text" class="form-control" id="addUserInputPassword" aria-describedby="addUserInputPasswordHelp">
                        <div id="addUserInputPasswordHelp" class="form-text">Contraseña</div>
                    </div>
                    <div class="mb-3">
                        <label for="addUserInputPublickey" class="form-label">publickey</label>
                        <textarea v-model="addUserData.publickey" class="form-control" id="addUserInputPublickey" aria-describedby="addUserInputPublickeyHelp"></textarea>
                        <div id="addUserInputPublickeyHelp" class="form-text">Llave pública</div>
                    </div>
                    <div class="mb-3">
                        <label for="addUserInputPrivatekey" class="form-label">privatekey</label>
                        <textarea v-model="addUserData.privatekey" class="form-control" id="addUserInputPrivatekey" aria-describedby="addUserInputPrivatekeyHelp"></textarea>
                        <div id="addUserInputPrivatekeyHelp" class="form-text">Llave privada</div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="addUser">Crear</button>
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cancelar</button>
            </div>
            </div>
        </div>
    </div>

    <!-- editUserModal -->
    <div class="modal fade" id="editUserModal" ref="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger" id="editUserModalLabel">Modificar Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="editUserInputUsername" class="form-label">username</label>
                            <input v-model="editUserData.username" type="text" class="form-control" id="editUserInputUsername" aria-describedby="editUserInputUsernameHelp">
                            <div id="editUserInputUsernameHelp" class="form-text">Nombre de usuario</div>
                        </div>
                        <div class="mb-3">
                            <label for="editUserInputPassword" class="form-label">password</label>
                            <input v-model="editUserData.password" type="text" class="form-control" id="editUserInputPassword" aria-describedby="editUserInputPasswordHelp">
                            <div id="editUserInputPasswordHelp" class="form-text">Contraseña</div>
                        </div>
                        <div class="mb-3">
                            <label for="editUserInputPublickey" class="form-label">publickey</label>
                            <textarea v-model="editUserData.publickey" class="form-control" id="editUserInputPublickey" aria-describedby="editUserInputPublickeyHelp"></textarea>
                            <div id="editUserInputPublickeyHelp" class="form-text">Llave pública</div>
                        </div>
                        <div class="mb-3">
                            <label for="editUserInputPrivatekey" class="form-label">privatekey</label>
                            <textarea v-model="editUserData.privatekey" class="form-control" id="editUserInputPrivatekey" aria-describedby="editUserInputPrivatekeyHelp"></textarea>
                            <div id="editUserInputPrivatekeyHelp" class="form-text">Llave privada</div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateUser">Guardar</button>
                    <button type="button" class="btn btn-info" @click="updateKeysModalOpen">Nuevas llaves</button>
                    <button type="button" class="btn btn-danger" @click="deleteUser">Eliminar</button>
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- updateKeysModal -->
    <div class="modal fade" id="updateKeysModal" ref="updateKeysModal" tabindex="-1" aria-labelledby="updateKeysModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger" id="updateKeysModalLabel">Generar Nuevas Llaves</h5>
                    <button type="button" class="btn-close" aria-label="Cerrar" @click="updateKeysModalClose"></button>
                </div>
                <div class="modal-body">
                    Se creará un nuevo par de llaves. Las actuales dejarán de funcionar.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" @click="updateKeys">Generar</button>
                    <button type="button" class="btn btn-warning" @click="updateKeysModalClose">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast -->
    <div class="toast-container bottom-0 start-50 translate-middle-x">
        <div id="toast" class="toast align-items-center text-white border-0" :class="toastClass" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    {{ toastMessage }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>

</div>
    `,
};