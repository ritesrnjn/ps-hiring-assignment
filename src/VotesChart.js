import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

export default class VotesChart extends PureComponent {
  render() {
    const { votes } = this.props

    console.log(votes)
    return (
      <LineChart width={900} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="articleId"
          type="category"
          allowDuplicatedCategory={false}
        />
        <YAxis dataKey="value" />
        <Legend />
        {votes.map(v => (
          <Line dataKey="value" data={v.data} name={v.name} key={v.name} />
        ))}
      </LineChart>
    )
  }
}
