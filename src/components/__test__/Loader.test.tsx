import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "@/components/Loader";

jest.mock("lucide-react", () => ({
  LoaderCircle: (props: any) => <svg {...props}>LoaderCircle Icon</svg>,
}));

describe("Loader Component", () => {
  it("renders the Loader component", () => {
    render(<Loader />);
    expect(screen.getByText("LoaderCircle Icon")).toBeInTheDocument();
  });

  it("applies correct classes and size to LoaderCircle", () => {
    render(<Loader />);
    const loaderIcon = screen.getByText("LoaderCircle Icon");
    expect(loaderIcon).toHaveClass("loader");
    expect(loaderIcon).toHaveClass("text-primary");
    expect(loaderIcon).toHaveAttribute("size", "80");
  });

  it("centers the loader on the screen", () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId("loader-container");
    expect(loaderContainer).toHaveClass("flex");
    expect(loaderContainer).toHaveClass("justify-center");
    expect(loaderContainer).toHaveClass("items-center");
    expect(loaderContainer).toHaveClass("h-screen");
  });
});
