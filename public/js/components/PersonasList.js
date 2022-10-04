export default {
    data() {
        return {
            title: 'Personas',
            items: []
        };
    },

    mounted() {
        // this.getItems();
    },

    methods: {
        async getItems() {
            try {
                const result = await axios.get(`/personas`);
                this.items = result.data;
            } catch (error) {
                console.log(error);
            }
        }
    },

    template: `
<div>
    <h2>{{title}}</h2>

    <button class="btn btn-secondary btn-sm float-end" @click="getItems">Traer items</button>

    <table class="table table-striped table-hover table-sm">
        <thead>
            <th>id</th>
            <th>username</th>
            <th>Nombre</th>
            <th>Secreto</th>
        </thead>
        <tbody>
            <tr v-for="item of items">
                <td>{{ item.id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.secreto }}</td>
            </tr> 
        </tbody>
    </table>
</div>
    `,
};