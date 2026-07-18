import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Shared DB keys for state tracking
const DB_KEYS = [
  "users", "drivers", "vehicles", "products", "activeAssets", 
  "audits", "vales", "returnForecasts", "fiscalAlerts", 
  "importedRoutes", "audit_logs"
];

let firestoreInstance: any = null;

// Determine if we should connect directly to Firestore from the browser
export function isClientFirebaseActive(): boolean {
  if (typeof window === "undefined") return false;
  
  // GitHub Pages hosting is purely static, so we MUST connect directly to Firebase
  const isGitHub = window.location.hostname.includes("github.io") || 
                   window.location.hostname.includes("github.com") ||
                   window.location.href.includes("github");
                   
  return isGitHub;
}

// Get or initialize the direct client Firestore instance
export function getClientFirestore() {
  if (firestoreInstance) return firestoreInstance;
  
  try {
    if (
      !firebaseConfig.projectId || 
      firebaseConfig.projectId === "remixed-project-id" ||
      firebaseConfig.projectId.includes("placeholder")
    ) {
      console.warn("[ClientFirebase] Configuração de Firebase vazia ou placeholder. Conexão direta ignorada.");
      return null;
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestoreInstance = initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId || undefined);
    console.log("[ClientFirebase] Conexão direta com Firestore inicializada com sucesso!");
    return firestoreInstance;
  } catch (err) {
    console.warn("[ClientFirebase] Erro ao inicializar conexão direta com o Firestore:", err);
    return null;
  }
}

// Helper to chunk large arrays to prevent exceeding Firestore 1MB document limit
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Fetch all database records directly from Firebase Firestore (client-side SPA fallback)
export async function fetchDirectlyFromFirestore(): Promise<any> {
  const db = getClientFirestore();
  if (!db) return null;

  console.log("[ClientFirebase] Buscando dados diretamente do Firestore...");
  const combinedDb: any = {};

  try {
    const promises = DB_KEYS.map(async (key) => {
      const docRef = doc(db, "app_state", key);
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const docData = snap.data();
          if (docData && docData.chunkCount !== undefined) {
            const chunkCount = docData.chunkCount;
            const chunks: any[] = [];
            const chunkPromises = [];

            for (let i = 0; i < chunkCount; i++) {
              const chunkDocRef = doc(db, "app_state", `${key}_chunk_${i}`);
              const chunkPromise = getDoc(chunkDocRef).then((chunkSnap) => {
                if (chunkSnap.exists()) {
                  chunks[i] = chunkSnap.data().data || [];
                } else {
                  chunks[i] = [];
                }
              }).catch((chunkErr) => {
                console.warn(`[ClientFirebase] Erro ao carregar chunk ${i} de ${key}:`, chunkErr);
                chunks[i] = [];
              });
              chunkPromises.push(chunkPromise);
            }

            await Promise.all(chunkPromises);
            combinedDb[key] = chunks.flat();
          } else if (docData && docData.data !== undefined) {
            combinedDb[key] = docData.data;
          } else {
            combinedDb[key] = docData;
          }
        }
      } catch (err) {
        console.warn(`[ClientFirebase] Erro ao ler documento '${key}' do Firestore:`, err);
      }
    });

    await Promise.all(promises);
    return combinedDb;
  } catch (e) {
    console.error("[ClientFirebase] Falha crítica ao ler do Firestore diretamente:", e);
    return null;
  }
}

// Save database state directly to Firebase Firestore (client-side SPA fallback)
export async function saveDirectlyToFirestore(payload: any): Promise<boolean> {
  const db = getClientFirestore();
  if (!db) return false;

  console.log("[ClientFirebase] Sincronizando alterações diretamente com o Firestore...");

  try {
    const promises = Object.keys(payload).map(async (key) => {
      if (!DB_KEYS.includes(key)) return;

      const docRef = doc(db, "app_state", key);
      const array = payload[key] || [];

      if (Array.isArray(array)) {
        const chunks = chunkArray(array, 500);

        // Get old chunk count to delete orphaned chunks
        let oldChunkCount = 0;
        try {
          const controlSnap = await getDoc(docRef);
          if (controlSnap.exists()) {
            oldChunkCount = controlSnap.data().chunkCount || 0;
          }
        } catch (e) {
          // Ignore
        }

        // Save new chunks
        const chunkPromises = chunks.map(async (chunk, i) => {
          const chunkDocRef = doc(db, "app_state", `${key}_chunk_${i}`);
          await setDoc(chunkDocRef, { data: chunk });
        });
        await Promise.all(chunkPromises);

        // Save control document
        await setDoc(docRef, { chunkCount: chunks.length });

        // Clean up old chunks
        if (oldChunkCount > chunks.length) {
          const deletePromises = [];
          for (let i = chunks.length; i < oldChunkCount; i++) {
            const obsoleteDocRef = doc(db, "app_state", `${key}_chunk_${i}`);
            deletePromises.push(deleteDoc(obsoleteDocRef).catch(() => {}));
          }
          await Promise.all(deletePromises);
        }
      } else {
        await setDoc(docRef, array);
      }
    });

    await Promise.all(promises);
    console.log("[ClientFirebase] Alterações persistidas no Firestore com sucesso!");
    return true;
  } catch (e) {
    console.error("[ClientFirebase] Falha ao persistir alterações no Firestore:", e);
    return false;
  }
}
