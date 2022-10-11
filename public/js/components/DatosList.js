export default {
    data() {
        return {
            title: 'Datos',
            datos: [],
            newDatoData: {
                userId: '',
                publico: '',
                privado: ''
            },
            editDatoData: {
                id: null,
                userId: '',
                publico: '',
                privado: ''
            },
            addDatoModal: null,
            editDatoModal: null,
        };
    },

    mounted() {
        this.getDatos();
    },

    methods: {
        async getDatos() {
            try {
                const result = await axios.get(`/api/datos`);
                this.datos = result.data;
            } catch (error) {
                console.log(error);
            }
        },

        addDatoModalOpen() {
            this.addDatoModal = new bootstrap.Modal('#addDatoModal', {
                backdrop: 'static'
            });
            this.addDatoModal.show();
        },

        async addDato() {
            try {
                console.log(this.newDatoData);
                const data = this.newDatoData;
                const result = await axios.post(`/api/datos`, data);
                console.log(result);
                await this.getDatos();
                this.addDatoModal.hide();
            } catch (error) {
                console.log(error);
            }
        },

        async editDatoModalOpen(userId) {
            try {
                const result = await axios.get(`/api/datos/${userId}`);
                this.editDatoData = result.data;
                this.editDatoModal = new bootstrap.Modal('#editDatoModal', {
                    backdrop: 'static'
                });
                this.editDatoModal.show()
            } catch (error) {
                console.log(error);
            }
        },

        async updateDato() {
            try {
                console.log(this.editDatoData);
                const data = this.editDatoData;
                const result = await axios.put(`/api/datos/${data.id}`, data);
                console.log(result);
                await this.getDatos();
                this.editDatoModal.hide();
            } catch (error) {
                console.log(error);
            }
        },

        async deleteDato() {
            try {
                console.log(this.editDatoData);
                const data = this.editDatoData;
                const result = await axios.delete(`/api/datos/${data.id}`, data);
                console.log(result);
                await this.getDatos();
                this.editDatoModal.hide();
            } catch (error) {
                console.log(error);
            }
        },
    },

    template: `
<div>
    <h2>{{title}}</h2>

    <button type="button" class="btn btn-primary btn-sm ms-1 float-end" @click="addDatoModalOpen"> Crear </button>
    <button class="btn btn-secondary btn-sm float-end" @click="getDatos">Traer items</button>

    <table class="table table-striped table-hover table-sm">
        <thead>
            <th>id</th>
            <th>userId</th>
            <th>publico</th>
            <th>privado</th>
        </thead>
        <tbody>
            <tr v-for="user of datos">
                <td><a href="#" @click.prevent="editDatoModalOpen(user.id)">{{ user.id }}</a></td>
                <td>{{ user.userId }}</td>
                <td>{{ user.publico }}</td>
                <td>{{ user.privado }}</td>
            </tr> 
        </tbody>
    </table>

    <!-- addDatoModal -->
    <div class="modal fade" id="addDatoModal" ref="addDatoModal" tabindex="-1" aria-labelledby="addDatoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-danger" id="addDatoModalLabel">Crear Dato</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="addDatoInputUserId" class="form-label">userId</label>
                        <input v-model="newDatoData.userId" type="text" class="form-control" id="addDatoInputUserId" aria-describedby="addDatoInputUserIdHelp">
                        <div id="addDatoInputUserIdHelp" class="form-text">id de usuario</div>
                    </div>
                    <div class="mb-3">
                        <label for="editDatoInputPassword" class="form-label">publico</label>
                        <textarea v-model="editDatoData.publico" class="form-control" id="editDatoInputPassword" aria-describedby="editDatoInputPasswordHelp"></textarea>
                        <div id="editDatoInputPasswordHelp" class="form-text">dato público</div>
                    </div>
                    <div class="mb-3">
                        <label for="addDatoInputPublickey" class="form-label">privado</label>
                        <textarea v-model="newDatoData.privado" class="form-control" id="addDatoInputPublickey" aria-describedby="addDatoInputPublickeyHelp"></textarea>
                        <div id="addDatoInputPublickeyHelp" class="form-text">dato privado</div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" @click="addDato">Crear</button>
            </div>
            </div>
        </div>
    </div>

    <!-- editDatoModal -->
    <div class="modal fade" id="editDatoModal" ref="editDatoModal" tabindex="-1" aria-labelledby="editDatoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-danger" id="editDatoModalLabel">Modificar Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="editDatoInputUserId" class="form-label">userId</label>
                        <input v-model="editDatoData.userId" type="text" class="form-control" id="editDatoInputUserId" aria-describedby="editDatoInputUserIdHelp">
                        <div id="editDatoInputUserIdHelp" class="form-text">id de usuario</div>
                    </div>
                    <div class="mb-3">
                        <label for="editDatoInputPublico" class="form-label">publico</label>
                        <textarea v-model="editDatoData.publico" type="text" class="form-control" id="editDatoInputPublico" aria-describedby="editDatoInputPublicoHelp"></textarea>
                        <div id="editDatoInputPublicoHelp" class="form-text">dato público</div>
                    </div>
                    <div class="mb-3">
                        <label for="editDatoInputPrivado" class="form-label">privado</label>
                        <textarea v-model="editDatoData.privado" class="form-control" id="editDatoInputPrivado" aria-describedby="editDatoInputPrivadoHelp"></textarea>
                        <div id="editDatoInputPrivadoHelp" class="form-text">dato privado</div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-danger" @click="deleteDato">Eliminar</button>
                <button type="button" class="btn btn-primary" @click="updateDato">Guardar</button>
            </div>
            </div>
        </div>
    </div>

</div>
    `,
};