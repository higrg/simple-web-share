
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const AboutPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Us</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          GameShop is your premier destination for video games, offering a curated selection of action, adventure, RPG, and strategy titles.
        </p>
        
        <h3 className="text-xl font-bold mb-3">Our Team</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Gannat Ahmed Mohamed 30713</li>
          <li>Mohamed Ahmed Nabawy⁩ 30756</li>
          <li>Mohamed Rasmy Goda 30742</li>
          <li>Injy Hany Mohamed 30763</li>
          <li>Basmalh Ahmed Mahmoud 30373</li>
          <li>Mahmoud Taher Alzaki 64247</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AboutPage;
