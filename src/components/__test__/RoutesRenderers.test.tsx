import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoutesRenderers from "@/components/RoutesRenderers";
import { DirectionsRendererProps } from "@react-google-maps/api";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

const setMapMock = jest.fn();

jest.mock("@react-google-maps/api", () => ({
  DirectionsRenderer: jest.fn(({ onLoad }) => {
    React.useEffect(() => {
      if (onLoad)
        onLoad({
          setMap: setMapMock,
        } as unknown as google.maps.DirectionsRenderer);
    }, [onLoad]);
    return <div data-testid="directions-renderer">DirectionsRenderer</div>;
  }),
}));

describe("RoutesRenderers Component", () => {
  const rendererProps: DirectionsRendererProps[] = [
    { directions: {} as google.maps.DirectionsResult },
    { directions: {} as google.maps.DirectionsResult },
  ];

  it("renders DirectionsRenderer components", () => {
    render(<RoutesRenderers rendererProps={rendererProps} />);
    expect(screen.getAllByTestId("directions-renderer")).toHaveLength(2);
  });

  it("calls onLoad with correct parameters", () => {
    const { getAllByTestId } = render(
      <RoutesRenderers rendererProps={rendererProps} />
    );
    expect(getAllByTestId("directions-renderer")).toHaveLength(2);
  });

  it("removes DirectionsRenderer from map on unmount", () => {
    const { unmount } = render(
      <RoutesRenderers rendererProps={rendererProps} />
    );
    unmount();
    expect(setMapMock).toHaveBeenCalledWith(null);
  });
});
