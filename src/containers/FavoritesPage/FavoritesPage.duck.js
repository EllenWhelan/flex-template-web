import { types as sdkTypes } from '../../util/sdkLoader';

// ================ Action types ================ //
export const GET_FAVORITE_MINDERS_SUCCESS = 'app/FavoritesPage/GET_FAVORITE_MINDERS_SUCCESS'
export const GET_FAVORITE_MINDERS_ERROR = 'app/FavoritesPage/GET_FAVORITE_MINDERS_ERROR'

// ================ Reducer ================ //
const initialState = {
    favoriteMinders: []
}

// ================ Action creators ================ //
const favoritesPageReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_FAVORITE_MINDERS_SUCCESS:
            return {
                ...state,
                favoriteMinders: action.payload
            }
        case GET_FAVORITE_MINDERS_ERROR:
            return state
        default:
            return state
    }
}

export default favoritesPageReducer

// ================ Thunks ================ //
export const getFavoriteMinders = () => (dispatch, getState, sdk) => {
    sdk.currentUser.show().then(async res => {
        const minderIds = res.data.data.attributes.profile.publicData.favoritesList
        const minders = []
        await asyncForEach(minderIds, async minderId => {
            await sdk.users.show({ 
                id: minderId
            }).then(res => {
                minders.push(res.data.data)
            }).catch(err => {
                dispatch({ type: GET_FAVORITE_MINDERS_ERROR })
                throw err
            })
        })
        return minders
    }).then(minders => {
        dispatch({ type: GET_FAVORITE_MINDERS_SUCCESS, payload: minders })
        return minders
    }).catch(err => {
        dispatch({ type: GET_FAVORITE_MINDERS_ERROR })
        throw err
    })
}

// async for-loop
async function asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}