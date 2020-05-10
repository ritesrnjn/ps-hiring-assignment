import { CALL_API } from '../middlewares/api'

// fetch articles
export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST'
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE'

// Fetch fleet from API
const fetchArticleAction = url => ({
  [CALL_API]: {
    types: [
      FETCH_ARTICLES_REQUEST,
      FETCH_ARTICLES_SUCCESS,
      FETCH_ARTICLES_FAILURE
    ],
    endpoint: url
  }
})

export const fetchArticles = nextPage => (dispatch, getState) => {
  const url = `https://hn.algolia.com/api/v1/search?page=${nextPage}`
  dispatch(fetchArticleAction(url))

  return null
}

// hide article
export const HIDE_ARTICLE = 'HIDE_ARTICLE'
export const hideArticle = articleId => dispatch => {
  dispatch({
    type: HIDE_ARTICLE,
    articleId
  })
  return null
}

// upvote article
export const UPVOTE_ARTICLE = 'UPVOTE_ARTICLE'
export const upvoteArticle = articleId => dispatch => {
  dispatch({
    type: UPVOTE_ARTICLE,
    articleId
  })
  return null
}
