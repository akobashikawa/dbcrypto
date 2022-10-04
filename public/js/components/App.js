import UsersList from './UsersList.js';
import DatosList from './DatosList.js';

export default {
    components: {
        UsersList,
        DatosList,
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
    <DatosList />
</div>
    `,
};