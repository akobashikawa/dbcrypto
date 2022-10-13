import UsersList from './UsersList.js';
import DatosList from './DatosList.js';
import Login from './Login.js';

export default {
    components: {
        UsersList,
        DatosList,
        Login,
    },
    
    data() {
        return {
            title: 'DB Crypto'
        };
    },

    template: `
<div>
    <h1>{{title}}</h1>
    <Login />
    <UsersList />
    <DatosList />
</div>
    `,
    
};