
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const ContactPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Reach out to our team leader:{" "}
          <a href="mailto:leader@gameshop.com" className="text-[#ff385c] hover:underline">
            leader@gameshop.com
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default ContactPage;
