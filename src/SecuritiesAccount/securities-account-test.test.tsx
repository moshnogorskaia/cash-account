import { render, screen } from "@testing-library/react";
import { SecuritiesAccount } from "../SecuritiesAccount/securities-account";

import "@testing-library/jest-dom";

describe("SecuritiesAccount", () => {
  it("should display account number and BIC", async () => {
    render(<SecuritiesAccount />);

    expect(screen.getByText("Savings account")).toBeVisible();
    expect(screen.getByText("Account number")).toBeVisible();
    expect(screen.getByText("0123456789")).toBeVisible();
    expect(screen.getByText("BIC")).toBeVisible();
    expect(screen.getByText("ACABDEMMXXX")).toBeVisible();
  });
});
