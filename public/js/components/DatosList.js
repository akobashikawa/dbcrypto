export default {
    data() {
        return {
            title: 'Datos',
            items: []
        };
    },

    mounted() {
        this.getItems();
    },

    methods: {
        async getItems() {
            try {
                const result = await axios.get(`/datos`);
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
            <th>publico</th>
            <th>privado</th>
        </thead>
        <tbody>
            <tr v-for="item of items">
                <td>{{ item.id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.publico }}</td>
                <td>{{ item.privado }}</td>
            </tr> 
        </tbody>
    </table>
</div>
    `,
};