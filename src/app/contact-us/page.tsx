import TextCard from "@/components/TextCard";

export const metadata = {
  title: "Contact Us",
  description: "Contact Us page"
};

const Page = () => {
  return (
    <div className="space-y-4">
      <h1>Contact Us</h1>

      <p>
        We are here to help you. Please contact us for any questions or
        inquiries.
      </p>

      <div className="flex gap-4 flex-wrap">
        <TextCard title="Address">
          <p>
            123 Garden Street
            <br />
            Green Valley, Stockholm, Sweden
          </p>
        </TextCard>
        <TextCard title="Email">
          <p>
            +46 70 123 45 67
            <br />
            Mon-Fri: 9:00 AM - 6:00 PM
          </p>
        </TextCard>
        <TextCard title="Phone">
          <p>
            +46 70 123 45 67
            <br />
            Mon-Fri: 9:00 AM - 6:00 PM
          </p>
        </TextCard>
      </div>
    </div>
  );
};

export default Page;
