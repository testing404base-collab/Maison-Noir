import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserReservation } from '../types';
import {
  saveUserToSupabase,
  saveReservationToSupabase,
  fetchReservationsFromSupabase,
} from '../lib/supabase';

interface AuthContextType {
  currentUser: UserProfile | null;
  reservations: UserReservation[];
  loginMember: (email: string, name: string) => void;
  loginAdmin: (password: string) => { success: boolean; message?: string };
  loginWithCredentials: (name: string, email: string, password: string) => { success: boolean; message?: string; role: 'admin' | 'member' };
  logout: () => void;
  addReservation: (reservation: Omit<UserReservation, 'id' | 'status' | 'createdAt'>) => UserReservation;
  cancelReservation: (id: string) => void;
  isAdminSessionLocked: boolean;
  clearAdminLock: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_LOCK_KEY = 'mn_admin_active_session';
const RESERVATIONS_STORAGE_KEY = 'mn_all_reservations';
const USER_STORAGE_KEY = 'mn_current_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [reservations, setReservations] = useState<UserReservation[]>(() => {
    const saved = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    // Initial sample reservations for rich demo experience
    return [
      {
        id: 'MN-94281',
        date: '2026-08-05',
        time: '19:30',
        guests: 2,
        seatingArea: 'chefs_counter',
        occasion: 'Anniversary Celebration',
        dietaryNotes: 'No seafood allergy for 1 guest',
        fullName: 'Alexander Wright',
        email: 'alex.wright@luxury.com',
        phone: '+1 (212) 555-8921',
        confirmationCode: 'MN-94281',
        status: 'Confirmed',
        createdAt: '2026-07-20T14:30:00Z',
      },
      {
        id: 'MN-88319',
        date: '2026-08-12',
        time: '20:00',
        guests: 4,
        seatingArea: 'private_dining',
        occasion: 'Executive Board Dinner',
        dietaryNotes: '1 Gluten-Free guest',
        fullName: 'Elena Rostova',
        email: 'elena@rostovagroup.com',
        phone: '+1 (212) 555-1029',
        confirmationCode: 'MN-88319',
        status: 'Confirmed',
        createdAt: '2026-07-25T11:15:00Z',
      },
    ];
  });

  const [isAdminSessionLocked, setIsAdminSessionLocked] = useState<boolean>(() => {
    const lock = localStorage.getItem(ADMIN_LOCK_KEY);
    if (!lock) return false;
    try {
      const parsed = JSON.parse(lock);
      // Expire lock after 2 hours of inactivity
      if (Date.now() - parsed.timestamp > 2 * 60 * 60 * 1000) {
        localStorage.removeItem(ADMIN_LOCK_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations]);

  // Sync with Supabase on mount
  useEffect(() => {
    fetchReservationsFromSupabase().then((remoteReservations) => {
      if (remoteReservations && remoteReservations.length > 0) {
        setReservations((prev) => {
          const map = new Map<string, UserReservation>();
          remoteReservations.forEach((r) => map.set(r.id, r));
          prev.forEach((r) => {
            if (!map.has(r.id)) map.set(r.id, r);
          });
          return Array.from(map.values());
        });
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      saveUserToSupabase(currentUser);
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [currentUser]);

  const loginMember = (email: string, name: string) => {
    const newUser: UserProfile = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      role: 'member',
      membershipTier: 'Gold Patron',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    saveUserToSupabase(newUser);
  };


  const loginAdmin = (password: string) => {
    // Check if another admin session is already active
    const activeLock = localStorage.getItem(ADMIN_LOCK_KEY);
    if (activeLock) {
      try {
        const parsed = JSON.parse(activeLock);
        if (Date.now() - parsed.timestamp < 2 * 60 * 60 * 1000) {
          return {
            success: false,
            message: '⛔ ACCESS DENIED: An active administrator session is already logged into the system console. Simultaneous admin logins are locked to prevent data conflict.',
          };
        }
      } catch {
        // invalid lock format, clear it
      }
    }

    // Default admin password check
    if (password === 'maison2026' || password === 'admin') {
      const lockData = {
        sessionId: 'ADM-SESS-' + Date.now(),
        timestamp: Date.now(),
        adminEmail: 'head.concierge@maisonnoir.com',
      };
      localStorage.setItem(ADMIN_LOCK_KEY, JSON.stringify(lockData));
      setIsAdminSessionLocked(true);

      const adminUser: UserProfile = {
        id: 'ADM-001',
        name: 'Executive Concierge Admin',
        email: 'head.concierge@maisonnoir.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(adminUser);
      return { success: true };
    }

    return { success: false, message: 'Invalid Admin Authorization Passcode.' };
  };

  const loginWithCredentials = (name: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPass = password.trim();

    // Specific Admin Credential Check (Required by Admin)
    const isTargetAdmin =
      cleanEmail === 'mrpratikparajuli@gmail.com' &&
      cleanPass === '123';

    const isTargetAdminByName =
      cleanName.toLowerCase() === 'pratikkas' &&
      cleanPass === '123';

    // Additional fallback admin passwords/emails
    const isAdminPass = cleanPass === 'maison2026' || cleanPass === 'admin';
    const isAdminEmail = cleanEmail.includes('admin') || cleanEmail === 'head.concierge@maisonnoir.com';

    if (isTargetAdmin || isTargetAdminByName || isAdminPass || isAdminEmail) {
      const lockData = {
        sessionId: 'ADM-SESS-' + Date.now(),
        timestamp: Date.now(),
        adminEmail: isTargetAdmin || isTargetAdminByName ? 'mrpratikparajuli@gmail.com' : cleanEmail || 'head.concierge@maisonnoir.com',
      };
      localStorage.setItem(ADMIN_LOCK_KEY, JSON.stringify(lockData));
      setIsAdminSessionLocked(true);

      const adminUser: UserProfile = {
        id: 'ADM-001',
        name: isTargetAdmin || isTargetAdminByName || cleanName ? (cleanName || 'pratikkas') : 'Executive Concierge Admin',
        email: isTargetAdmin || isTargetAdminByName ? 'mrpratikparajuli@gmail.com' : cleanEmail || 'head.concierge@maisonnoir.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(adminUser);
      saveUserToSupabase(adminUser);
      return { success: true, role: 'admin' as const };
    }

    // Standard Member registration/login
    const newUser: UserProfile = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: cleanName || cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'member',
      membershipTier: 'Gold Patron',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    saveUserToSupabase(newUser);
    return { success: true, role: 'member' as const };
  };

  const logout = () => {
    if (currentUser?.role === 'admin') {
      localStorage.removeItem(ADMIN_LOCK_KEY);
      setIsAdminSessionLocked(false);
    }
    setCurrentUser(null);
  };

  const clearAdminLock = () => {
    localStorage.removeItem(ADMIN_LOCK_KEY);
    setIsAdminSessionLocked(false);
  };

  const addReservation = (details: Omit<UserReservation, 'id' | 'status' | 'createdAt'>): UserReservation => {
    const code = 'MN-' + Math.floor(10000 + Math.random() * 90000);
    const newRes: UserReservation = {
      ...details,
      id: code,
      confirmationCode: code,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newRes, ...prev]);
    saveReservationToSupabase(newRes);
    return newRes;
  };

  const cancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Cancelled' } : r))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        reservations,
        loginMember,
        loginAdmin,
        loginWithCredentials,
        logout,
        addReservation,
        cancelReservation,
        isAdminSessionLocked,
        clearAdminLock,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
