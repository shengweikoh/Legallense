import {
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";

import { FirestoreDB } from "./firebase_config";

class FirebaseFirestore {
	// google login add user to firestore
	googleLogin = async function (userID, userDisplayName, userEmail) {
		const docRef = doc(FirestoreDB, "Users", userID);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	};

	//facebook login add user to firestore
	facebookLogin = async function (userID, userDisplayName, userEmail) {
		const docRef = doc(FirestoreDB, "Users", userID);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	};

	// register user to firestore
	register = async function (userID, userDisplayName, userEmail) {
		await setDoc(doc(FirestoreDB, "Users", userID), {
			name: userDisplayName,
			email: userEmail,
		});
		console.log("created user in firestore");
	};
}

const FBInstanceFirestore = new FirebaseFirestore();
export default FBInstanceFirestore;
