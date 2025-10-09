import { Pencil } from "./Pencil";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Pencil", () => {
    it("should render correctly", () => {
        const { asFragment } = render(<Pencil />);
        expect(asFragment()).toMatchSnapshot();
    });
});