import {
  FETCH_ARTICLES_SUCCESS,
  HIDE_ARTICLE,
  UPVOTE_ARTICLE
} from '../actions/article'

const initialState = {
  hits: [],
  page: 1,
  hidden: new Set([]),
  upvotes: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        hits: action.response.hits
      }

    case HIDE_ARTICLE:
      // Get article list---> set hidden to true
      return {
        ...state
      }
    case UPVOTE_ARTICLE:
      // + to upvotes
      return {
        ...state
      }

    default:
      return state
  }
}
