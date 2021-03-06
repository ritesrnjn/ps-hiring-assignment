import React, { useState } from 'react'
import { connect } from 'react-redux'
import TriangleIcon from './TriangleIcon'
import './news.css'

import {
  fetchArticles,
  hideArticle,
  upvoteArticle
} from '../redux/actions/article'

function News(props) {
  const { history, fetchArticles, hideArticle, upvoteArticle, hits } = props
  const params = new URLSearchParams(history.location.search)
  const pageNo = params.get('page') || 1

  const [page, setPage] = useState(pageNo)

  // on mount
  React.useEffect(() => {
    getArticles(page)
  }, [])

  const getArticles = page => fetchArticles(page)

  const prevClick = () => {
    let pageNo = parseInt(page)
    if (pageNo > 1) {
      pageNo -= 1
      setPage(pageNo)
      getArticles(pageNo)
      const url = `/?page=${pageNo}`
      history.push(url)
    }
  }
  const nextClick = () => {
    let pageNo = parseInt(page)
    pageNo += 1
    setPage(pageNo)
    getArticles(pageNo)
    const url = `/?page=${pageNo}`
    history.push(url)
  }

  const handleUpvote = articleId => () => upvoteArticle(articleId)
  const handleHideClick = articleId => () => hideArticle(articleId)

  return (
    <div>
      <table className="table table-striped">
        <thead style={{background: 'orange'}}>
          <tr>
            <th scope="col">Comments</th>
            <th scope="col">Vote Count</th>
            <th scope="col">UpVote</th>
            <th scope="col">News Details</th>
          </tr>
        </thead>
        <tbody>
          {hits.map(r => (
            <tr key={r.objectID}>
              <td>{r.num_comments}</td>
              <td>{r.points}</td>
              <td>
                <TriangleIcon
                    height={15}
                    width={15}
                  onClick={handleUpvote(r.objectID)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td>
                {r.title}
                <span
                  onClick={handleHideClick(r.objectID)}
                  style={{ cursor: 'pointer' }}
                >
                  [Hide]
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginateRoot">
        <span className="navItem" onClick={prevClick}>
          Previous
        </span>
        &nbsp;| &nbsp;
        <span className="navItem" onClick={nextClick}>
          Next
        </span>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  hits: state.article.hits,
  hidden: state.article.hidden
})

export default connect(mapStateToProps, {
  fetchArticles,
  hideArticle,
  upvoteArticle
})(News)
