"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle, Book, Zap, CreditCard, Shield } from 'lucide-react';

export const HelpCenter = () => {
  const categories = [
    {
      icon: Zap,
      title: 'Getting Started',
      description: 'Learn the basics and set up your account',
      articles: 12
    },
    {
      icon: Book,
      title: 'Image Generation',
      description: 'Master all types of image generation',
      articles: 18
    },
    {
      icon: CreditCard,
      title: 'Billing & Credits',
      description: 'Manage your subscription and credits',
      articles: 8
    },
    {
      icon: Shield,
      title: 'Account & Security',
      description: 'Keep your account safe and secure',
      articles: 10
    },
  ];

  const faqs = [
    {
      question: 'How many credits does each generation cost?',
      answer: 'Plain images cost 5 credits, themed images cost 8 credits, model images cost 12 credits, and campaign images cost 15 credits.'
    },
    {
      question: 'Can I use my own model photos?',
      answer: 'Yes! You can upload human model photos with plain backgrounds and front or 3/4 angle poses for best results.'
    },
    {
      question: 'How long does image generation take?',
      answer: 'Generation times vary: plain images take 2-3 seconds, themed images 3-4 seconds, model images 4-5 seconds, and campaign images 5-6 seconds.'
    },
    {
      question: 'Can I collaborate with team members?',
      answer: 'Yes! You can invite collaborators to your projects with different roles: Owner, Editor, or Viewer permissions.'
    },
  ];

  return (
    <div style={{ color: 'hsl(0, 0%, 15%)', backgroundColor: 'hsl(0, 0%, 98%)', fontFamily: 'Inter, sans-serif' }} className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'hsl(0, 0%, 15%)', marginBottom: '1rem' }}>
          How can we help you?
        </h1>
        <p style={{ color: 'hsl(0, 0%, 40%)', marginBottom: '1.5rem' }}>
          Search our knowledge base or browse categories below
        </p>
        <div style={{ position: 'relative' }}>
          <Search
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '1.25rem',
              height: '1.25rem',
              color: 'hsl(0, 0%, 50%)'
            }}
          />
          <Input
            placeholder="Search for articles, guides, or FAQs..."
            className="pl-12 h-12 text-base"
            style={{
              paddingLeft: '3rem',
              height: '3rem',
              fontSize: '1rem',
              borderColor: 'hsl(0, 0%, 85%)',
              backgroundColor: 'white',
              borderRadius: '0.75rem'
            }}
          />
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, idx) => (
          <Card
            key={idx}
            className="transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
              borderRadius: '0.75rem',
              backgroundColor: 'white',
              transition: 'all 0.3s ease',
            }}
          >
            <CardContent
              style={{
                padding: '1.5rem',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(to bottom right, hsl(180, 45%, 45%), hsl(180, 45%, 55%))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                }}
              >
                <category.icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <h3 style={{ fontWeight: 600, color: 'hsl(0, 0%, 15%)', marginBottom: '0.5rem' }}>
                {category.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'hsl(0, 0%, 40%)', marginBottom: '0.75rem' }}>
                {category.description}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'hsl(180, 45%, 45%)', fontWeight: 500 }}>
                {category.articles} articles
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card
        style={{
          boxShadow: '0 8px 30px -8px rgba(71, 71, 71, 0.15)',
          borderRadius: '0.75rem',
          backgroundColor: 'white',
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: 'hsl(0, 0%, 15%)' }}>Frequently Asked Questions</CardTitle>
          <CardDescription style={{ color: 'hsl(0, 0%, 40%)' }}>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                paddingBottom: '1.5rem',
                borderBottom: idx !== faqs.length - 1 ? '1px solid hsl(0, 0%, 90%)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'hsla(180, 45%, 45%, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '0.25rem',
                  }}
                >
                  <HelpCircle style={{ width: '1rem', height: '1rem', color: 'hsl(180, 45%, 45%)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 600, color: 'hsl(0, 0%, 15%)', marginBottom: '0.5rem' }}>
                    {faq.question}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'hsl(0, 0%, 40%)' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
          borderRadius: '0.75rem',
          background: 'linear-gradient(to bottom right, hsla(180, 45%, 45%, 0.05), transparent)',
          border: '1px solid hsla(180, 45%, 45%, 0.2)',
        }}
      >
        <CardContent style={{ padding: '2rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'hsl(0, 0%, 15%)', marginBottom: '0.5rem' }}>
            Still need help?
          </h3>
          <p style={{ color: 'hsl(0, 0%, 40%)', marginBottom: '1rem' }}>
            Our support team is here to assist you
          </p>
          <Button
            style={{
              background: 'linear-gradient(to right, hsl(180, 45%, 45%), hsl(180, 45%, 55%))',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 500,
            }}
          >
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenter;
