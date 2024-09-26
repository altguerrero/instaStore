import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header";
import { useOrderStore } from "@/hooks";

jest.mock("@/hooks");

jest.mock("lucide-react", () => ({
  EllipsisVertical: () => <span>EllipsisVertical Icon</span>,
  ListFilter: () => <span>ListFilter Icon</span>,
  MapPinned: () => <span>MapPinned Icon</span>,
}));

jest.mock("@/components/Logo", () => () => <div>Logo Component</div>);
jest.mock("@/components/FilterStoresDialog", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock("@/components/ChangeLocationDialog", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Header Component", () => {
  const mockOrder = {
    order_id: "12345",
  };

  beforeEach(() => {
    (useOrderStore as unknown as jest.Mock).mockReturnValue({
      order: mockOrder,
    });
  });

  it("renders the Logo component", () => {
    render(<Header />);
    expect(screen.getByText("Logo Component")).toBeInTheDocument();
  });

  it("renders OrderInfo with the correct order ID", () => {
    render(<Header />);
    expect(screen.getAllByText("#Order ID:")).toHaveLength(2);
    expect(screen.getAllByText(mockOrder.order_id)).toHaveLength(2);
  });

  it("renders DialogButtons", () => {
    render(<Header />);
    // Verificar el botón de filtros y ubicación en la vista desktop
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();

    // Hacer clic en el icono del popover para mostrar la vista mobile
    fireEvent.click(screen.getByText("EllipsisVertical Icon"));

    // Verificar el botón de filtros y ubicación en la vista mobile
    expect(screen.getAllByText("Filters")).toHaveLength(2);
    expect(screen.getAllByText("Location")).toHaveLength(2);
  });

  it("renders the mobile version correctly", () => {
    render(<Header />);
    fireEvent.click(screen.getByText("EllipsisVertical Icon"));
    expect(screen.getAllByText("Filters")).toHaveLength(2);
    expect(screen.getAllByText("Location")).toHaveLength(2);
  });
});
