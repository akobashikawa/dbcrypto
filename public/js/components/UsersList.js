export default {
    data() {
        return {
            title: 'Usuarios',
            users: [],
            newUserData: {
                username: '',
                publickey: ''
            },
            editUserData: {
                id: null,
                username: '',
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

        async deleteUserModalOpen(userId) {
            console.log(userId);
        },
    },

    template: `
<div>
    <h2>{{title}}</h2>

    <button class="btn btn-secondary btn-sm" @click="getUsers">Traer items</button>
    <button type="button" class="btn btn-primary btn-sm ms-1" @click="addUserModalOpen">
        Crear
    </button>

    <table class="table table-striped table-hover table-sm">
        <thead>
            <th>id</th>
            <th>username</th>
            <th>publickey</th>
            <th>acciones</th>
        </thead>
        <tbody>
            <tr v-for="user of users">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.publickey }}</td>
                <td>
                <button class="btn btn-warning btn-sm" @click="editUserModalOpen(user.id)">Modificar</button>
                <button class="btn btn-danger btn-sm ms-1" @click="deleteUserModalOpen(user.id)">Eliminar</button>
                </td>
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
                        <label for="addUserInputPublickey" class="form-label">publickey</label>
                        <textarea v-model="newUserData.publickey" class="form-control" id="addUserInputPublickey" aria-describedby="addUserInputPublickeyHelp"></textarea>
                        <div id="addUserInputPublickeyHelp" class="form-text">Llave pública</div>
                    </div>
                    <button type="button" class="btn btn-primary" @click="addUser">Crear</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
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
                        <label for="editUserInputPublickey" class="form-label">publickey</label>
                        <textarea v-model="editUserData.publickey" class="form-control" id="editUserInputPublickey" aria-describedby="editUserInputPublickeyHelp"></textarea>
                        <div id="editUserInputPublickeyHelp" class="form-text">Llave pública</div>
                    </div>
                    <button type="button" class="btn btn-primary" @click="updateUser">Guardar</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
    </div>

</div>
    `,
};