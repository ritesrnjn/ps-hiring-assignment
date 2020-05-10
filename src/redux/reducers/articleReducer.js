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
      const hidden = state.hidden.add(action.articleId)
      return {
        ...state,
        hidden
      }

    case UPVOTE_ARTICLE:
      let votes = (state.upvotes[action.articleId] ||0) +1
      const upvotes = {
        ...state.upvotes,
        [action.articleId]: votes
      }
      return {
        ...state,
        upvotes
      }

    default:
      return state
  }
}
