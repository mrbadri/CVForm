import * as actions from './type'
export default function reducer(state = [[]], action) {
    
    switch (action.type) {

        case actions.USERLIST:
            let userList = [...state][0];
            userList.push(action.payload);
            state[0] = userList;
            return state
        
        default:
            return state
    }
}
