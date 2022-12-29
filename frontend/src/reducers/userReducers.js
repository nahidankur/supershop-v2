import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT,
USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET,
USER_DETAILS_RESET,
USER_UPDATE_PROFILE_SUCCESS,
USER_LIST_REQUEST,
USER_LIST_SUCCESS,
USER_LIST_FAIL,
USER_LIST_RESET,
USER_DELETE_REQUEST,
USER_DELETE_SUCCESS,
USER_DELETE_FAIL,
USER_UPDATE_REQUEST,
USER_UPDATE_SUCCESS,
USER_UPDATE_FAIL,
USER_UPDATE_RESET,
USER_DETAILSByAdmin_REQUEST,
USER_DETAILSByAdmin_SUCCESS,
USER_DETAILSByAdmin_FAIL,
USER_DETAILSByAdmin_RESET
} from '../constants/constants'

export const userLogin = (state = { }, action)=> {
    const {type, payload } = action

    switch(type){
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegister = (state = { }, action)=> {
    const {type, payload } = action

    switch(type){
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state
    }
}

export const userDetails = (state =  {user: {}} , action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { loading: true }
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload }
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case USER_DETAILS_RESET:
        return {
          user: {}
        }
      default:
        return state
    }
  }

  export const userDetailsByAdmin = (state =  {user: {}} , action) => {
    switch (action.type) {
      case USER_DETAILSByAdmin_REQUEST:
        return { loading: true }
      case USER_DETAILSByAdmin_SUCCESS:
        return { loading: false, user: action.payload }
      case USER_DETAILSByAdmin_FAIL:
        return { loading: false, error: action.payload }
      case  USER_DETAILSByAdmin_RESET:
          return {
            user: {}
          }
      default:
        return state
    }
  }

  export const userUpdateProfile = (state =  {} , action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true }
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload }
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload }
      case USER_UPDATE_PROFILE_RESET:
        return { }
      default:
        return state
    }
  }

  export const userList = (state =  { users: [] } , action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true }
      case USER_LIST_SUCCESS:
        return { loading: false, success: true, users: action.payload }
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload }
      case USER_LIST_RESET:
        return { }
      default:
        return state
    }
  }

  export const userDelete = (state =  {  } , action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { loading: true }
      case USER_DELETE_SUCCESS:
        return { loading: false, success: true }
      case USER_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userUpdate = (state =  { user: {} } , action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true }
      case USER_UPDATE_SUCCESS:
        return { loading: false, success: true }
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case USER_UPDATE_RESET:
        return {
          user: {}
        }
      default:
        return state
    }
  }