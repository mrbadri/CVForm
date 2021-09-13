import * as actions from './type'

  export function setUserListValue(value) {
    return {
      type: actions.USERLIST,
      payload : value
    }
  }
