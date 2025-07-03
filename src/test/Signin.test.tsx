import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignIn from "@/pages/SignIn";

describe('SignIn component testing', () => {
  const handleClose = vi.fn();
  const handleOpen = vi.fn();

  test('renders signin page text', () => {
    render(
      <MemoryRouter>
        <SignIn handleClose={handleClose} handleOpen={handleOpen} />
      </MemoryRouter>
    );

    expect(screen.getByText(/WanderStay/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
  });
});
