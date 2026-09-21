import type { Parcel, HistoryEntry } from './types';

export const STUDENT_ID = '248';

export function getSeedParcels(): Parcel[] {
  return [
    {
      id: 'amz-90214',
      courier: 'Amazon',
      ref: 'AMZ-90214',
      item: 'Replacement Laptop Charger',
      weightKg: 2.4,
      urgentLabel: 'lab gear',
      status: 'shelved',
      gate: 1,
      gateName: 'Main Gate',
      bin: 'B-3',
      post: 'Security Post 1',
      otp: '4829',
      otpExpiresAt: null,
      intakeAt: '11:22 AM',
      retrievedAt: '11:42 AM',
      notifyOn: false,
    },
    {
      id: 'fkt-55021',
      courier: 'Flipkart',
      ref: 'FKT-55021',
      item: 'Milton Thermosteel Flip Lid Flask, 1000 ml (Pack of 2)',
      weightKg: 1.6,
      status: 'unboxing',
      gate: 1,
      gateName: 'Main Gate',
      bin: null,
      post: 'Security Post 1',
      otp: null,
      otpExpiresAt: null,
      intakeAt: null,
      retrievedAt: '12:10 PM',
      notifyOn: false,
    },
    {
      id: 'myn-30871',
      courier: 'Myntra',
      ref: 'MYN-30871',
      item: 'Roadster Men Oversized Hooded Sweatshirt, Size L',
      weightKg: 0.8,
      status: 'shelved',
      gate: 2,
      gateName: 'Hostel Quad',
      bin: 'D-1',
      post: 'Security Post 2',
      otp: '7104',
      otpExpiresAt: null,
      intakeAt: '11:31 AM',
      retrievedAt: '12:25 PM',
      notifyOn: false,
      walk: { meters: 650, minutes: 8, note: 'across quad' },
    },
  ];
}

export function getSeedHistory(): HistoryEntry[] {
  return [
    {
      courier: 'Flipkart',
      ref: 'FKT-20418',
      item: 'Wooden Study Desk Lamp with Wireless Charger',
      collected: 'Sat 12 Sep, 4:10 PM',
      gate: 1,
      bin: 'A-2',
    },
    {
      courier: 'Amazon',
      ref: 'AMZ-88763',
      item: 'Atomic Habits Paperback',
      collected: 'Tue 8 Sep, 6:45 PM',
      gate: 1,
      bin: 'C-4',
    },
    {
      courier: 'Myntra',
      ref: 'MYN-27390',
      item: "Puma Men's Running Shoes, UK 9",
      collected: 'Fri 4 Sep, 1:15 PM',
      gate: 2,
      bin: 'D-3',
    },
    {
      courier: 'Amazon',
      ref: 'AMZ-85519',
      item: 'Cello Ball Pens, Pack of 50',
      collected: 'Mon 31 Aug, 5:30 PM',
      gate: 1,
      bin: 'B-1',
    },
  ];
}
