import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Logo } from "@/components";

describe("Logo Component", () => {
  it("renders the Logo component with the icon", () => {
    render(<Logo size="xl" />);
    const logoIcon = document.querySelector("svg");
    expect(logoIcon).toBeInTheDocument();
  });
  it("renders the Logo component with the title", () => {
    render(<Logo size="xl" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
