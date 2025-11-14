
import { User, PaymentRequest, PaymentRequestStatus } from '../types';

interface MockUser extends Omit<User, 'lastCreditReset' | 'createdAt'> {
  password?: string;
  lastCreditReset: Date;
  createdAt: Date;
}

const users: MockUser[] = [
  { 
    id: '1', 
    name: 'Test User',
    email: 'user@example.com', 
    role: 'user', 
    password: 'password123',
    currentCredits: 25,
    dailyCreditLimit: 25,
    lastCreditReset: new Date(),
    isBanned: false,
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  { 
    id: 'admin-1', 
    name: 'Tanmay Mishra',
    email: 'support@aozoradesu.com', 
    role: 'admin', 
    password: 'ItzTanmayz@123',
    currentCredits: 9999,
    dailyCreditLimit: 9999, // Admins have effectively unlimited credits
    lastCreditReset: new Date(),
    isBanned: false,
    createdAt: new Date('2023-10-25T09:00:00Z'),
  }
];

const paymentRequests: PaymentRequest[] = [
    {
        id: 'req-1',
        userId: '1',
        userEmail: 'user@example.com',
        credits: 50,
        amountPaid: 199,
        utr: '123456789012',
        message: 'Test request, please approve.',
        status: PaymentRequestStatus.PENDING,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'req-2',
        userId: '1',
        userEmail: 'user@example.com',
        credits: 100,
        amountPaid: 299,
        utr: '098765432109',
        status: PaymentRequestStatus.APPROVED,
        createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), // 28 hours ago
        updatedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    }
];


const SESSION_KEY = 'aozora_user_session';

// --- Helper Functions ---

const findUserByEmail = (email: string): MockUser | undefined => {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

const findUserById = (id: string): MockUser | undefined => {
  return users.find(u => u.id === id);
};

const serializeUser = (user: MockUser): User => {
  const { password, ...userForClient } = user;
  return {
    ...userForClient,
    lastCreditReset: user.lastCreditReset.toISOString(),
    createdAt: user.createdAt.toISOString(),
  };
};

const isBeforeToday = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// --- Daily Credit "Lazy Reset" Logic ---

const checkAndResetCredits = (user: MockUser): MockUser => {
  if (user.role === 'admin') return user; 

  if (isBeforeToday(user.lastCreditReset)) {
    console.log(`Resetting credits for ${user.email} to their limit of ${user.dailyCreditLimit}`);
    user.currentCredits = user.dailyCreditLimit;
    user.lastCreditReset = new Date();
  }
  return user;
};


// --- Simulated API Calls ---

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let userToAuth = findUserByEmail(email);

      if (userToAuth?.isBanned) {
        return reject(new Error('This account has been banned.'));
      }
      
      if (userToAuth && userToAuth.password === password) {
        userToAuth = checkAndResetCredits(userToAuth);
        localStorage.setItem(SESSION_KEY, JSON.stringify(userToAuth));
        resolve(serializeUser(userToAuth));
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 1000);
  });
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (findUserByEmail(email)) {
                return reject(new Error('An account with this email already exists.'));
            }
            const newUser: MockUser = {
              id: `user-${Date.now()}`,
              name,
              email,
              password,
              role: 'user',
              currentCredits: 25,
              dailyCreditLimit: 25,
              lastCreditReset: new Date(),
              isBanned: false,
              createdAt: new Date(),
            };
            users.push(newUser);
            localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
            resolve(serializeUser(newUser));
        }, 1000);
    });
};

export const getMe = async (): Promise<User | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const sessionData = localStorage.getItem(SESSION_KEY);
            if (sessionData) {
                let userInStorage: MockUser;
                try {
                  userInStorage = JSON.parse(sessionData);
                } catch {
                   localStorage.removeItem(SESSION_KEY);
                   return resolve(null);
                }
                
                // Dates are stored as strings in JSON, need to parse them back
                userInStorage.lastCreditReset = new Date(userInStorage.lastCreditReset);
                userInStorage.createdAt = new Date(userInStorage.createdAt);

                const freshUserFromDB = findUserById(userInStorage.id);
                if (!freshUserFromDB || freshUserFromDB.isBanned) {
                    localStorage.removeItem(SESSION_KEY);
                    return resolve(null);
                }

                const updatedUser = checkAndResetCredits(freshUserFromDB);
                localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser)); // Resync session
                resolve(serializeUser(updatedUser));
            } else {
                resolve(null);
            }
        }, 500);
    });
};

export const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.removeItem(SESSION_KEY);
            resolve();
        }, 500);
    });
};

// --- Admin Panel Functions ---

export const getAllUsers = async (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users.map(serializeUser));
        }, 800);
    });
};

export const toggleUserBan = async (userId: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = findUserById(userId);
            if (user) {
                user.isBanned = !user.isBanned;
                resolve(serializeUser(user));
            } else {
                reject(new Error('User not found.'));
            }
        }, 500);
    });
};

// This now adjusts the DAILY LIMIT, not the current balance.
export const adjustUserCreditLimit = async (userId: string, amount: number): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = findUserById(userId);
            if (user) {
                user.dailyCreditLimit = Math.max(0, user.dailyCreditLimit + amount);
                // Also give them the credits immediately for good UX
                user.currentCredits = Math.max(0, user.currentCredits + amount);
                resolve(serializeUser(user));
            } else {
                reject(new Error('User not found.'));
            }
        }, 500);
    });
};

// --- Credit Consumption ---

export const deductCredit = async (userId: string, amount: number): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = findUserById(userId);
            if (user) {
                if (user.role === 'admin') return resolve(serializeUser(user)); // Admins are not charged
                if (user.currentCredits >= amount) {
                    user.currentCredits -= amount;
                    localStorage.setItem(SESSION_KEY, JSON.stringify(user)); // Update session
                    resolve(serializeUser(user));
                } else {
                    reject(new Error('Not enough credits.'));
                }
            } else {
                reject(new Error('User not found.'));
            }
        }, 200);
    });
};

// --- Payment Request Functions ---

export const submitPaymentRequest = async (userId: string, userEmail: string, credits: number, amountPaid: number, utr: string, message?: string): Promise<PaymentRequest> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newRequest: PaymentRequest = {
                id: `req-${Date.now()}`,
                userId,
                userEmail,
                credits,
                amountPaid,
                utr,
                message,
                status: PaymentRequestStatus.PENDING,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            paymentRequests.unshift(newRequest); // Add to the beginning of the list
            resolve(newRequest);
        }, 1000);
    });
};

export const getPaymentRequestsForUser = async (userId: string): Promise<PaymentRequest[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userRequests = paymentRequests.filter(req => req.userId === userId);
            resolve(userRequests);
        }, 700);
    });
};

export const getAllPaymentRequests = async (): Promise<PaymentRequest[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(paymentRequests);
        }, 1200);
    });
};

export const processPaymentRequest = async (requestId: string, newStatus: PaymentRequestStatus.APPROVED | PaymentRequestStatus.REJECTED): Promise<PaymentRequest> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const request = paymentRequests.find(r => r.id === requestId);
            if (!request) {
                return reject(new Error("Payment request not found."));
            }
            if (request.status !== PaymentRequestStatus.PENDING) {
                return reject(new Error(`Request has already been ${request.status.toLowerCase()}.`));
            }

            const user = findUserById(request.userId);
            if (!user) {
                request.status = PaymentRequestStatus.REJECTED; // Reject if user doesn't exist
                return reject(new Error("User associated with the request not found."));
            }

            if (newStatus === PaymentRequestStatus.APPROVED) {
                user.dailyCreditLimit += request.credits;
                user.currentCredits += request.credits; // Give credits instantly
            }

            request.status = newStatus;
            request.updatedAt = new Date().toISOString();

            resolve(request);
        }, 1000);
    });
};