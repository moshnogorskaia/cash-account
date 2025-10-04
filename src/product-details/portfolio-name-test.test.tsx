import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PortfolioName } from "./portfolio-name";

import "@testing-library/jest-dom";

describe("PortfolioName", () => {
  it("should render portfolio name", () => {
    render(<PortfolioName />);

    expect(screen.getByText("Portfolio name")).toBeInTheDocument();
    expect(screen.getByText("Example Portfolio")).toBeInTheDocument();
  });

  it("should change the portfolio name successfully on press enter", async () => {
    render(<PortfolioName />);

    const editButton = screen.getByRole('button');

    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: 'Test Portfolio' } });

    // Try keyDown event with multiple properties for better compatibility
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      charCode: 13
    });

    await waitFor(() => {
      expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
    });
  });
});
