import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChangeLocationDialog from "@/components/ChangeLocationDialog";
import { useOrderStore } from "@/hooks";

jest.mock("@/hooks/useOrderStore");

describe("ChangeLocationDialog Component", () => {
  const mockOrder = {
    order_id: "1",
    address: "123 Main St",
    lat: 10,
    lng: 20,
  };
  const mockSetOrder = jest.fn();

  beforeEach(() => {
    (useOrderStore as unknown as jest.Mock).mockReturnValue({
      order: mockOrder,
      setOrder: mockSetOrder,
    });
  });

  it("renders the dialog trigger button", () => {
    render(
      <ChangeLocationDialog>
        <button>Open Dialog</button>
      </ChangeLocationDialog>
    );

    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("opens the dialog and displays the content", () => {
    render(
      <ChangeLocationDialog>
        <button>Open Dialog</button>
      </ChangeLocationDialog>
    );

    fireEvent.click(screen.getByText("Open Dialog"));
    expect(screen.getByText("Change location")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Use the search engine to find a new location for your order."
      )
    ).toBeInTheDocument();
  });
});
