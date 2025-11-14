
import { useState, useEffect, useCallback } from 'react';
import { PaymentRequest } from '../types';
import * as authService from '../services/authService';

/**
 * A custom hook to fetch and manage payment requests.
 * If a userId is provided, it fetches requests for that specific user.
 * Otherwise, it fetches all payment requests (admin view).
 * @param userId - Optional ID of the user to fetch requests for.
 */
export const usePaymentRequests = (userId?: string) => {
    const [requests, setRequests] = useState<PaymentRequest[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedRequests = userId 
                ? await authService.getPaymentRequestsForUser(userId)
                : await authService.getAllPaymentRequests();
            setRequests(fetchedRequests);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch payment requests.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    return {
        requests,
        isLoading,
        error,
        refreshRequests: fetchRequests
    };
};
