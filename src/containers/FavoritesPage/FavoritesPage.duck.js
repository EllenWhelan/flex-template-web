import { types as sdkTypes } from '../../util/sdkLoader';
const { UUID } = sdkTypes;

// ================ Action types ================ //
export const GET_FAVORITE_LISTINGS_SUCCESS = 'app/FavoritesPage/GET_FAVORITE_LISTINGS_SUCCESS'
export const GET_FAVORITE_LISTINGS_ERROR = 'app/FavoritesPage/GET_FAVORITE_LISTINGS_ERROR'

// ================ Reducer ================ //
const initialState = {
    favoriteListings: []
}

// ================ Action creators ================ //
const favoritesPageReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_FAVORITE_LISTINGS_SUCCESS:
            
            return {
                ...state,
                favoriteListings: action.payload
            }
        case GET_FAVORITE_LISTINGS_ERROR:
            return state
        default:
            return state
    }
}

export default favoritesPageReducer

// ================ Thunks ================ //
export const getFavoriteListings = () => (dispatch, getState, sdk) => {
    sdk.currentUser.show().then(res => {
        const ids = res.data.data.attributes.profile.publicData.favoritesList
        return Promise.all(ids.map(async id => {
            const idObject = new UUID(id)
            return await sdk.listings.show({ id: idObject }).then(res => {
                console.log('listing fetched')
                console.log(res.data.data)
                return res.data.data
            }).catch(err => {
                dispatch({ type: GET_FAVORITE_LISTINGS_ERROR })
            })
        }))
    }).then((listings) => {
        console.log(listings)
        dispatch({ type: GET_FAVORITE_LISTINGS_SUCCESS, payload: listings })
    }).catch(err => {
        dispatch({ type: GET_FAVORITE_LISTINGS_ERROR })
    })
}

