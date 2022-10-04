import UsersList from './UsersList.js';
import PersonasList from './PersonasList.js';

export default {
    components: {
        UsersList,
        PersonasList
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
    <PersonasList />
</div>
    `,
};