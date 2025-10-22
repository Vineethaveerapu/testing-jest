import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  it("renders the footer element", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    render(<Footer />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(3);
    expect(headings[0]).toHaveTextContent("About Us");
    expect(headings[1]).toHaveTextContent("Contact Info");
    expect(headings[2]).toHaveTextContent("Follow Us");
  });

  it("renders About Us section with description", () => {
    render(<Footer />);
    const aboutUsHeading = screen.getByRole("heading", { name: "About Us" });
    expect(aboutUsHeading).toBeInTheDocument();

    const description = screen.getByText(
      "We are dedicated to providing the best gardening solutions"
    );
    expect(description).toBeInTheDocument();
  });

  it("renders all contact information items", () => {
    render(<Footer />);
    const contactItems = screen.getAllByRole("listitem");
    expect(contactItems).toHaveLength(3);
    expect(contactItems[0]).toHaveTextContent("Email: info@urbanmali.com");
    expect(contactItems[1]).toHaveTextContent("Phone: 077 1234567");
    expect(contactItems[2]).toHaveTextContent("Address: 123 Garden Street");
  });

  it("renders Contact Info heading", () => {
    render(<Footer />);
    const contactHeading = screen.getByRole("heading", {
      name: "Contact Info"
    });
    expect(contactHeading).toBeInTheDocument();
  });

  it("renders Follow Us heading", () => {
    render(<Footer />);
    const followUsHeading = screen.getByRole("heading", { name: "Follow Us" });
    expect(followUsHeading).toBeInTheDocument();
  });

  it("renders all social media links", () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole("link");
    expect(socialLinks).toHaveLength(3);
    expect(socialLinks[0]).toHaveTextContent("Facebook");
    expect(socialLinks[1]).toHaveTextContent("Instagram");
    expect(socialLinks[2]).toHaveTextContent("Twitter");
  });

  it("renders Facebook link with correct href", () => {
    render(<Footer />);
    const facebookLink = screen.getByRole("link", { name: "Facebook" });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute("href", "/facebook");
  });

  it("renders Instagram link with correct href", () => {
    render(<Footer />);
    const instagramLink = screen.getByRole("link", { name: "Instagram" });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute("href", "/instagram");
  });

  it("renders Twitter link with correct href", () => {
    render(<Footer />);
    const twitterLink = screen.getByRole("link", { name: "Twitter" });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute("href", "/twitter");
  });

  it("renders copyright notice", () => {
    render(<Footer />);
    const copyright = screen.getByText("© 2025 Garden. All rights reserved.");
    expect(copyright).toBeInTheDocument();
  });
});
