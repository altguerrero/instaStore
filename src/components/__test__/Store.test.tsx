import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Store } from "@/components";
import { useStoreDirections } from "@/hooks";

jest.mock("@/hooks", () => ({
  useStoreDirections: jest.fn(),
}));

const mockUseStoreDirections = useStoreDirections as jest.MockedFunction<
  typeof useStoreDirections
>;

describe("Store Component", () => {
  const mockFilteredStores = [
    {
      storeId: "1",
      storeName: "Mock Store 1",
      isOpen: true,
      coordinates: { lat: 0, lng: 0 },
    },
    {
      storeId: "2",
      storeName: "Mock Store 2",
      isOpen: false,
      coordinates: { lat: 0, lng: 0 },
    },
  ];

  const mockGetStoreDirections = jest.fn().mockReturnValue({
    routes: [
      {
        legs: [
          {
            duration: { text: "10 mins", value: 600 },
            distance: { text: "1 km", value: 1000 },
            end_address: "1234 Store Street, Store City, Store Country",
          },
        ],
      },
    ],
  });

  const mockHandleToggleCollapse = jest.fn();

  beforeEach(() => {
    return mockUseStoreDirections.mockReturnValue({
      filteredStores: mockFilteredStores,
      loading: null,
      openStoreId: null,
      handleToggleCollapse: mockHandleToggleCollapse,
      getStoreDirections: mockGetStoreDirections,
      fetchAndSetDirections: () => Promise.resolve(),
    });
  });

  it("renders store names and statuses", () => {
    render(<Store />);
    expect(screen.getByText("Mock Store 1")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Mock Store 2")).toBeInTheDocument();
    expect(screen.getByText("Closed")).toBeInTheDocument();
  });

  it("toggles the collapsible content when the store details are clicked", () => {
    render(<Store />);
    fireEvent.click(screen.getAllByText("Store details")[0]);
    expect(mockHandleToggleCollapse).toHaveBeenCalledWith(
      mockFilteredStores[0]
    );
  });

  it("displays store details correctly when expanded", () => {
    mockUseStoreDirections.mockReturnValue({
      filteredStores: mockFilteredStores,
      loading: null,
      openStoreId: "1",
      handleToggleCollapse: mockHandleToggleCollapse,
      getStoreDirections: mockGetStoreDirections,
      fetchAndSetDirections: () => Promise.resolve(),
    });

    render(<Store />);

    expect(screen.getByText("Delivery Time:")).toBeInTheDocument();
    expect(screen.getByText("10 mins")).toBeInTheDocument();
    expect(screen.getByText("Distance:")).toBeInTheDocument();
    expect(screen.getByText("1 km")).toBeInTheDocument();
    expect(screen.getByText("Store Address:")).toBeInTheDocument();
    expect(
      screen.getByText("1234 Store Street, Store City, Store Country")
    ).toBeInTheDocument();
  });
});
