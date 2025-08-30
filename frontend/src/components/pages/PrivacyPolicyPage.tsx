import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Shield, Eye, Database, Lock, Users, FileText } from "lucide-react";
import { useRouter } from "../Router";
import { motion } from "motion/react";

export function PrivacyPolicyPage() {
  const { navigate } = useRouter();

  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Account information including name, email, and organization details",
        "System usage data and interaction patterns for optimization",
        "Railway operational data when using our services",
        "Technical information including IP addresses and device details",
        "Communication records for support and service purposes"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide and improve our railway optimization services",
        "Authenticate users and maintain account security",
        "Generate insights and analytics for system performance",
        "Communicate updates, security alerts, and support information",
        "Comply with legal requirements and safety regulations"
      ]
    },
    {
      title: "Data Protection Measures",
      icon: Lock,
      content: [
        "End-to-end encryption for all data transmission",
        "Regular security audits and penetration testing",
        "Access controls and role-based permissions",
        "Secure data centers with 24/7 monitoring",
        "Regular backups with encrypted storage"
      ]
    },
    {
      title: "Your Rights",
      icon: Users,
      content: [
        "Access and review your personal information",
        "Request correction of inaccurate data",
        "Delete your account and associated data",
        "Export your data in a portable format",
        "Opt-out of non-essential communications"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-background dark:via-background dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-6 bg-white dark:bg-background">
              Legal Document
            </Badge>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl sm:text-5xl">Privacy Policy</h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your privacy is our priority. This policy explains how we collect, use, 
              and protect your information when you use RailOptimize services.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              Last updated: August 30, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-8">
                  <h2 className="text-2xl mb-4 text-blue-800 dark:text-blue-200">Introduction</h2>
                  <p className="text-blue-700 dark:text-blue-300 leading-relaxed mb-4">
                    RailOptimize ("we," "our," or "us") is committed to protecting your privacy and 
                    ensuring the security of your personal information. This Privacy Policy applies 
                    to our intelligent railway traffic management platform and related services.
                  </p>
                  <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                    By using our services, you consent to the collection and use of information 
                    as described in this policy. We will not sell, rent, or trade your personal 
                    information to third parties.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Sections */}
            <div className="space-y-8 mb-12">
              {sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <span>{section.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-3">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Data Retention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <span>Data Retention</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We retain your personal information only as long as necessary to provide our services 
                    and comply with legal obligations. Operational data is retained for system optimization 
                    and safety compliance as required by railway regulations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When you delete your account, we will remove your personal information within 30 days, 
                    except where retention is required by law or for safety and security purposes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Card className="bg-gray-50 dark:bg-gray-900">
                <CardContent className="p-8">
                  <h2 className="text-2xl mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions about this Privacy Policy or our data practices, 
                    please contact our Data Protection Officer:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <div>Email: privacy@railoptimize.com</div>
                    <div>Phone: +91 11 2345 6789</div>
                    <div>Address: New Delhi, India</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="outline" onClick={() => navigate('terms-of-service')}>
                Terms of Service
              </Button>
              <Button variant="outline" onClick={() => navigate('cookie-policy')}>
                Cookie Policy
              </Button>
              <Button onClick={() => navigate('home')}>
                Back to Home
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}