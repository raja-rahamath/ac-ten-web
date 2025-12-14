'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '../../components/theme-toggle';

// Psychology-based: Animated counter hook (Goal-Gradient Effect - people engage more with moving numbers)
function useAnimatedCounter(target: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [hasStarted, target, duration, delay]);

  return { count, ref };
}

// COMMENTED OUT FOR FUTURE USE - Psychology-based: Live activity notifications (Social Proof - Cialdini)
// const LIVE_ACTIVITIES = [
//   { name: 'Mohammed K.', location: 'Dubai', action: 'just signed up', time: '2 min ago' },
//   { name: 'Sarah A.', location: 'Abu Dhabi', action: 'started free trial', time: '5 min ago' },
//   { name: 'Gulf FM Co.', location: 'Riyadh', action: 'upgraded to Pro', time: '8 min ago' },
//   { name: 'Ahmed R.', location: 'Doha', action: 'completed setup', time: '12 min ago' },
//   { name: 'Emirates Services', location: 'Dubai', action: 'invited team', time: '15 min ago' },
// ];

export default function HomePage() {
  const t = useTranslations('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  // COMMENTED OUT FOR FUTURE USE - Live activity state
  // const [showActivity, setShowActivity] = useState(false);
  // const [currentActivity, setCurrentActivity] = useState(0);

  // Scroll progress indicator (Goal-Gradient Effect)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // COMMENTED OUT FOR FUTURE USE - Live activity notifications (Social Proof)
  // useEffect(() => {
  //   const showNotification = () => {
  //     setShowActivity(true);
  //     setTimeout(() => setShowActivity(false), 4000);
  //   };
  //
  //   // Show first notification after 5 seconds
  //   const initialTimeout = setTimeout(showNotification, 5000);
  //
  //   // Rotate through activities
  //   const interval = setInterval(() => {
  //     setCurrentActivity((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
  //     showNotification();
  //   }, 15000);
  //
  //   return () => {
  //     clearTimeout(initialTimeout);
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Scroll Progress Bar - Goal Gradient Effect (Kivetz & Urminsky) */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* COMMENTED OUT FOR FUTURE USE - Live Activity Notification - Social Proof (Cialdini) */}
      {/* <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-out ${
          showActivity ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">
              {LIVE_ACTIVITIES[currentActivity].name} <span className="text-muted-foreground">from</span> {LIVE_ACTIVITIES[currentActivity].location}
            </p>
            <p className="text-xs text-muted-foreground">
              {LIVE_ACTIVITIES[currentActivity].action} • {LIVE_ACTIVITIES[currentActivity].time}
            </p>
          </div>
        </div>
      </div> */}

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] dark:bg-primary/10" />
        <div className="absolute -bottom-1/2 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px] dark:bg-purple-500/10" />
      </div>

      {/* COMMENTED OUT FOR FUTURE USE - Urgency Banner - FOMO Psychology (Cialdini's Scarcity Principle) */}
      {/* <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-2.5 text-center text-sm font-medium">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            <span className="font-semibold">Limited Offer:</span>
          </span>
          <span>Get 30% off your first 3 months</span>
          <span className="hidden sm:inline">—</span>
          <span className="text-white/90">Only <span className="font-bold">17 spots left</span> this month</span>
          <Link href="/portal/register" className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-3 py-0.5 text-xs font-semibold transition-colors">
            Claim Offer
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div> */}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AgentCare
              </span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
              {/* COMMENTED OUT FOR FUTURE USE - Reviews link */}
              {/* <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reviews</Link> */}
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="flex items-center gap-2 text-sm">
                <Link href="/en" className="text-muted-foreground hover:text-foreground transition-colors">EN</Link>
                <span className="text-muted-foreground">/</span>
                <Link href="/ar" className="text-muted-foreground hover:text-foreground transition-colors">عربي</Link>
              </div>
              {/* COMMENTED OUT FOR FUTURE USE - Sign In and Get Started buttons */}
              {/* <Link href="/portal" className="hidden sm:inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs">
                Sign In
              </Link>
              <Link href="/portal/register" className="inline-flex items-center justify-center whitespace-nowrap font-medium bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90 transition-opacity h-8 rounded-md px-3 text-xs">
                Get Started
              </Link> */}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            AI-Powered Service Management
          </span>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t('hero.subtitle')}
          </p>
          {/* COMMENTED OUT FOR FUTURE USE - Hero buttons */}
          {/* <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/portal/register" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 h-11 rounded-md px-8">
              {t('hero.getStarted')}
            </Link>
            <Link href="#video" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border border-border/60 bg-background/50 backdrop-blur-sm hover:bg-muted h-11 rounded-md px-8 gap-2">
              <PlayIcon />
              Watch Demo
            </Link>
          </div> */}
        </div>

        {/* Hero Visual */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border/40 pb-4">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground">AgentCare Dashboard</div>
            </div>
            <div className="grid gap-4 pt-4 md:grid-cols-3">
              <AnimatedStatCard value={1247} suffix="" label="Requests Resolved" color="text-primary" />
              <AnimatedStatCard value={98} suffix=".5%" label="Customer Satisfaction" color="text-green-500" />
              <AnimatedStatCard value={2} suffix=".5h" label="Avg Response Time" color="text-purple-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section - Reduces Anxiety (Norman's Emotional Design) */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">500+ Companies</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENTED OUT FOR FUTURE USE - Video Section */}
      {/* <section id="video" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="mb-4 inline-block text-sm font-semibold text-primary">SEE IT IN ACTION</span>
            <h2 className="text-3xl font-bold sm:text-4xl">Watch How AgentCare Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              See how our AI-powered platform transforms maintenance operations in just 90 seconds
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video rounded-2xl border border-border/40 bg-card/50 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <button className="group mb-4 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                    <svg className="h-8 w-8 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <p className="text-muted-foreground text-sm">Click to play demo video</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="mb-4 inline-block text-sm font-semibold text-primary">FEATURES</span>
            <h2 className="text-3xl font-bold sm:text-4xl">{t('features.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything you need to manage your service operations efficiently
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title={t('features.ai.title')}
              description={t('features.ai.description')}
              icon={<AIIcon />}
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              title={t('features.tracking.title')}
              description={t('features.tracking.description')}
              icon={<TrackingIcon />}
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard
              title={t('features.mobile.title')}
              description={t('features.mobile.description')}
              icon={<MobileIcon />}
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              title={t('features.scheduling.title')}
              description={t('features.scheduling.description')}
              icon={<CalendarIcon />}
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard
              title={t('features.invoicing.title')}
              description={t('features.invoicing.description')}
              icon={<InvoiceIcon />}
              gradient="from-primary to-purple-500"
            />
            <FeatureCard
              title={t('features.analytics.title')}
              description={t('features.analytics.description')}
              icon={<ChartIcon />}
              gradient="from-teal-500 to-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="mb-4 inline-block text-sm font-semibold text-primary">HOW IT WORKS</span>
            <h2 className="text-3xl font-bold sm:text-4xl">{t('howItWorks.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Simple process, powerful results
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number={1}
              title={t('howItWorks.step1.title')}
              description={t('howItWorks.step1.description')}
            />
            <StepCard
              number={2}
              title={t('howItWorks.step2.title')}
              description={t('howItWorks.step2.description')}
            />
            <StepCard
              number={3}
              title={t('howItWorks.step3.title')}
              description={t('howItWorks.step3.description')}
            />
            <StepCard
              number={4}
              title={t('howItWorks.step4.title')}
              description={t('howItWorks.step4.description')}
            />
          </div>
        </div>
      </section>

      {/* COMMENTED OUT FOR FUTURE USE - Testimonials Section */}
      {/* <section id="testimonials" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="mb-4 inline-block text-sm font-semibold text-primary">TESTIMONIALS</span>
            <h2 className="text-3xl font-bold sm:text-4xl">Trusted by Service Leaders</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              See what our customers have to say about AgentCare
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="AgentCare transformed our operations. Response times dropped by 60% and customer satisfaction is at an all-time high."
              author="Ahmed Al-Rashid"
              role="Operations Director"
              company="Gulf Facilities Management"
              avatar="A"
              rating={5}
            />
            <TestimonialCard
              quote="The AI assistant handles 70% of customer inquiries automatically. Our team can now focus on complex issues that really need human attention."
              author="Fatima Hassan"
              role="Customer Service Manager"
              company="Emirates Property Services"
              avatar="F"
              rating={5}
            />
            <TestimonialCard
              quote="Real-time tracking and smart scheduling have made our technicians 40% more efficient. The ROI was visible within the first month."
              author="Mohammed Al-Sayed"
              role="CEO"
              company="Riyadh Maintenance Co."
              avatar="M"
              rating={5}
            />
            <TestimonialCard
              quote="The mobile app for technicians is excellent. They have all job details at their fingertips and can update status instantly."
              author="Sarah Al-Mahmoud"
              role="Field Operations Lead"
              company="Qatar Home Services"
              avatar="S"
              rating={5}
            />
            <TestimonialCard
              quote="Automated invoicing saved our accounts team hours of work every week. No more chasing technicians for job completion details."
              author="Khalid Ibrahim"
              role="Finance Director"
              company="Kuwait Building Maintenance"
              avatar="K"
              rating={5}
            />
            <TestimonialCard
              quote="The analytics dashboard gives us insights we never had before. We can now make data-driven decisions to optimize our operations."
              author="Noura Al-Qahtani"
              role="Business Analyst"
              company="Bahrain Facilities Group"
              avatar="N"
              rating={5}
            />
          </div>
        </div>
      </section> */}

      {/* Mobile App Section */}
      <section id="mobile-apps" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="mb-4 inline-block text-sm font-semibold text-primary">MOBILE APPS</span>
              <h2 className="text-3xl font-bold sm:text-4xl mb-6">Manage Everything On The Go</h2>
              <p className="text-muted-foreground mb-8">
                Download our native mobile apps for the complete AgentCare experience. Available for customers, technicians, and managers.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Customer App</h4>
                    <p className="text-sm text-muted-foreground">Submit requests, track progress, chat with AI support</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Technician App</h4>
                    <p className="text-sm text-muted-foreground">View jobs, navigate, update status, capture photos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Manager App</h4>
                    <p className="text-sm text-muted-foreground">Monitor operations, assign jobs, view analytics</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white hover:bg-black/90 transition-colors">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold -mt-1">App Store</div>
                  </div>
                </a>
                <a href="#" className="inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white hover:bg-black/90 transition-colors">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold -mt-1">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-center gap-4">
                {/* Phone mockups */}
                <div className="relative w-48 transform -rotate-6">
                  <div className="rounded-[2.5rem] border-8 border-gray-800 bg-gray-800 shadow-2xl">
                    <div className="rounded-[2rem] bg-gradient-to-b from-primary/20 to-purple-600/20 aspect-[9/19] flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Customer App</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-52 z-10">
                  <div className="rounded-[2.5rem] border-8 border-gray-800 bg-gray-800 shadow-2xl">
                    <div className="rounded-[2rem] bg-gradient-to-b from-primary/20 to-purple-600/20 aspect-[9/19] flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Technician App</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-48 transform rotate-6">
                  <div className="rounded-[2.5rem] border-8 border-gray-800 bg-gray-800 shadow-2xl">
                    <div className="rounded-[2rem] bg-gradient-to-b from-primary/20 to-purple-600/20 aspect-[9/19] flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Manager App</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="mb-4 inline-block text-sm font-semibold text-primary">PRICING</span>
            <h2 className="text-3xl font-bold sm:text-4xl">{t('pricing.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t('pricing.subtitle')}
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            <PricingCard
              name={t('pricing.starter.name')}
              price="99"
              description={t('pricing.starter.description')}
              features={['Up to 5 technicians', '100 requests/month', 'AI Chat Assistant', 'Mobile Apps', 'Email Support']}
            />
            <PricingCard
              name={t('pricing.professional.name')}
              price="299"
              description={t('pricing.professional.description')}
              features={['Up to 25 technicians', 'Unlimited requests', 'AI Chat + Voice', 'Custom Branding', 'Priority Support', 'Advanced Analytics']}
              featured
            />
            <PricingCard
              name={t('pricing.enterprise.name')}
              price="Custom"
              description={t('pricing.enterprise.description')}
              features={['Unlimited technicians', 'Unlimited requests', 'Multi-location', 'Custom Integrations', 'Dedicated Support', 'SLA Guarantee']}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="mb-4 inline-block text-sm font-semibold text-primary">FAQ</span>
            <h2 className="text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything you need to know about AgentCare
            </p>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            <FAQItem
              question="What is AgentCare?"
              answer="AgentCare is an AI-powered maintenance service management platform that helps businesses automate customer interactions, manage service requests, schedule technicians, and handle invoicing - all in one place."
            />
            <FAQItem
              question="How does the free trial work?"
              answer="Our free trial gives you full access to all features for 30 days. No credit card is required to start. You can upgrade to a paid plan anytime during or after the trial."
            />
            <FAQItem
              question="Can I integrate AgentCare with my existing systems?"
              answer="Yes! AgentCare offers REST APIs and integrations with popular tools like QuickBooks, Zapier, and various CRM systems. Enterprise plans include custom integration support."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Absolutely. AgentCare uses enterprise-grade security with SSL encryption, regular backups, and compliance with international data protection standards including GDPR."
            />
            <FAQItem
              question="Do you support Arabic language?"
              answer="Yes! AgentCare fully supports Arabic with a right-to-left interface and Arabic-speaking AI assistants. Perfect for businesses in the GCC region."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, MasterCard, American Express), as well as bank transfers for Enterprise plans. All payments are processed securely."
            />
            <FAQItem
              question="Can I cancel anytime?"
              answer="Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your data will be available for export for 30 days after cancellation."
            />
            <FAQItem
              question="What kind of support do you offer?"
              answer="We offer email support for all plans, priority support with faster response times for Professional plans, and dedicated account managers for Enterprise customers. We also have extensive documentation and video tutorials."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/90 to-purple-600/90 p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{t('cta.title')}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/80">
                {t('cta.subtitle')}
              </p>
              {/* COMMENTED OUT FOR FUTURE USE - CTA buttons */}
              {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/portal/register" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-11 rounded-md px-8 bg-white text-primary hover:bg-white/90 transition-colors">
                  {t('cta.button')}
                </Link>
                <Link href="#" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium h-11 rounded-md px-8 border border-white/30 text-white hover:bg-white/10 transition-colors">
                  Schedule Demo
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
                  <span className="text-lg font-bold text-white">A</span>
                </div>
                <span className="text-xl font-bold">AgentCare</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                AI-powered maintenance service management for modern businesses. Transform your operations with intelligent automation.
              </p>
              <div className="flex gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white text-xs hover:bg-black/90 transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-white text-xs hover:bg-black/90 transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#mobile-apps" className="hover:text-foreground transition-colors">Mobile Apps</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Press</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">&copy; 2024 AgentCare Technologies. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="group rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative text-center group">
      {/* Connecting line (hidden on last item and mobile) */}
      {number < 4 && (
        <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
      )}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-xl font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/40 relative z-10">
        <span className="transition-transform duration-300 group-hover:scale-110">{number}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold transition-colors duration-200 group-hover:text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  rating,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="h-5 w-5 text-yellow-500 transition-transform duration-200" style={{ transitionDelay: `${i * 50}ms` }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white font-semibold transition-transform duration-300 group-hover:scale-110">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-sm transition-colors duration-200 group-hover:text-primary">{author}</p>
          <p className="text-xs text-muted-foreground">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  featured = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-8 backdrop-blur-sm transition-all ${
        featured
          ? 'border-primary bg-gradient-to-b from-primary/10 to-purple-500/10 shadow-xl shadow-primary/10'
          : 'border-border/40 bg-card/50 hover:border-border hover:shadow-lg'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-purple-600 px-4 py-1 text-xs font-medium text-white">
          Most Popular
        </span>
      )}
      <h3 className="mb-2 text-xl font-bold">{name}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price === 'Custom' ? '' : '$'}{price}</span>
        {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      {/* COMMENTED OUT FOR FUTURE USE - Get Started button */}
      {/* <Link
        href="/portal/register"
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 w-full ${
          featured
            ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90'
            : 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
        } transition-colors`}
      >
        Get Started
      </Link> */}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-xl border border-border/40 bg-card/50 overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg shadow-primary/5 border-primary/30' : 'hover:border-border'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold transition-colors duration-200 ${isOpen ? 'text-primary' : 'group-hover:text-foreground'}`}>{question}</span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-primary/10 rotate-180' : 'bg-muted group-hover:bg-muted/80'}`}>
          <svg
            className={`h-4 w-4 transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-0">
            <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function AIIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function TrackingIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

// Animated Stat Card - Uses IntersectionObserver for scroll-triggered animations
function AnimatedStatCard({
  value,
  suffix,
  label,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
}) {
  const { count, ref } = useAnimatedCounter(value, 2000);

  return (
    <div ref={ref} className="rounded-lg bg-muted/50 p-4 transition-transform hover:scale-105">
      <div className={`text-3xl font-bold ${color} tabular-nums`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
