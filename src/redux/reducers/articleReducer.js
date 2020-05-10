import {
  FETCH_ARTICLES_SUCCESS,
  HIDE_ARTICLE,
  UPVOTE_ARTICLE
} from '../actions/article'

import { setItem, getItem } from '../../storageUtil'

function initializeState() {
  let hidden = getItem('hidden')

  if (hidden) {
    hidden = hidden.split(',')
    hidden = new Set([...hidden])
  }
  let upvotes = getItem('upvotes')
  upvotes = upvotes ? JSON.parse(upvotes) : {}

  return {
    hits: [],
    page: 1,
    hidden: hidden || new Set([]),
    upvotes: upvotes || {}
  }
}

const initialState = initializeState()

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      // filter hidden
      let hits = action.response.hits.filter(o => !state.hidden.has(o.objectID))
      // Add upvotes
      hits = hits.map(h => {
        if (state.upvotes[h.objectID]) {
          h.points = state.upvotes[h.objectID]
        }
        return h
      })
      return {
        ...state,
        hits
      }

    case HIDE_ARTICLE:
      state.hidden.add(action.articleId)
      setItem('hidden', [...state.hidden])

      return {
        ...state,
        hits: state.hits.filter(o => o.objectID !== action.articleId),
        hidden: state.hidden
      }

    case UPVOTE_ARTICLE:
      const { points } = state.hits.find(o => o.objectID === action.articleId)
      const hitsArt = state.hits.map(o => {
        if (o.objectID === action.articleId) {
          o.points = points + 1
        }
        return o
      })
      const upvotes = {
        ...state.upvotes,
        [action.articleId]: points + 1
      }

      setItem('upvotes', JSON.stringify(upvotes))
      return {
        ...state,
        hits: hitsArt,
        upvotes
      }

    default:
      return state
  }
}
