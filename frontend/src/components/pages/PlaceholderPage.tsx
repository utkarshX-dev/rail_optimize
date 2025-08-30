import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Construction, ArrowLeft } from "lucide-react";
import { useRouter } from "../Router";
import { motion } from "motion/react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  badgeText?: string;
}

export function PlaceholderPage({ title, description, badgeText = "Coming Soon" }: PlaceholderPageProps) {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Card className="shadow-lg">
          <CardContent className="p-12">
            <Badge variant="outline" className="mb-6">
              {badgeText}
            </Badge>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <Construction className="h-16 w-16 text-blue-600 mx-auto" />
            </motion.div>
            
            <h1 className="text-4xl mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate('home')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={() => navigate('contact')}>
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}