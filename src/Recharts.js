import React, { PureComponent } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

const votes = [
  {
    name: 'Articles',
    data: [
      { articleId: 'A', value: Math.random() },
      { articleId: 'B', value: Math.random() },
      { articleId: 'C', value: Math.random() },
      { articleId: 'D', value: Math.random() },
      { articleId: 'E', value: Math.random() },
      { articleId: 'F', value: Math.random() },
      { articleId: 'G', value: Math.random() },
      { articleId: 'H', value: Math.random() }
    ]
  }
]

export default class VotesChart extends PureComponent {
  render() {
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
