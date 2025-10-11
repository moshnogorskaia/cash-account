import { fireEvent, render, screen } from "@testing-library/react";
import { PortfolioName } from "../PortfolioName/portfolio-name";

import "@testing-library/jest-dom";

describe("PortfolioName", () => {
  it("should render portfolio name", () => {
    render(<PortfolioName />);

    expect(screen.getByText("Portfolio name")).toBeInTheDocument();
    expect(screen.getByText("Example Portfolio")).toBeInTheDocument();
  });

  it("should change the portfolio name successfully on blur", async () => {
    render(<PortfolioName />);

    const editButton = screen.getByRole('button');

    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: 'Test Portfolio' } });

    fireEvent.blur(input);

    expect(screen.getByText("Test Portfolio")).toBeInTheDocument();
  });

  it("should show input field when EditButton is clicked", () => {
    render(<PortfolioName />);

    const editButton = screen.getByRole('button');

    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Example Portfolio");
  });

  it("should focus the input when EditButton is clicked", () => {
    render(<PortfolioName />);

    const editButton = screen.getByRole('button');

    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");

    expect(input).toHaveFocus();
  });
});
