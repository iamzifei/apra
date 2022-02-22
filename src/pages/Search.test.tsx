import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "./Search";

test("renders search page container", () => {
  render(<Search />);
  const linkElement = screen.getByText(/search/i);
  expect(linkElement).toBeInTheDocument();
});
