
import React, { useState, useEffect } from 'react';
import { Page, PaymentRequest, PaymentRequestStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';
import * as authService from '../services/authService';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import Spinner from '../components/Spinner';
import { Icon } from '../components/Icon';
import { usePaymentRequests } from '../hooks/usePaymentRequests';


const pricingPlans = [
    { credits: 50, price: 199 },
    { credits: 100, price: 299 },
    { credits: 200, price: 499 },
];

const RequestHistory: React.FC<{ requests: PaymentRequest[] | null, isLoading: boolean, error: string | null }> = ({ requests, isLoading, error }) => {
    const getStatusChip = (status: PaymentRequestStatus) => {
        switch (status) {
            case PaymentRequestStatus.APPROVED:
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Approved</span>;
            case PaymentRequestStatus.REJECTED:
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Rejected</span>;
            case PaymentRequestStatus.PENDING:
            default:
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</span>;
        }
    };
    
    if (isLoading) return <div className="mt-4"><Spinner message="Loading history..." /></div>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
    if (!requests || requests.length === 0) return <p className="text-gray-500 text-center mt-4">You have no recent purchase requests.</p>;

    return (
         <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Plan</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">UTR/ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {requests.map(req => (
                        <tr key={req.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{req.credits} Credits</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{req.utr}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">{getStatusChip(req.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const BuyCreditsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const { user } = useAuth();
    const { requests, isLoading: isHistoryLoading, error: historyError, refreshRequests } = usePaymentRequests(user?.id);
    const [selectedPlan, setSelectedPlan] = useState(pricingPlans[0]);
    const [utr, setUtr] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!utr.trim() || !user) {
            setSubmitError("Please enter the UTR/Transaction ID.");
            return;
        }
        setSubmitError(null);
        setIsSubmitting(true);
        setSubmitSuccess(null);
        try {
            await authService.submitPaymentRequest(user.id, user.email, selectedPlan.credits, selectedPlan.price, utr, message);
            setSubmitSuccess("Your request has been submitted! It will be reviewed by an admin shortly. This can take up to 24 hours.");
            setUtr('');
            setMessage('');
            refreshRequests(); // Refresh history
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <div className="container mx-auto px-4 flex flex-col min-h-screen">
                <AppHeader onNavigate={onNavigate} />

                <main className="flex-grow flex flex-col items-center justify-center py-12">
                     <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-bold">Buy Extra Daily Credits</h1>
                        <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                           Increase your daily credit limit permanently. Follow the steps below to complete your purchase.
                        </p>
                    </div>

                    <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Side: QR Code and Instructions */}
                        <div className="bg-[#1B1B1B] rounded-2xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-1">Step 1: Pay via UPI</h2>
                            <p className="text-gray-400 mb-6">Scan the QR code below with any UPI app to make the payment for your chosen plan.</p>
                            <img 
                                src="https://q01yj8b3vca0-deploy.space.z.ai/phonepe-qr-code.png" 
                                alt="UPI QR Code for payment"
                                className="rounded-lg w-64 h-auto mx-auto"
                            />
                            <div className="mt-6 text-sm text-gray-400 bg-gray-900/50 p-4 rounded-lg">
                                <h3 className="font-semibold text-white mb-2">Important Instructions:</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Ensure you pay the correct amount for the plan you want.</li>
                                    <li>After paying, find the 12-digit UPI Transaction ID (also called UTR).</li>
                                    <li>You **must** enter this ID in the form to verify your payment.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Side: Form and History */}
                        <div className="bg-[#1B1B1B] rounded-2xl p-8 border border-white/10">
                             <h2 className="text-2xl font-bold text-white mb-1">Step 2: Submit Verification</h2>
                             <p className="text-gray-400 mb-6">Once you've paid, fill out this form to request your credits.</p>
                             
                            {submitSuccess ? (
                                <div className="text-center p-6 bg-green-900/50 rounded-lg">
                                    <p className="font-semibold text-green-300">Success!</p>
                                    <p className="text-green-400">{submitSuccess}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                                        <input type="text" value={user?.name || ''} disabled className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Credit Plan</label>
                                        <select value={selectedPlan.credits} onChange={(e) => setSelectedPlan(pricingPlans.find(p => p.credits === +e.target.value) || pricingPlans[0])} className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md">
                                            {pricingPlans.map(p => <option key={p.credits} value={p.credits}>{p.credits} Credits (₹{p.price})</option>)}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="utr" className="block text-sm font-medium text-gray-300 mb-1">UTR / UPI Transaction ID</label>
                                        <input id="utr" type="text" value={utr} onChange={(e) => setUtr(e.target.value)} required placeholder="Enter 12-digit ID" className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Optional Message</label>
                                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={2} className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md resize-none" />
                                    </div>
                                    {submitError && <p className="text-red-400 text-center mb-4">{submitError}</p>}
                                    <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-600 flex items-center justify-center">
                                        {isSubmitting ? <Icon name="spinner" className="h-5 w-5" /> : 'Submit Request'}
                                    </button>
                                </form>
                            )}

                             <div className="mt-8 pt-6 border-t border-white/10">
                                <h3 className="text-xl font-bold text-white mb-2 text-center">Your Request History</h3>
                                <RequestHistory requests={requests} isLoading={isHistoryLoading} error={historyError} />
                            </div>
                        </div>
                    </div>
                </main>

                <AppFooter onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default BuyCreditsPage;
