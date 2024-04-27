import { getDatabase, ref, get, set, push } from "firebase/database";

import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { userActions } from "./user-slice";

const auth = getAuth();
const database = getDatabase(app);
export const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated");
    return null;
  }

  try {
    const snapshot = await get(ref(database, `users/${user.uid}`));
    const userData = snapshot.val();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
};

export const addReservationForUser = (reservationData) => {
  return async (dispatch) => {
    const user = auth.currentUser;

    try {
      const { villa, guests, dateFrom, dateTo } = reservationData;
      const reservationsRef = ref(database, `users/${user.uid}/reservations`);
      const newReservationRef = push(reservationsRef);
      await set(newReservationRef, {
        villa,
        guests,
        dateFrom,
        dateTo,
      });

      dispatch(userActions.reviewSuccess(reservationData));
    } catch (error) {
      dispatch(userActions.reviewFailure(error.message));
    }
  };
};