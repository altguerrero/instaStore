import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { OrderFormView } from "@/views";

jest.mock("@/components", () => ({
  Logo: jest.fn(() => <div data-testid="logo"></div>),
  OrderForm: jest.fn(() => <div data-testid="order-form"></div>),
}));

describe("OrderFormView Component", () => {
  it("renders the Logo and OrderForm components", () => {
    render(<OrderFormView />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("order-form")).toBeInTheDocument();
  });
});
