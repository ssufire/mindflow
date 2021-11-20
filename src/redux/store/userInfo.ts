// Declare Action
const SETNICKNAME = "userinfo/NICKNAME";

// Declare Action Generate Function
// Do not use Action directly, but use this function with store.dispatch
export const setNickname = (payload: string) => {
    return { type: SETNICKNAME, payload };
};

// Declare Initial State
const initialState = {
    nickname: "",
};

// Declare Reducer
export default function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case SETNICKNAME:
            if (action.payload !== undefined) {
                return {
                    ...state,
                    nickname: action.payload,
                };
            }

            return state;

        default:
            return state;
    }
}
