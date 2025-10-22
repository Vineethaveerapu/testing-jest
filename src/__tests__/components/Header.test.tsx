import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn()
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("Header Component", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders the header element", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders logo image", () => {
    render(<Header />);
    const logo = screen.getByRole("img", { name: "logo" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");
  });

  it("renders all navigation links", () => {
    render(<Header />);
    const navLinks = screen.getAllByRole("link");
    expect(navLinks).toHaveLength(2);
    expect(navLinks[0]).toHaveTextContent("Home");
    expect(navLinks[1]).toHaveTextContent("Contact Us");
  });

  it("renders Home link with correct href", () => {
    render(<Header />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders Contact Us link with correct href", () => {
    render(<Header />);
    const contactLink = screen.getByRole("link", { name: "Contact Us" });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact-us");
  });
});
