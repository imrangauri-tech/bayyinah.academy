'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useBrevo from '@/hooks/useBrevo';

interface NewsletterFormData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export default function EnhancedNewsletterForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [showExtendedForm, setShowExtendedForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { subscribeToNewsletter, isLoading, error } = useBrevo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      return;
    }

    const result = await subscribeToNewsletter({
      email: formData.email.trim(),
      firstName: formData.firstName?.trim() || undefined,
      lastName: formData.lastName?.trim() || undefined,
    });

    if (result.success) {
      setSuccessMessage('Successfully subscribed to newsletter!');
      setFormData({ email: '', firstName: '', lastName: '' });
      setShowExtendedForm(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
    setSuccessMessage(null);
  };

  const handleInputChange = (field: keyof NewsletterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  if (successMessage) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-lg font-semibold mb-2">
          ✓ {successMessage}
        </div>
        <p className="text-green-700 text-sm">
          Welcome to our community! You'll receive updates about our latest courses and Islamic studies content.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Stay Updated with Islamic Studies
        </h3>
        <p className="text-gray-600 text-sm">
          Get notified about new courses, Quran classes, and Islamic knowledge resources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleEmailChange}
            required
            className="mt-1"
            disabled={isLoading}
          />
        </div>

        {showExtendedForm && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>
            </div>
          </>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isLoading || !formData.email.trim()}
            className="flex-1"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Subscribing...
              </div>
            ) : (
              'Subscribe to Newsletter'
            )}
          </Button>
          
          {!showExtendedForm && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowExtendedForm(true)}
              disabled={isLoading}
              className="sm:w-auto"
            >
              More Options
            </Button>
          )}
        </div>

        {!showExtendedForm && (
          <p className="text-xs text-gray-500 text-center">
            By subscribing, you agree to receive email updates from us. 
            You can unsubscribe at any time.
          </p>
        )}
      </form>
    </div>
  );
}
