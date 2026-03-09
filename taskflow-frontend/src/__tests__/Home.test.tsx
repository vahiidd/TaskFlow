import { render, screen } from '@testing-library/react'
import Home from '../pages/Home'

global.localStorage.getItem = () => null;

test('renders landing page heading', () => {
  render(<Home />)
  expect(screen.getByRole('heading', { name: /willkommen bei taskflow/i })).toBeInTheDocument()
})
