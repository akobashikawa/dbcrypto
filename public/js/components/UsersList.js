export default {
    data() {
        return {
            title: 'Usuarios',
            users: [],
            newUserData: {
                username: '',
                password: '',
                publickey: ''
            },
            editUserData: {
                id: null,
                username: '',
                password: '',
                publickey: ''
            },
            addUserModal: null,
            editUserModal: null,
        };
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        async getUsers() {
            try {
                const result = await axios.get(`/api/users`);
                this.users = result.data;
            } catch (error) {
                console.log(error);
            }
        },

        addUserModalOpen() {
            this.addUserModal = new bootstrap.Modal('#addUserModal', {
                backdrop: 'static'
            });
            this.addUserModal.show();
        },

        async addUser() {
            try {
                console.log(this.newUserData);
                const data = this.newUserData;
                const result = await axios.post(`/api/users`, data);
                console.log(result);
                await this.getUsers();
                this.addUserModal.hide();
            } catch (error) {
                console.log(error);
            }
        },

        async editUserModalOpen(userId) {
            try {
                const result = await axios.get(`/api/users/${userId}`);
                this.editUserData = result.data;
                this.editUserModal = new bootstrap.Modal('#editUserModal', {
                    backdrop: 'static'
                });
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
                this.editUserModal.hide();
            } catch (error) {
                console.log(error);
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
            } catch (error) {
                console.log(error);
            }
        },
    },

    template: `
<div class="component">
    <h1>{{title}}</h1>

    <button type="button" class="btn btn-primary btn-sm ms-1 float-end" @click="addUserModalOpen"> Crear </button>
    <button class="btn btn-secondary btn-sm float-end" @click="getUsers">Traer items</button>

    <table class="table table-striped table-hover table-sm">
        <thead>
            <th>id</th>
            <th>username</th>
            <th>password</th>
            <th>publickey</th>
        </thead>
        <tbody>
            <tr v-for="user of users">
                <td>{{ user.id }}</td>
                <td><a href="#" @click.prevent="editUserModalOpen(user.id)">{{ user.username }}</a></td>
                <td>{{ user.password }}</td>
                <td>{{ user.publickey }}</td>
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
                        <input v-model="newUserData.username" type="text" class="form-control" id="addUserInputUsername" aria-describedby="addUserInputUsernameHelp">
                        <div id="addUserInputUsernameHelp" class="form-text">Nombre de usuario</div>
                    </div>
                    <div class="mb-3">
                        <label for="editUserInputPassword" class="form-label">password</label>
                        <input v-model="editUserData.password" type="text" class="form-control" id="editUserInputPassword" aria-describedby="editUserInputPasswordHelp">
                        <div id="editUserInputPasswordHelp" class="form-text">Contraseña</div>
                    </div>
                    <div class="mb-3">
                        <label for="addUserInputPublickey" class="form-label">publickey</label>
                        <textarea v-model="newUserData.publickey" class="form-control" id="addUserInputPublickey" aria-describedby="addUserInputPublickeyHelp"></textarea>
                        <div id="addUserInputPublickeyHelp" class="form-text">Llave pública</div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" @click="addUser">Crear</button>
            </div>
            </div>
        </div>
    </div>

    <!-- editUserModal -->
    <div class="modal fade" id="editUserModal" ref="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
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
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-danger" @click="deleteUser">Eliminar</button>
                <button type="button" class="btn btn-primary" @click="updateUser">Guardar</button>
            </div>
            </div>
        </div>
    </div>

</div>
    `,
};