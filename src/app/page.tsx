import Link from 'next/link';
import {
  Activity,
  Users,
  MapPin,
  Heart,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Target,
  BarChart3,
  Globe,
  Award,
  Camera,
  Share2,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/app/assets/logo-full.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2e2e2e' }}>
      <section
        className="pt-10 pb-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#2e2e2e' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <Image src={logo} alt="Strava Stories" className="w-full h-auto" />
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Your Fitness
                  <br />
                  <span className="text-red-600">Your Journey</span>
                  <br />
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Strava Stories brings your training to life with social posts,
                  progress tracking, and community circles built for athletes of
                  every level. Log your workouts, share your journey, and
                  connect with people who move like you. Plus, optionally sync
                  your Strava account to automatically import your entire
                  training history.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className=" text-lg" asChild>
                  <Link href="/auth/sign-up">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className=" px-8 py-6 text-lg"
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>
            {/* <Image src={logo} alt="Strava Stories" className="w-full h-auto" /> */}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 "
        style={{ backgroundColor: '#2e2e2e' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything You Need to{' '}
              <span className="text-red-500">Share Your Journey</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="rounded-lg p-8 border border-gray-700 hover:border-red-500 transition"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Sync & Track Your Fitness
              </h3>
              <p className="text-red-500 font-bold mb-4">
                Your workouts, beautifully organized.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Sync activities instantly
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Progress visualization
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Activity logs & charts
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Sync activity using Strava
                </li>
              </ul>
            </div>

            <div
              className="rounded-lg p-8 border border-gray-700 hover:border-red-500 transition"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Share Your Story
              </h3>
              <p className="text-red-500 font-bold mb-4">
                A social feed built for fitness
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Rich post creation
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Location & friend tagging
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Timeline feeds
                </li>
              </ul>
            </div>

            <div
              className="rounded-lg p-8 border border-gray-700 hover:border-red-500 transition"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Explore & Connect
              </h3>
              <p className="text-red-500 font-bold mb-4">
                Discover people, places, and stories that move you.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Location-based discovery
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Trending content
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Friend networking
                </li>
              </ul>
            </div>

            <div
              className="rounded-lg p-8 border border-gray-700 hover:border-red-500 transition"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Your Communities
              </h3>
              <p className="text-red-500 font-bold  mb-4">
                Groups built for training, accountability, and adventure.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Sport & location groups
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Group challenges
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Event planning
                </li>
              </ul>
            </div>

            <div
              className="rounded-lg p-8 border border-gray-700 hover:border-red-500 transition"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Personal Fitness Hub
              </h3>
              <p className="text-red-500 font-bold  mb-4">
                A profile that grows with your journey.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Customizable profile
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Activity statistics
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Achievement tracking
                </li>
              </ul>
            </div>

            <div
              className="rounded-lg p-8 border border-gray-700 hover:border-red-500 transition"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Smart Posting Tools
              </h3>
              <p className="text-red-500 font-bold mb-4">
                Share moments effortlessly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Quick post input
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Media attachments
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Tag cities & friends
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-24 px-4 sm:px-6 lg:px-8 "
        style={{ backgroundColor: '#2e2e2e' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How It <span className="text-red-500">Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and begin sharing your fitness journey with
              a community that understands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: 1,
                title: 'Build Your Profile',
                desc: 'Create your account, upload an avatar, set your display name, and customize your bio.',
              },
              {
                num: 2,
                title: 'Add Your Workouts',
                desc: 'Log workouts manually, or optionally sync your Strava account to import your training history.',
              },
              {
                num: 3,
                title: 'Share Your Journey',
                desc: 'Post workouts, tag cities, add photos, and express how each training session made you feel.',
              },
              {
                num: 4,
                title: 'Join Circles & Explore',
                desc: 'Find athletes near you, join training groups, participate in challenges, and build your fitness network.',
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section
        id="community"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#2e2e2e' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Join a <span className="text-red-500">Growing Community</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Athletes from around the world are sharing their stories,
              connecting with like-minded people, and achieving their goals
              together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: 'Sarah Johnson',
                location: 'Marathon Runner, Boston',
                text: "Strava Stories transformed how I connect with fellow runners. The circles feature helped me find training partners in my city and we've completed three marathons together!",
              },
              {
                name: 'Mike Chen',
                location: 'Cyclist, San Francisco',
                text: 'Finally, a social platform that gets athletes! The progress tracking combined with community features keeps me motivated and connected to my cycling group.',
              },
              {
                name: 'Anna Rodriguez',
                location: 'Trail Runner, Colorado',
                text: 'The circle challenges pushed me to new heights. Being able to share my climbing adventures with a supportive community made all the difference in my training.',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-lg p-6 border border-gray-700"
                style={{ backgroundColor: '#3a3a3a' }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-xs">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '10K+', label: 'Active Athletes' },
              { stat: '500+', label: 'Fitness Circles' },
              { stat: '50K+', label: 'Stories Shared' },
              { stat: '25', label: 'Cities Active' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-3xl lg:text-4xl font-bold text-red-500 mb-2">
                  {item.stat}
                </div>
                <div className="text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section
        className="py-24 px-4 sm:px-6 lg:px-8 "
        style={{ backgroundColor: '#2e2e2e' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why <span className="text-red-500">Strava Stories</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              More than a social feed, a place where athletes grow, connect, and
              achieve together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Built for Athletes, Not Influencers
              </h3>
              {[
                {
                  icon: Target,
                  title: 'Real Training Focus',
                  desc: 'Share your actual workouts, progress, and training experiences, not just curated content.',
                },
                {
                  icon: Users,
                  title: 'Meaningful Connections',
                  desc: 'Connect with people who share your pace, goals, and training philosophy.',
                },
                {
                  icon: Award,
                  title: 'Accountability & Motivation',
                  desc: 'Join challenges, share progress, and stay motivated with a supportive community.',
                },
                {
                  icon: TrendingUp,
                  title: 'Data-Driven Growth',
                  desc: 'Track your progress with detailed analytics and celebrate milestones together.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <item.icon className="w-6 h-6 text-red-500 mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Value Prop Visual */}
            <div
              className="rounded-lg p-8 border border-gray-700"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="space-y-4">
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: '#2e2e2e' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Monthly Distance</span>
                    <span className="text-red-500 font-semibold">127.5 km</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    85% of monthly goal
                  </p>
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: '#2e2e2e' }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="text-white font-medium">
                      Golden Gate Park Run
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Beautiful morning run with the SF running circle. The fog
                    was perfect!
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">5.2 km • 28:15</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-gray-400">12</span>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: '#2e2e2e' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">
                        Marathon Training Circle
                      </h4>
                      <p className="text-gray-400 text-xs">
                        18 members • Next event: Long run Sunday
                      </p>
                    </div>
                    <div className="text-red-500 text-xs font-semibold">
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Preview */}
      {/* <section
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-700"
        style={{ backgroundColor: '#2e2e2e' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Works Perfectly on{' '}
              <span className="text-red-500">Every Device</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access your fitness community wherever you are — at home, at the
              gym, or on the trail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mobile App',
                icon: Smartphone,
                desc: 'Log workouts on the go and stay connected with your community.',
              },
              {
                title: 'Desktop Web',
                icon: null,
                desc: 'Full-featured experience for detailed tracking and management.',
              },
              {
                title: 'Tablet',
                icon: null,
                desc: 'Perfect balance of convenience and desktop power.',
              },
            ].map((device, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="rounded-lg p-6 border border-gray-700 mb-6"
                  style={{ backgroundColor: '#3a3a3a' }}
                >
                  {device.icon ? (
                    <device.icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  ) : (
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">💻</span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {device.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{device.desc}</p>
                </div>
                <div
                  className="rounded-lg p-4 border border-gray-700"
                  style={{ backgroundColor: '#3a3a3a' }}
                >
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-4/5"></div>
                    <div className="h-16 bg-gray-700 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Integrations */}
      {/* <section
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-700"
        style={{ backgroundColor: '#2e2e2e' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Seamless <span className="text-red-500">Strava Integration</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Connect your account in seconds and bring your entire training
              history with you.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div
              className="rounded-lg p-8 border border-gray-700 max-w-md"
              style={{ backgroundColor: '#3a3a3a' }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Strava</h3>
                <p className="text-gray-400">Official Partner</p>
              </div>
              <div className="space-y-3">
                {[
                  { feature: 'Activities', status: 'Synced' },
                  { feature: 'Routes', status: 'Available' },
                  { feature: 'Achievements', status: 'Imported' },
                  { feature: 'Privacy', status: 'Controlled' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-300">{item.feature}</span>
                    <span className="text-red-500">✓ {item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Your data stays secure and you control what gets shared. Connect
              once, sync forever.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
              Connect Strava Account
            </Button>
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-700 bg-linear-to-r from-red-700 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Story?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join a community built for movement. Create your account and begin
            sharing your fitness journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          {/* <p className="text-red-200 mt-6 text-sm">
            No credit card required • Free forever plan available
          </p> */}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-4 sm:px-6 lg:px-8 "
        style={{ backgroundColor: '#202020' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Strava Stories
                </h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting athletes worldwide through shared training
                experiences, community challenges, and fitness storytelling.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Integrations', 'API'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-red-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-red-400">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 Strava Stories. Your fitness, your story, shared with the
              world.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-400 hover:text-red-400 text-sm"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-red-400 text-sm"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-red-400 text-sm"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
