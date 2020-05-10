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
      state.hidden.add(action.articleId)

      return {
        ...state,
        hits: state.hits.filter(o => o.objectID !== action.articleId),
        hidden: state.hidden
      }

    case UPVOTE_ARTICLE:
      return {
        ...state,
        upvotes: {
          ...state.upvotes,
          [action.articleId]: (state.upvotes[action.articleId] || 0) + 1
        }
      }

    default:
      return state
  }
}
