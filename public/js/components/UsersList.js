export default {
    data() {
        return {
            title: 'Usuarios',
            items: []
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
        }
    },

    template: `
<div>
    <h2>{{title}}</h2>

    <button class="btn btn-secondary btn-sm float-end" @click="getItems">Traer items</button>

    <table class="table table-striped table-hover table-sm">
        <thead>
            <th>username</th>
            <th>password</th>
        </thead>
        <tbody>
            <tr v-for="item of items">
                <td>{{ item.username }}</td>
                <td>{{ item.password }}</td>
            </tr> 
        </tbody>
    </table>
</div>
    `,
};