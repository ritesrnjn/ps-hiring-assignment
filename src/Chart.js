import React from 'react'
import { connect } from 'react-redux'
import VotesChart from './VotesChart'

function Chart(props) {
  const { hits } = props

  const votes2 = [
    {
      name: 'Articles',
      data: hits.map(h => {
        return {
          articleId: h.objectID,
          value: h.points
        }
      })
    }
  ]

  return <VotesChart votes={votes2} />
}

const mapStateToProps = state => ({
  hits: state.article.hits
})

export default connect(mapStateToProps, {})(Chart)
