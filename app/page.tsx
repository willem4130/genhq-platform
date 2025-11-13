import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Briefcase,
  Users,
  Star,
  ArrowRight,
  Palette,
  Zap,
  Shield
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              GenHQ
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-purple-600 transition">
              Features
            </Link>
            <Link href="#for-designers" className="text-gray-600 hover:text-purple-600 transition">
              For Designers
            </Link>
            <Link href="#for-clients" className="text-gray-600 hover:text-purple-600 transition">
              For Clients
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Login</Button>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 mr-2 inline" />
            Where AI Creators Meet Opportunity
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Showcase Your{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 bg-clip-text text-transparent">
              AI Creative Work
            </span>
            {" "}& Get Hired
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The ultimate platform for creative AI designers to build portfolios,
            engage with the community, and connect with clients for freelance opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:opacity-90 text-lg px-8 py-6">
              Join as Designer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Hire Creators
              <Briefcase className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>500+ Designers</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-cyan-600" />
              <span>1,000+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>4.9 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge className="bg-cyan-100 text-cyan-700 mb-4">
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Built specifically for the AI creative economy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-purple-100 hover:shadow-lg transition hover:-translate-y-1">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Portfolio Builder</h3>
              <p className="text-gray-600">
                Showcase your Midjourney, DALL-E, and AI-generated work with a stunning portfolio that stands out.
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyan-100 hover:shadow-lg transition hover:-translate-y-1">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold">Job Marketplace</h3>
              <p className="text-gray-600">
                Connect with clients looking for AI creative talent. Browse jobs, submit proposals, and get hired.
              </p>
            </CardContent>
          </Card>

          <Card className="border-pink-100 hover:shadow-lg transition hover:-translate-y-1">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-pink-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold">Social Feed</h3>
              <p className="text-gray-600">
                Engage with the community. Post your work, get feedback, and build your reputation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-100 hover:shadow-lg transition hover:-translate-y-1">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">Smart Matching</h3>
              <p className="text-gray-600">
                Our algorithm matches designers with jobs based on skills, ratings, and availability.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition hover:-translate-y-1">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Reviews & Ratings</h3>
              <p className="text-gray-600">
                Build trust with transparent reviews and ratings from real clients and collaborators.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-lg transition hover:-translate-y-1">
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Safe & Secure</h3>
              <p className="text-gray-600">
                Enterprise-grade security with verified profiles and secure messaging.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-600 to-cyan-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of AI creators building their careers on GenHQ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  GenHQ
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                The creative AI designer marketplace for the Skool community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-purple-600 transition">Browse Designers</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Find Jobs</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-purple-600 transition">Documentation</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Help Center</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-purple-600 transition">About</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Contact</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>Built with ❤️ for the GenHQ Skool community by Rourke Heath</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
