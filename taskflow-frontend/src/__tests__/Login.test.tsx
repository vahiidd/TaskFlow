import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../pages/Login'

vi.mock('../api/client', () => ({
  default: { post: vi.fn().mockResolvedValue({ data: { token: 'TESTTOKEN' } }) }
}))

test('logs in and stores token', async () => {
  const user = userEvent.setup()
  render(<Login />)

  await user.type(screen.getByLabelText(/e-mail/i), 'test@test.com')
  await user.type(screen.getByLabelText(/passwort/i), 'Passw0rd!')
  await user.click(screen.getByRole('button', { name: /einloggen/i }))

  expect(localStorage.getItem('token')).toBe('TESTTOKEN')
})
