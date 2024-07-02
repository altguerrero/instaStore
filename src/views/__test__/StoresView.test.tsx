import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StoresView } from "@/views";

jest.mock("@/components", () => ({
  Header: jest.fn(() => <div data-testid="header"></div>),
  StoreList: jest.fn(() => <div data-testid="store"></div>),
}));

jest.mock("@/components/Map", () =>
  jest.fn(() => <div data-testid="map"></div>)
);

describe("StoresView Component", () => {
  it("renders the Header, Store, and Map components", () => {
    render(<StoresView />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("store")).toBeInTheDocument();
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });
});
