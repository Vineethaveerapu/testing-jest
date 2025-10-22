import { render, screen } from "@testing-library/react";
import ContactUsPage from "@/app/contact-us/page";

describe("Contact Us Page Integration Tests", () => {
  it("renders complete contact page with all sections and information", () => {
    render(<ContactUsPage />);

    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("Contact Us");

    const description = screen.getByText(/We are here to help you/);
    expect(description).toBeInTheDocument();

    const cardHeadings = screen.getAllByRole("heading", { level: 4 });
    expect(cardHeadings).toHaveLength(3);
    expect(cardHeadings[0]).toHaveTextContent("Address");
    expect(cardHeadings[1]).toHaveTextContent("Email");
    expect(cardHeadings[2]).toHaveTextContent("Phone");

    expect(screen.getByText(/123 Garden Street/)).toBeInTheDocument();
    expect(
      screen.getByText(/Green Valley, Stockholm, Sweden/)
    ).toBeInTheDocument();

    const phoneNumbers = screen.getAllByText(/\+46 70 123 45 67/);
    expect(phoneNumbers).toHaveLength(2); // Phone and Email sections
    const businessHours = screen.getAllByText(/Mon-Fri: 9:00 AM - 6:00 PM/);
    expect(businessHours).toHaveLength(2);
  });

  it("organizes contact information correctly in TextCard components", () => {
    render(<ContactUsPage />);

    const addressHeading = screen.getByRole("heading", { name: "Address" });
    const addressCard = addressHeading.closest("div");
    expect(addressCard).toBeInTheDocument();
    expect(addressCard).toHaveTextContent("123 Garden Street");
    expect(addressCard).toHaveTextContent("Green Valley, Stockholm, Sweden");

    const emailHeading = screen.getByRole("heading", { name: "Email" });
    const emailCard = emailHeading.closest("div");
    expect(emailCard).toBeInTheDocument();
    expect(emailCard).toHaveTextContent("+46 70 123 45 67");
    expect(emailCard).toHaveTextContent("Mon-Fri: 9:00 AM - 6:00 PM");

    const phoneHeading = screen.getByRole("heading", { name: "Phone" });
    const phoneCard = phoneHeading.closest("div");
    expect(phoneCard).toBeInTheDocument();
    expect(phoneCard).toHaveTextContent("+46 70 123 45 67");
    expect(phoneCard).toHaveTextContent("Mon-Fri: 9:00 AM - 6:00 PM");

    expect(addressCard).toBeInTheDocument();
    expect(emailCard).toBeInTheDocument();
    expect(phoneCard).toBeInTheDocument();
  });

  it("provides proper page structure and accessibility features", () => {
    render(<ContactUsPage />);

    const h1Heading = screen.getByRole("heading", { level: 1 });
    expect(h1Heading).toHaveTextContent("Contact Us");

    const h4Headings = screen.getAllByRole("heading", { level: 4 });
    expect(h4Headings).toHaveLength(3);

    const addressInfo = screen.getByText(/123 Garden Street/);
    const phoneNumbers = screen.getAllByText(/\+46 70 123 45 67/);
    const businessHours = screen.getAllByText(/Mon-Fri: 9:00 AM - 6:00 PM/);

    expect(addressInfo).toBeInTheDocument();
    expect(phoneNumbers).toHaveLength(2);
    expect(businessHours).toHaveLength(2);

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText(/We are here to help you/)).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
  });
});
