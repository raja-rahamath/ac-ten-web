'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// API base URL for the public AI service
const API_BASE_URL = process.env.NEXT_PUBLIC_PUB_AI_URL || 'http://localhost:8001';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isNew?: boolean; // For animation
}

interface Suggestion {
  label: string;
  value: string;
}

interface ChatSession {
  sessionId: string;
  agentName: string;
  agentAvatar?: string;
}

// Psychology: Attention-grabbing pulse animation timing
const PULSE_INTERVAL = 10000; // Pulse every 10 seconds when closed

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState<Record<string, string> | null>(null);
  const [showPulse, setShowPulse] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailName, setEmailName] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Psychology: Periodic attention grab when chat is closed
  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 2000);
    }, PULSE_INTERVAL);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // Auto-focus input after new messages
    if (isOpen && !isLoading) {
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isLoading]);

  const startChat = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/v1/chat/start?language=en`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to start chat');

      const data = await response.json();

      setSession({
        sessionId: data.session_id,
        agentName: data.agent_name,
        agentAvatar: data.agent_avatar,
      });

      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        },
      ]);

      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Failed to start chat:', error);
      // Fallback greeting if API is not available
      setSession({
        sessionId: 'offline-' + crypto.randomUUID(),
        agentName: 'AgentCare Assistant',
      });
      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "Hello! Welcome to AgentCare. I'm here to help you learn about our AI-powered maintenance management platform. How can I assist you today?",
          timestamp: new Date(),
        },
      ]);
      setSuggestions([
        { label: 'Tell me about AgentCare', value: 'What is AgentCare?' },
        { label: 'See pricing plans', value: 'What are your pricing plans?' },
        { label: 'Start free trial', value: 'I want to start a free trial' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    if (!session) {
      startChat();
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [session, startChat]);

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setSuggestions([]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: session?.sessionId,
          message: content.trim(),
          language: 'en',
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setSuggestions(data.suggestions || []);

      // Check if registration is complete
      if (data.requires_registration && data.registration_data) {
        setRegistrationData(data.registration_data);
        setShowRegistrationForm(true);
      }

      // Update session if changed
      if (data.session_id !== session?.sessionId) {
        setSession({
          sessionId: data.session_id,
          agentName: data.agent_name,
          agentAvatar: data.agent_avatar,
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      // Focus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    sendMessage(suggestion.value);
    // Keep focus on input after clicking suggestion
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRegistration = async () => {
    if (!registrationData) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/registration/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: data.message,
            timestamp: new Date(),
          },
        ]);
        setShowRegistrationForm(false);
        setRegistrationData(null);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "I'm sorry, there was an issue completing your registration. Please try again or contact support.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      // Focus input after registration completes
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleEmailTranscript = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.sessionId || !emailAddress) return;

    setEmailSending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/chat/transcript/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: session.sessionId,
          email: emailAddress,
          name: emailName || 'Valued Customer',
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');

      setEmailSent(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSent(false);
        setEmailAddress('');
        setEmailName('');
      }, 2000);
    } catch (error) {
      console.error('Failed to send transcript:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button - Psychology: Attention-grabbing with pulse + social proof badge */}
      <button
        onClick={openChat}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-primary/30 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } ${showPulse && !isOpen ? 'animate-bounce' : ''}`}
        aria-label="Open chat"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {/* Online indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
        </span>
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold animate-pulse">
            {unreadCount}
          </span>
        )}
        {/* Tooltip hint - Psychology: Reduces uncertainty */}
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
          Chat with us!
        </span>
      </button>

      {/* Proactive engagement popup - Psychology: Zeigarnik effect (incomplete tasks) */}
      {!isOpen && !session && (
        <div className="fixed bottom-24 right-6 z-40 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="relative max-w-xs rounded-2xl border border-border/40 bg-card p-4 shadow-xl">
            <button
              onClick={() => {}} // Close hint
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Hi there!</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Have questions? Our AI assistant can help you get started in seconds.
                </p>
              </div>
            </div>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-border/40 bg-card"></div>
        </div>
      )}

      {/* Chat Modal */}
      <div
        className={`fixed bottom-0 right-0 z-50 flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-border/40 bg-background shadow-2xl transition-all duration-300 sm:bottom-6 sm:right-6 sm:rounded-2xl ${
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-full opacity-0 sm:translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 bg-gradient-to-r from-primary to-purple-600 px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">{session?.agentName || 'AgentCare'}</h3>
              <p className="text-xs text-white/80">
                {isLoading ? 'Typing...' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Email transcript button */}
            {messages.length > 0 && (
              <button
                onClick={() => setShowEmailModal(true)}
                className="rounded-full p-2 transition-colors hover:bg-white/20"
                aria-label="Email transcript"
                title="Email chat transcript"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            )}
            <button
              onClick={closeChat}
              className="rounded-full p-2 transition-colors hover:bg-white/20"
              aria-label="Close chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`mt-1 text-xs ${
                    message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && !isLoading && (
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        )}

        {/* Registration Confirmation */}
        {showRegistrationForm && registrationData && (
          <div className="border-t border-border/40 bg-muted/50 p-4">
            <p className="mb-3 text-sm font-medium">Confirm your registration:</p>
            <button
              onClick={handleRegistration}
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-primary to-purple-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Complete Registration'}
            </button>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-border/40 p-4">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              disabled={isLoading}
              className="flex-1 rounded-full border border-border/60 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              aria-label="Send message"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={closeChat}
        />
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl animate-in zoom-in-95 fade-in duration-200">
            {emailSent ? (
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Email Sent!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check your inbox for the chat transcript.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Email Chat Transcript</h3>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="rounded-full p-2 hover:bg-muted transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Get a copy of this conversation sent to your email.
                </p>
                <form onSubmit={handleEmailTranscript} className="space-y-4">
                  <div>
                    <label htmlFor="email-name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      id="email-name"
                      type="text"
                      value={emailName}
                      onChange={(e) => setEmailName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-border/60 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="block text-sm font-medium mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email-address"
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-border/60 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={emailSending || !emailAddress}
                      className="flex-1 rounded-lg bg-gradient-to-r from-primary to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {emailSending ? 'Sending...' : 'Send Email'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
