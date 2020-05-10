import React from 'react'
import { render } from '@testing-library/react'
import Chart from './Chart/VotesChart'
import {setItem, getItem} from './storageUtil'

const votes = [
  {
    name: 'Articles',
    data: []
  }
]

test('Chart renders!', async () => {
  const { container } = render(<Chart votes={votes}/>)
  expect(container.firstChild).toHaveClass('recharts-wrapper')
})

test('Persistence storage works!', async () =>{
  setItem('name', 'Ritesh')
  expect(getItem('name')).toBe('Ritesh');
})
