import { useState, useCallback } from 'react';

interface BrevoResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface UseBrevoReturn {
  // Newsletter subscription
  subscribeToNewsletter: (data: {
    email: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<BrevoResponse>;
  
  // Send emails
  sendEmail: (data: {
    to: string | string[];
    subject: string;
    textContent: string;
    htmlContent?: string;
    replyTo?: { email: string; name?: string };
  }) => Promise<BrevoResponse>;
  
  // Send template emails
  sendTemplateEmail: (data: {
    to: string | string[];
    templateId: number;
    templateData: Record<string, any>;
    subject?: string;
  }) => Promise<BrevoResponse>;
  
  // Contact management
  upsertContact: (data: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    country?: string;
    attributes?: Record<string, any>;
  }, listIds?: number[]) => Promise<BrevoResponse>;
  
  // Lists and contacts
  getLists: () => Promise<BrevoResponse>;
  getContactsFromList: (listId: number, limit?: number, offset?: number) => Promise<BrevoResponse>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

export const useBrevo = (): UseBrevoReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<BrevoResponse<T>> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const subscribeToNewsletter = useCallback(async (data: {
    email: string;
    firstName?: string;
    lastName?: string;
  }) => {
    return handleRequest('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, [handleRequest]);

  const sendEmail = useCallback(async (data: {
    to: string | string[];
    subject: string;
    textContent: string;
    htmlContent?: string;
    replyTo?: { email: string; name?: string };
  }) => {
    return handleRequest('/api/brevo', {
      method: 'POST',
      body: JSON.stringify({
        action: 'send-email',
        data,
      }),
    });
  }, [handleRequest]);

  const sendTemplateEmail = useCallback(async (data: {
    to: string | string[];
    templateId: number;
    templateData: Record<string, any>;
    subject?: string;
  }) => {
    return handleRequest('/api/brevo', {
      method: 'POST',
      body: JSON.stringify({
        action: 'send-template',
        data,
      }),
    });
  }, [handleRequest]);

  const upsertContact = useCallback(async (data: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    country?: string;
    attributes?: Record<string, any>;
  }, listIds?: number[]) => {
    return handleRequest('/api/brevo', {
      method: 'POST',
      body: JSON.stringify({
        action: 'upsert-contact',
        data: { contactData: data, listIds },
      }),
    });
  }, [handleRequest]);

  const getLists = useCallback(async () => {
    return handleRequest('/api/brevo?action=lists');
  }, [handleRequest]);

  const getContactsFromList = useCallback(async (listId: number, limit = 50, offset = 0) => {
    return handleRequest(`/api/brevo?action=contacts&listId=${listId}&limit=${limit}&offset=${offset}`);
  }, [handleRequest]);

  return {
    subscribeToNewsletter,
    sendEmail,
    sendTemplateEmail,
    upsertContact,
    getLists,
    getContactsFromList,
    isLoading,
    error,
  };
};

export default useBrevo;
