import {
  FETCH_ARTICLES_SUCCESS,
  HIDE_ARTICLE,
  UPVOTE_ARTICLE
} from '../actions/article'

function initializeState(){

  let hidden = localStorage.getItem('hidden')

  console.log(hidden)
  if(hidden){
    hidden = hidden.split(',')
    hidden = new Set([...hidden])
  }
  let upvotes = localStorage.getItem('upvotes')
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
      hits = hits.map(h=>{
        if(state.upvotes[h.objectID]){
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
      localStorage.setItem('hidden', [...state.hidden])

      return {
        ...state,
        hits: state.hits.filter(o => o.objectID !== action.articleId),
        hidden: state.hidden
      }

    case UPVOTE_ARTICLE:
      let points = state.hits.find(o=> o.objectID===action.articleId).points
      let hitsArt = state.hits.map(o=>{
          if(o.objectID===action.articleId){
            o.points = points+1
          }
          return o
        })
        const upvotes = {
          ...state.upvotes,
          [action.articleId]: points + 1,
        }

        localStorage.setItem('upvotes', JSON.stringify(upvotes))
      return {
        ...state,
        hits: hitsArt,
        upvotes
      }

    default:
      return state
  }
}
