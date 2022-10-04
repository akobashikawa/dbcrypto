import UsersList from './UsersList.js';

export default {
    components: {
        UsersList
    },
    
    data() {
        return {
            title: 'DB Crypto'
        };
    },

    template: `
<div>
    <h1>{{title}}</h1>
    <UsersList />
</div>
    `,
};