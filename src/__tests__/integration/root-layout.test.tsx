import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import RootLayout from "@/app/layout";

jest.mocked(usePathname).mockReturnValue("/");

describe("RootLayout Integration Tests", () => {
  const TestChild = () => <div data-testid="test-child">Test Content</div>;

  it("renders complete layout with header, main content, and footer", () => {
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("integrates header component with logo and navigation", () => {
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const logo = screen.getByRole("img", { name: "logo" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");

    const homeLink = screen.getByRole("link", { name: "Home" });
    const contactLink = screen.getByRole("link", { name: "Contact Us" });

    expect(homeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute("href", "/");
    expect(contactLink).toHaveAttribute("href", "/contact-us");
  });

  it("integrates footer component with all sections and links", () => {
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    const footerHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(footerHeadings).toHaveLength(3);
    expect(footerHeadings[0]).toHaveTextContent("About Us");
    expect(footerHeadings[1]).toHaveTextContent("Contact Info");
    expect(footerHeadings[2]).toHaveTextContent("Follow Us");

    expect(screen.getByText("Email: info@urbanmali.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: 077 1234567")).toBeInTheDocument();
    expect(screen.getByText("Address: 123 Garden Street")).toBeInTheDocument();

    const facebookLink = screen.getByRole("link", { name: "Facebook" });
    const instagramLink = screen.getByRole("link", { name: "Instagram" });
    const twitterLink = screen.getByRole("link", { name: "Twitter" });

    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();

    expect(
      screen.getByText("© 2025 Garden. All rights reserved.")
    ).toBeInTheDocument();
  });
});
