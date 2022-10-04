export default {
    data() {
        return {
            title: 'Usuarios',
            items: [],
            newUser: {
                username: '',
                publickey: ''
            }
        };
    },

    mounted() {
        this.getItems();
    },

    methods: {
        async getItems() {
            try {
                const result = await axios.get(`/users`);
                this.items = result.data;
            } catch (error) {
                console.log(error);
            }
        },

        addUserModal() {
            new bootstrap.Modal('#addUserModal', {
                backdrop: 'static'
            }).show();
        },

        addUser() {
            console.log(this.newUser);
        },
    },

    template: `
<div>
    <h2>{{title}}</h2>

    <button class="btn btn-secondary btn-sm" @click="getItems">Traer items</button>
    <button type="button" class="btn btn-primary btn-sm ms-1" @click="addUserModal">
        Crear
    </button>

    <table class="table table-striped table-hover table-sm">
        <thead>
            <th>id</th>
            <th>username</th>
            <th>publickey</th>
        </thead>
        <tbody>
            <tr v-for="item of items">
                <td>{{ item.id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.publickey }}</td>
            </tr> 
        </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
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
                        <input v-model="newUser.username" type="text" class="form-control" id="addUserInputUsername" aria-describedby="addUserInputUsernameHelp">
                        <div id="addUserInputUsernameHelp" class="form-text">Nombre de usuario</div>
                    </div>
                    <div class="mb-3">
                        <label for="addUserInputPublickey" class="form-label">publickey</label>
                        <textarea v-model="newUser.publickey" class="form-control" id="addUserInputPublickey" aria-describedby="addUserInputPublickeyHelp"></textarea>
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

</div>
    `,
};