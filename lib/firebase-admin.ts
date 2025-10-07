// Firebase Admin SDK - tylko dla serwera
let adminAuth: any = null
let app: any = null

if (typeof window === 'undefined') {
  // Tylko na serwerze
  try {
    const { cert, getApps, initializeApp } = require('firebase-admin/app')
    const { getAuth } = require('firebase-admin/auth')

    const firebaseAdminConfig = {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    }

    // Initialize Firebase Admin
    app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0]
    adminAuth = getAuth(app)
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error)
  }
}

export { adminAuth, app }
