import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
} from "firebase/auth";

class FirebaseAuthentication {
	getAuth() {
		return getAuth();
	}

	//handle user login with email and password
    async login(auth, email, password) {
        let errorCode = null;
        let data = null;
        try {
            data = await signInWithEmailAndPassword(auth, email, password);
            console.log("login success", data);
        } catch (error) {
            console.error("login error", error);
            errorCode = 1001;
        }
        return { data, errorCode };
    }

	// handle user login with google
	async googleLogin(auth) {
		let errorCode = null;
		let data = null;
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			data = result.user;
			console.log("google login success", result);
		} catch (error) {
			console.error("google login error", error);
			errorCode = error.code;
		}
		return {data, errorCode};
	}

	//handle user login with facebook
	async facebookLogin(auth) {
		let errorCode = null;
		let data = null;
		const provider = new FacebookAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			data = result.user;
			console.log("facebook login success", result);
		} catch (error) {
			console.error("facebook login error", error);
			errorCode = error.code;
		}
		return {data, errorCode};
	}
	
	// handle logout
	logout = function (auth) {
		signOut(auth)
			.then(() => {
				console.log("logout success");
			})
			.catch((error) => {
				console.error("logout error", error);
			});
	};

	// handle user registration
	register = async function (auth, email, password) {
		let errorCode = null;
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				console.log("register success", userCredentials);
			})
			.catch((error) => {
				console.error("register error", error);
				errorCode = error.code;
			});
		return errorCode;
	};
}

const FBInstanceAuth = new FirebaseAuthentication();
export default FBInstanceAuth;