import { auth, db } from "@/configs/FirebaseConfig";
import { omitUndefinedNullDeep } from "@/helpers/object";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export type DateRange = { start?: string; end?: string };

export type Activity = {
  id: string;
  name: string;
  days?: number;
};

export type Trip = {
  id?: string;
  title?: string;
  destination: string;
  range?: DateRange;
  adults?: number;
  children?: number;
  notes?: string;
  activities?: Activity[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

const tripsCol = (uid: string) => collection(db, "users", uid, "trips");
const tripDoc = (uid: string, tripId: string) =>
  doc(db, "users", uid, "trips", tripId);

const requireUid = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not signed in");
  return uid;
};

/** CREATE */
export const createTrip = async (
  data: Omit<Trip, "id" | "createdAt" | "updatedAt">
) => {
  const uid = requireUid();
  const ref = await addDoc(tripsCol(uid), {
    ...omitUndefinedNullDeep(data),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

/** READ (one) */
export const getTrip = async (tripId: string): Promise<Trip | null> => {
  const uid = requireUid();
  const snap = await getDoc(tripDoc(uid, tripId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Trip) };
};

/** READ (list, newest first) */
export const listTrips = async (): Promise<Trip[]> => {
  const uid = requireUid();
  const q = query(tripsCol(uid), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Trip) }));
};

/** UPDATE (partial) */
export const updateTrip = async (tripId: string, patch: Partial<Trip>) => {
  const uid = requireUid();
  await updateDoc(tripDoc(uid, tripId), {
    ...omitUndefinedNullDeep(patch),
    updatedAt: serverTimestamp(),
  });
};

/** DELETE */
export const deleteTrip = async (tripId: string) => {
  const uid = requireUid();
  await deleteDoc(tripDoc(uid, tripId));
};
