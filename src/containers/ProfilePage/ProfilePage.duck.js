import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { fetchCurrentUser } from '../../ducks/user.duck';
import { denormalisedResponseEntities } from '../../util/data';
import { storableError } from '../../util/errors';

// ================ Action types ================ //

export const SET_INITIAL_STATE = 'app/ProfilePage/SET_INITIAL_STATE';

export const SHOW_USER_REQUEST = 'app/ProfilePage/SHOW_USER_REQUEST';
export const SHOW_USER_SUCCESS = 'app/ProfilePage/SHOW_USER_SUCCESS';
export const SHOW_USER_ERROR = 'app/ProfilePage/SHOW_USER_ERROR';

export const QUERY_LISTINGS_REQUEST = 'app/ProfilePage/QUERY_LISTINGS_REQUEST';
export const QUERY_LISTINGS_SUCCESS = 'app/ProfilePage/QUERY_LISTINGS_SUCCESS';
export const QUERY_LISTINGS_ERROR = 'app/ProfilePage/QUERY_LISTINGS_ERROR';

export const QUERY_REVIEWS_REQUEST = 'app/ProfilePage/QUERY_REVIEWS_REQUEST';
export const QUERY_REVIEWS_SUCCESS = 'app/ProfilePage/QUERY_REVIEWS_SUCCESS';
export const QUERY_REVIEWS_ERROR = 'app/ProfilePage/QUERY_REVIEWS_ERROR';

export const ADD_TO_FAVORITE_SUCCESS = 'app/ProfilePage/ADD_TO_FAVORITE_SUCCESS';
export const ADD_TO_FAVORITE_ERROR = 'app/ProfilePage/ADD_TO_FAVORITE_SUCCESS';
export const REMOVE_FROM_FAVORITE_SUCCESS = 'app/ProfilePage/REMOVE_FROM_FAVORITE_SUCCESS';
export const REMOVE_FROM_FAVORITE_ERROR = 'app/ProfilePage/REMOVE_FROM_FAVORITE_ERROR';
export const SET_FAVORITE_STATUS = 'app/ProfilePage/SET_FAVORITE_STATUS';

// ================ Reducer ================ //

const initialState = {
  userId: null,
  userListingRefs: [],
  userShowError: null,
  queryListingsError: null,
  reviews: [],
  queryReviewsError: null,
  isFavorite: {
    status: null
  }
};

export default function profilePageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };
    case SHOW_USER_REQUEST:
      return { ...state, userShowError: null, userId: payload.userId };
    case SHOW_USER_SUCCESS:
      return state;
    case SHOW_USER_ERROR:
      return { ...state, userShowError: payload };

    case QUERY_LISTINGS_REQUEST:
      return {
        ...state,

        // Empty listings only when user id changes
        userListingRefs: payload.userId === state.userId ? state.userListingRefs : [],

        queryListingsError: null,
      };
    case QUERY_LISTINGS_SUCCESS:
      return { ...state, userListingRefs: payload.listingRefs };
    case QUERY_LISTINGS_ERROR:
      return { ...state, userListingRefs: [], queryListingsError: payload };
    case QUERY_REVIEWS_REQUEST:
      return { ...state, queryReviewsError: null };
    case QUERY_REVIEWS_SUCCESS:
      return { ...state, reviews: payload };
    case QUERY_REVIEWS_ERROR:
      return { ...state, reviews: [], queryReviewsError: payload };

    case ADD_TO_FAVORITE_SUCCESS:
      return state
    case ADD_TO_FAVORITE_ERROR:
      return state
    case REMOVE_FROM_FAVORITE_SUCCESS:
      return state
    case REMOVE_FROM_FAVORITE_ERROR:
      return state
    case SET_FAVORITE_STATUS:
      return {
        ...state,
        isFavorite: payload
      }

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const showUserRequest = userId => ({
  type: SHOW_USER_REQUEST,
  payload: { userId },
});

export const showUserSuccess = () => ({
  type: SHOW_USER_SUCCESS,
});

export const showUserError = e => ({
  type: SHOW_USER_ERROR,
  error: true,
  payload: e,
});

export const queryListingsRequest = userId => ({
  type: QUERY_LISTINGS_REQUEST,
  payload: { userId },
});

export const queryListingsSuccess = listingRefs => ({
  type: QUERY_LISTINGS_SUCCESS,
  payload: { listingRefs },
});

export const queryListingsError = e => ({
  type: QUERY_LISTINGS_ERROR,
  error: true,
  payload: e,
});

export const queryReviewsRequest = () => ({
  type: QUERY_REVIEWS_REQUEST,
});

export const queryReviewsSuccess = reviews => ({
  type: QUERY_REVIEWS_SUCCESS,
  payload: reviews,
});

export const queryReviewsError = e => ({
  type: QUERY_REVIEWS_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //

export const queryUserListings = userId => (dispatch, getState, sdk) => {
  dispatch(queryListingsRequest(userId));
  return sdk.listings
    .query({
      author_id: userId,
      include: ['author', 'images'],
      'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
    })
    .then(response => {
      // Pick only the id and type properties from the response listings
      const listingRefs = response.data.data.map(({ id, type }) => ({ id, type }));
      dispatch(addMarketplaceEntities(response));
      dispatch(queryListingsSuccess(listingRefs));
      return response;
    })
    .catch(e => dispatch(queryListingsError(storableError(e))));
};

export const queryUserReviews = userId => (dispatch, getState, sdk) => {
  sdk.reviews
    .query({
      subject_id: userId,
      state: 'public',
      include: ['author', 'author.profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    })
    .then(response => {
      const reviews = denormalisedResponseEntities(response);
      dispatch(queryReviewsSuccess(reviews));
    })
    .catch(e => dispatch(queryReviewsError(e)));
};

export const showUser = userId => (dispatch, getState, sdk) => {
  dispatch(showUserRequest(userId));
  return sdk.users
    .show({
      id: userId,
      include: ['profileImage'],
      'fields.image': ['variants.square-small', 'variants.square-small2x'],
    })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(showUserSuccess());
      return response;
    })
    .catch(e => dispatch(showUserError(storableError(e))));
};

export const loadData = userId => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState());

  return Promise.all([
    dispatch(fetchCurrentUser()),
    dispatch(showUser(userId)),
    dispatch(queryUserListings(userId)),
    dispatch(queryUserReviews(userId)),
    dispatch(fetchFavoriteStatus(userId.uuid))
  ]);
};

export const fetchFavoriteStatus = (minderId) => (dispatch, getState, sdk) => {
  sdk.currentUser.show().then(res => {
    const favoriteList = res.data.data.attributes.profile.publicData.favoritesList
    if (favoriteList.includes(minderId)) {
      dispatch({ type: SET_FAVORITE_STATUS, payload: { status: true } })
    } else dispatch({ type: SET_FAVORITE_STATUS, payload: { status: false } })
  })
}

export const addToFavorite = (minderId) => (dispatch, getState, sdk) => {
  sdk.currentUser.show().then(res => {
    const oldFavoritesList = res.data.data.attributes.profile.publicData.favoritesList
    let newFavoritesList = [minderId]
    if (oldFavoritesList) {
      if (oldFavoritesList.includes(minderId)) {
        newFavoritesList = oldFavoritesList
      } else {
        oldFavoritesList.push(minderId) 
        newFavoritesList = oldFavoritesList
      }
    }
    return newFavoritesList
  }).then(newFavoritesList => {
    sdk.currentUser.updateProfile({
      publicData: {
        favoritesList: newFavoritesList
      }
    }).then(() => {
      dispatch({ type: SET_FAVORITE_STATUS, payload: { status: true } })
      dispatch({ type: ADD_TO_FAVORITE_SUCCESS })
    }).catch((err) => {
      console.log(`error message: ${err}`)
      dispatch({ type: ADD_TO_FAVORITE_ERROR })
    })
  }).then(() => {
  }).catch(err => {
    console.log(`error message: ${err}`)
    dispatch({ type: ADD_TO_FAVORITE_ERROR })
  })
}

export const removeFromFavorite = (minderId) => (dispatch, getState, sdk) => {
  sdk.currentUser.show().then(res => {
    const favoritesList = res.data.data.attributes.profile.publicData.favoritesList
    if (favoritesList.includes(minderId)) {
      const filteredList = favoritesList.filter(id => id !== minderId)
      sdk.currentUser.updateProfile({
        publicData: {
          favoritesList: filteredList
        }
      }).then(res => {
        dispatch({ type: SET_FAVORITE_STATUS, payload: { status: false } })
        dispatch({ type: REMOVE_FROM_FAVORITE_SUCCESS })
      }).catch(err => {
        console.log(`error message: ${err}`)
        dispatch({ type: REMOVE_FROM_FAVORITE_ERROR })
      })
    }
  }).catch(err => {
    console.log(`error message: ${err}`)
    dispatch({ type: REMOVE_FROM_FAVORITE_ERROR })
  })
}
