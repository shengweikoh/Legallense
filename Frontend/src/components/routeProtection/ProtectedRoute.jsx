import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, getDocs, collection, where } from 'firebase/firestore';
import { FirestoreDB } from '../../firebase/firebase_config';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        const auth = getAuth();

        const checkAuth = async () => {
            setLoading(true);

            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const userQuery = query(collection(FirestoreDB, 'Users'), where('userId', '==', user.uid));
                        const userSnapshot = await getDocs(userQuery);

                        if (userSnapshot.empty) {
                            console.error("User doesn't exist in Firestore.");
                            setAccessDenied(true);  // Deny access if no user is found
                        } else {
                            setAccessDenied(false); // Allow access for 'Users'
                        }
                    } catch (error) {
                        console.error("Error fetching user role:", error);
                        setAccessDenied(true);  // Deny access if there's an error
                    } finally {
                        setLoading(false);
                    }
                } else {
                    // User is not authenticated, redirect to login
                    navigate('/login', { replace: true });
                    setAccessDenied(true);
                    setLoading(false);
                }
            });

            return () => unsubscribe();
        };

        checkAuth();
    }, [navigate]);

    const handleClosePopup = () => {
        setAccessDenied(false);
        setLoading(true);
        navigate(-1); // Go back to the previous route
    };

    if (loading) {
        return null; // Prevent rendering while loading
    }

    return (
        <>
            {accessDenied ? (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Access Denied</h2>
                        <p>You do not have permission to view this page.</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            ) : (
                children // Render children only if access is allowed
            )}
        </>
    );
};

export default ProtectedRoute;
