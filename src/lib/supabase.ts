import { createClient } from '@supabase/supabase-js';
import { UserProfile, UserReservation } from '../types';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://bwynnekhktyfnxozwnih.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_YVvHPTim4rFbTrQih6Gtcg_X_yHXouf';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Save / sync user details to Supabase backend table 'users'
 */
export async function saveUserToSupabase(user: UserProfile): Promise<void> {
  try {
    const payload = {
      user_id: user.id,
      full_name: user.name,
      email: user.email,
      role: user.role,
      membership_tier: user.membershipTier || 'Gold Patron',
      created_at: user.createdAt || new Date().toISOString(),
    };

    const { error } = await supabase
      .from('users')
      .upsert(payload, { onConflict: 'email' });

    if (error) {
      console.warn('Supabase users insert notice:', error.message);
      try {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: user.name,
          email: user.email,
          role: user.role,
          updated_at: new Date().toISOString(),
        });
      } catch {
        // ignore fallback error
      }
    }
  } catch (err) {
    console.warn('Error saving user to Supabase:', err);
  }
}

/**
 * Save / sync table reservation to Supabase backend table 'reservations'
 */
export async function saveReservationToSupabase(reservation: UserReservation): Promise<void> {
  try {
    const payload = {
      confirmation_code: reservation.confirmationCode || reservation.id,
      full_name: reservation.fullName,
      email: reservation.email,
      phone: reservation.phone,
      reservation_date: reservation.date,
      reservation_time: reservation.time,
      guests: reservation.guests,
      seating_area: reservation.seatingArea,
      occasion: reservation.occasion || 'Dining',
      dietary_notes: reservation.dietaryNotes || '',
      status: reservation.status || 'Confirmed',
      created_at: reservation.createdAt || new Date().toISOString(),
    };

    const { error } = await supabase
      .from('reservations')
      .insert([payload]);

    if (error) {
      console.warn('Supabase reservations insert notice:', error.message);
    }
  } catch (err) {
    console.warn('Error saving reservation to Supabase:', err);
  }
}

/**
 * Fetch reservations from Supabase backend
 */
export async function fetchReservationsFromSupabase(): Promise<UserReservation[] | null> {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return null;
    }

    return data.map((row: any) => ({
      id: row.confirmation_code || row.id,
      confirmationCode: row.confirmation_code || row.id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      date: row.reservation_date || row.date,
      time: row.reservation_time || row.time,
      guests: row.guests,
      seatingArea: row.seating_area || row.seatingArea || 'main_hall',
      occasion: row.occasion,
      dietaryNotes: row.dietary_notes || row.dietaryNotes,
      status: row.status || 'Confirmed',
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.warn('Error fetching reservations from Supabase:', err);
    return null;
  }
}

export interface VoucherRecord {
  id?: string;
  voucher_code: string;
  user_email: string;
  user_password?: string;
  recipient_name: string;
  amount: number;
  message: string;
  card_theme: string;
  created_at?: string;
}

export interface ContactMessageRecord {
  id?: string;
  full_name?: string;
  email: string;
  message: string;
  created_at?: string;
}

export interface EventInquiryRecord {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  target_date: string;
  guests: string;
  room_name: string;
  notes?: string;
  status?: string;
  created_at?: string;
}

/**
 * Fetch registered users from Supabase backend
 */
export async function fetchUsersFromSupabase(): Promise<UserProfile[] | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return null;
    }

    return data.map((row: any) => ({
      id: row.user_id || row.id,
      name: row.full_name,
      email: row.email,
      role: row.role || 'member',
      membershipTier: row.membership_tier || 'Gold Patron',
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.warn('Error fetching users from Supabase:', err);
    return null;
  }
}

/**
 * Save digital voucher to Supabase table 'vouchers'
 */
export async function saveVoucherToSupabase(voucher: VoucherRecord): Promise<void> {
  try {
    const payload = {
      voucher_code: voucher.voucher_code,
      user_email: voucher.user_email,
      user_password: voucher.user_password || '',
      recipient_name: voucher.recipient_name,
      amount: voucher.amount,
      message: voucher.message,
      card_theme: voucher.card_theme,
      created_at: voucher.created_at || new Date().toISOString(),
    };

    const { error } = await supabase.from('vouchers').insert([payload]);
    if (error) {
      console.warn('Supabase vouchers insert notice:', error.message);
    }
  } catch (err) {
    console.warn('Error saving voucher to Supabase:', err);
  }
}

/**
 * Fetch digital vouchers from Supabase table 'vouchers'
 */
export async function fetchVouchersFromSupabase(): Promise<VoucherRecord[] | null> {
  try {
    const { data, error } = await supabase
      .from('vouchers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return null;
    }

    return data.map((row: any) => ({
      id: row.id,
      voucher_code: row.voucher_code || row.code,
      user_email: row.user_email || row.email,
      user_password: row.user_password || row.password,
      recipient_name: row.recipient_name,
      amount: row.amount,
      message: row.message,
      card_theme: row.card_theme || row.theme || 'noir',
      created_at: row.created_at,
    }));
  } catch (err) {
    console.warn('Error fetching vouchers from Supabase:', err);
    return null;
  }
}

/**
 * Save contact message to Supabase table 'messages'
 */
export async function saveContactMessageToSupabase(msg: ContactMessageRecord): Promise<void> {
  try {
    const payload = {
      full_name: msg.full_name || 'Guest',
      email: msg.email,
      message: msg.message,
      created_at: msg.created_at || new Date().toISOString(),
    };

    const { error } = await supabase.from('messages').insert([payload]);
    if (error) {
      console.warn('Supabase messages insert notice:', error.message);
    }
  } catch (err) {
    console.warn('Error saving contact message to Supabase:', err);
  }
}

/**
 * Fetch contact messages from Supabase table 'messages'
 */
export async function fetchContactMessagesFromSupabase(): Promise<ContactMessageRecord[] | null> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return null;
    }

    return data.map((row: any) => ({
      id: row.id,
      full_name: row.full_name || row.name,
      email: row.email,
      message: row.message,
      created_at: row.created_at,
    }));
  } catch (err) {
    console.warn('Error fetching contact messages from Supabase:', err);
    return null;
  }
}

/**
 * Save event inquiry to Supabase table 'event_inquiries'
 */
export async function saveEventInquiryToSupabase(inquiry: EventInquiryRecord): Promise<void> {
  try {
    const payload = {
      full_name: inquiry.full_name,
      email: inquiry.email,
      phone: inquiry.phone,
      target_date: inquiry.target_date,
      guests: inquiry.guests,
      room_name: inquiry.room_name,
      notes: inquiry.notes || '',
      status: inquiry.status || 'Pending',
      created_at: inquiry.created_at || new Date().toISOString(),
    };

    const { error } = await supabase.from('event_inquiries').insert([payload]);
    if (error) {
      console.warn('Supabase event_inquiries insert notice:', error.message);
    }
  } catch (err) {
    console.warn('Error saving event inquiry to Supabase:', err);
  }
}

/**
 * Fetch event inquiries from Supabase table 'event_inquiries'
 */
export async function fetchEventInquiriesFromSupabase(): Promise<EventInquiryRecord[] | null> {
  try {
    const { data, error } = await supabase
      .from('event_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return null;
    }

    return data.map((row: any) => ({
      id: row.id,
      full_name: row.full_name || row.name,
      email: row.email,
      phone: row.phone,
      target_date: row.target_date || row.date,
      guests: row.guests,
      room_name: row.room_name || row.room,
      notes: row.notes || row.message,
      status: row.status || 'Pending',
      created_at: row.created_at,
    }));
  } catch (err) {
    console.warn('Error fetching event inquiries from Supabase:', err);
    return null;
  }
}

/**
 * Update event inquiry status in Supabase table 'event_inquiries'
 */
export async function updateEventInquiryStatusInSupabase(id: string, status: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('event_inquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.warn('Supabase event_inquiries update notice:', error.message);
    }
  } catch (err) {
    console.warn('Error updating event inquiry in Supabase:', err);
  }
}

