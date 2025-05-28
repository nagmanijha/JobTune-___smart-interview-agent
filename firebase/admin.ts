import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// // Initialize Firebase Admin SDK
// function initFirebaseAdmin() {
//   const apps = getApps();

//   if (!apps.length) {
//     initializeApp({
//       credential: cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         // Replace newlines in the private key
//         privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//       }),
//     });
//   }

//   return {
//     auth: getAuth(),
//     db: getFirestore(),
//   };
// }

// export const { auth, db } = initFirebaseAdmin();

function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    console.log("🔐 Firebase env check:", {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKeyPresent: !!process.env.FIREBASE_PRIVATE_KEY,
    });

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  const auth = getAuth();
  const db = getFirestore();

  console.log("🧪 Firebase Admin initialized:", { authOK: !!auth, dbOK: !!db });

  return { auth, db };
}

export const { auth, db } = initFirebaseAdmin();
