import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "../../../firebase/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  getDocs,
  getDoc,
  addDoc, 
  updateDoc,
  setDoc,
  deleteDoc,
  serverTimestamp 
} from "firebase/firestore";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "ID, PW",

            credentials: {
                userid: { label: "Username", type: "text", placeholder: "ID" },
                password: { label: "Password", type: "password", placeholder: "PW" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const userRef = doc(db, "LOGINDB", credentials?.userid);
                const userSnap = await getDoc(userRef); // 데이터 스냅 받아오기 - 비동기처리
                const data = userSnap.data();
                
                if (data["PW"] == credentials?.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    const user = { id: 1, name: credentials?.userid, email: data["name"] }
                    return user
                } else {
                    // If you return null or false then the credentials will be rejected
                    return null
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error("error message") // Redirect to error page
                    // throw "/path/to/redirect"        // Redirect to a URL
                }
            }
        })
    ],
    secret: process.env.SECRET,
})