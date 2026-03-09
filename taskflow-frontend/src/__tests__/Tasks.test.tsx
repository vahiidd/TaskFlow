import { render, screen, waitFor } from '@testing-library/react'
import Tasks from '../pages/Tasks'

vi.mock('../api/client', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [ { id:1, title:'A', status:0 } ] }),
    post: vi.fn(), put: vi.fn(), delete: vi.fn()
  }
}))

test('renders tasks from API', async () => {
  render(<Tasks />)
  await waitFor(() => expect(screen.getByText('A')).toBeInTheDocument())
})
