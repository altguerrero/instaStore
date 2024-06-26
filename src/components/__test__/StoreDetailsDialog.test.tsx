import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoreDetailsDialog from "@/components/StoreDetailsDialog";
import { Store } from "@/types";

const mockStore: Store = {
  storeId: "1",
  storeName: "Mock Store",
  isOpen: true,
  coordinates: { lat: 0, lng: 0 },
};

describe("StoreDetailsDialog Component", () => {
  const mockOnGetRoute = jest.fn();

  it("renders the dialog trigger button", () => {
    render(
      <StoreDetailsDialog
        store={mockStore}
        direction={null}
        onGetRoute={mockOnGetRoute}
      >
        <button>Open Dialog</button>
      </StoreDetailsDialog>
    );

    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });
});
