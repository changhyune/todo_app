import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //파이어 스토어 사용시
import { getStorage } from "firebase/storage"; //스토리지 사용시
//import { getAuth, connectAuthEmulator } from "firebase/auth"; //인증 사용시

// 파이어베이스 Config
const firebaseConfig = {
    apiKey: "AIzaSyC9MyFJqYwYcNtxcfObftBLXu_gcZeAb24",
    authDomain: "todo-f2a04.firebaseapp.com",
    projectId: "todo-f2a04",
    storageBucket: "todo-f2a04.appspot.com",
    messagingSenderId: "485277658880",
    appId: "1:485277658880:web:26f4dc40e92faee3370de5",
    measurementId: "G-QLGH1PPCTL"
  };

// 파이어베이스 앱 초기화/설정 (이미 초기화되어있으면 기존 설정 사용)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 사용할 기능들은 알아보기 쉽게 이름을 지은뒤 export 해서 필요한곳에 사용하자
export const db = getFirestore();
export const storage = getStorage();
//export const auth = getAuth(app);
//connectAuthEmulator(auth, 'http://localhost:9099')
export default app;