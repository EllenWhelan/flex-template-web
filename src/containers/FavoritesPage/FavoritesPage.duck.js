import { types as sdkTypes } from '../../util/sdkLoader';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
const { UUID } = sdkTypes;

// ================ Action types ================ //
export const GET_FAVORITE_LISTINGS_SUCCESS = 'app/FavoritesPage/GET_FAVORITE_LISTINGS_SUCCESS'
export const GET_FAVORITE_LISTINGS_ERROR = 'app/FavoritesPage/GET_FAVORITE_LISTINGS_ERROR'

// ================ Reducer ================ //
const initialState = {
    favoriteListingIds: [1,2,3,4,5]
}

// ================ Action creators ================ //
const favoritesPageReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_FAVORITE_LISTINGS_SUCCESS:
            return {
                favoriteListingIds: action.payload
            }
        case GET_FAVORITE_LISTINGS_ERROR:
            return state
        default:
            return state
    }
}

export default favoritesPageReducer

// ================ Thunks ================ //
// export const getFavoriteListings2 = () => (dispatch, getState, sdk) => {
//     sdk.currentUser.show().then(async res => {
//         const ids = res.data.data.attributes.profile.publicData.favoritesList
//         return {
//             listingIds: ids,
//             listings: await Promise.all(ids.map(async id => {
//             const idObject = new UUID(id)
//             return await sdk.listings.show({ id: idObject }).then(res => {
//                 console.log(res)
//                 return res.data.data
//             }).catch(err => {
//                 dispatch({ type: GET_FAVORITE_LISTINGS_ERROR })
//             })
//         }))}
//     }).then(res => {
//         dispatch({ type: GET_FAVORITE_LISTINGS_SUCCESS, payload: res })
//         console.log({ data: res.listings })
//         // dispatch(addMarketplaceEntities({ data: res.listings }))
//         return res
//     }).catch(err => {
//         dispatch({ type: GET_FAVORITE_LISTINGS_ERROR })
//         throw err
//     })
// }

export const getFavoriteListings = () => (dispatch, getState, sdk) => {
    sdk.currentUser.show().then(async res => {
        const minderIds = res.data.data.attributes.profile.publicData.favoritesList
        const listingIds = []
        await asyncForEach(minderIds, async minderId => {
            await sdk.listings.query({ 
                authorId: minderId,
                include: ['author', 'images'],
                'fields.listing': ['title', 'geolocation', 'price', 'publicData'],
                'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
                'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
                'limit.images': 1,
            }).then(res => {
                dispatch(addMarketplaceEntities(res))
                res.data.data.forEach(listing => listingIds.push(listing.id))
            }).catch(err => {
                dispatch({ type: GET_FAVORITE_LISTINGS_ERROR })
                throw err
            })
        })
        return listingIds
    }).then(listingIds => {
        dispatch({ type: GET_FAVORITE_LISTINGS_SUCCESS, payload: listingIds })
        return listingIds
    }).catch(err => {
        dispatch({ type: GET_FAVORITE_LISTINGS_ERROR })
        throw err
    })
}

async function asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}