
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Page, User, PaymentRequest, PaymentRequestStatus } from '../types';
import * as authService from '../services/authService';
import { Icon } from '../components/Icon';
import Spinner from '../components/Spinner';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { usePaymentRequests } from '../hooks/usePaymentRequests';

enum AdminTab {
    USERS = "User Management",
    PAYMENTS = "Payment Requests",
}

const UserManagementTab: React.FC<{ users: User[], fetchUsers: () => void }> = ({ users, fetchUsers }) => {
    const [creditAdjustments, setCreditAdjustments] = useState<{ [key: string]: string }>({});

    const handleToggleBan = async (userId: string) => {
        try {
            await authService.toggleUserBan(userId);
            await fetchUsers();
        } catch (err) {
            alert(`Failed to update ban status: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };

    const handleCreditLimitAdjustment = async (userId: string, amount: number) => {
        if (isNaN(amount)) return;
        try {
            await authService.adjustUserCreditLimit(userId, amount);
            setCreditAdjustments(prev => ({ ...prev, [userId]: '' }));
            await fetchUsers();
        } catch (err) {
            alert(`Failed to adjust credit limit: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Credits (Current/Limit)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.filter(u => u.role !== 'admin').map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBanned ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                                    {user.isBanned ? 'Banned' : 'Active'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.currentCredits} / {user.dailyCreditLimit}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleToggleBan(user.id)} className={`px-3 py-1 text-xs rounded-md ${user.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}>
                                        {user.isBanned ? 'Unban' : 'Ban'}
                                    </button>
                                    <div className="flex items-center">
                                        <input
                                            type="number"
                                            value={creditAdjustments[user.id] || ''}
                                            onChange={(e) => setCreditAdjustments(prev => ({ ...prev, [user.id]: e.target.value }))}
                                            className="w-20 p-1 text-center bg-gray-200 dark:bg-gray-700 rounded-l-md"
                                            placeholder="Limit +/-"
                                        />
                                        <button onClick={() => handleCreditLimitAdjustment(user.id, parseInt(creditAdjustments[user.id] || '0', 10))} className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md text-sm">+</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PaymentRequestsTab: React.FC<{ requests: PaymentRequest[] | null, isLoading: boolean, error: string | null, refreshRequests: () => void }> = ({ requests, isLoading, error, refreshRequests }) => {
     const [isProcessing, setIsProcessing] = useState<string | null>(null);

    const handleProcessRequest = async (requestId: string, status: PaymentRequestStatus.APPROVED | PaymentRequestStatus.REJECTED) => {
        setIsProcessing(requestId);
        try {
            await authService.processPaymentRequest(requestId, status);
            refreshRequests();
        } catch (err) {
            alert(`Failed to process request: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsProcessing(null);
        }
    };

    if (isLoading) return <Spinner message="Loading payment requests..." />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Request Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">UTR/ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                </thead>
                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                     {requests?.map(req => (
                         <tr key={req.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{req.userEmail}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">ID: {req.userId}</div>
                             </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                 {req.credits} Credits (₹{req.amountPaid})
                                 <div className="text-xs text-gray-500">On: {new Date(req.createdAt).toLocaleString()}</div>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{req.utr}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${req.status === PaymentRequestStatus.APPROVED ? 'bg-green-100 text-green-800' : req.status === PaymentRequestStatus.REJECTED ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                     {req.status}
                                 </span>
                             </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 {req.status === PaymentRequestStatus.PENDING ? (
                                     <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleProcessRequest(req.id, PaymentRequestStatus.APPROVED)}
                                            disabled={isProcessing === req.id}
                                            className="px-3 py-1 text-xs rounded-md bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-500"
                                        >
                                            {isProcessing === req.id ? <Icon name="spinner" className="h-4 w-4" /> : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleProcessRequest(req.id, PaymentRequestStatus.REJECTED)}
                                             disabled={isProcessing === req.id}
                                            className="px-3 py-1 text-xs rounded-md bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-500"
                                        >
                                            Reject
                                         </button>
                                     </div>
                                 ) : (
                                     <span className="text-xs text-gray-500 italic">Processed</span>
                                 )}
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
    );
};

const AdminPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.USERS);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [userError, setUserError] = useState<string | null>(null);

    const { requests, isLoading: isLoadingPayments, error: paymentError, refreshRequests } = usePaymentRequests();


    const fetchUsers = useCallback(async () => {
        setIsLoadingUsers(true);
        try {
            const userList = await authService.getAllUsers();
            setUsers(userList);
        } catch (err) {
            setUserError(err instanceof Error ? err.message : "Failed to fetch users.");
        } finally {
            setIsLoadingUsers(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    const pendingPaymentCount = useMemo(() => {
        return requests?.filter(r => r.status === PaymentRequestStatus.PENDING).length || 0;
    }, [requests]);

    const TabButton: React.FC<{ tab: AdminTab; count?: number }> = ({ tab, count }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md relative ${activeTab === tab ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
        >
            {tab}
            {count !== undefined && count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{count}</span>
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-100 font-sans">
            <div className="container mx-auto px-4 flex flex-col min-h-screen">
                <AppHeader onNavigate={onNavigate} titleOverride="Admin Panel" />
                <main className="flex-grow py-12">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-2xl font-bold text-black dark:text-white">Admin Dashboard</h2>
                             <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
                                 <TabButton tab={AdminTab.USERS} />
                                 <TabButton tab={AdminTab.PAYMENTS} count={pendingPaymentCount} />
                             </div>
                        </div>

                        {activeTab === AdminTab.USERS && (
                            isLoadingUsers ? <Spinner message="Loading users..." /> : userError ? <p className="text-red-500 text-center">{userError}</p> : <UserManagementTab users={users} fetchUsers={fetchUsers} />
                        )}
                        {activeTab === AdminTab.PAYMENTS && (
                            <PaymentRequestsTab requests={requests} isLoading={isLoadingPayments} error={paymentError} refreshRequests={refreshRequests} />
                        )}
                    </div>
                </main>
                <AppFooter onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default AdminPage;