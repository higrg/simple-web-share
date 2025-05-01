
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const ContactPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Reach out to our team:{" "}
          <a href="mailto:gannatgamal995@gmail.com" className="text-[#ff385c] hover:underline">
            gannatgamal995@gmail.com
          </a>
        </p>
        <p className="mt-2">
          Phone: <span className="font-medium">+20 101 575 0584</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default ContactPage;
