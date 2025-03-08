import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, getDocs, collection, where } from 'firebase/firestore';
import { FirestoreDB } from '../../firebase/firebase_config';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.warn("User not authenticated, redirecting...");
                setAccessDenied(true);
                setLoading(false);
                return;
            }

            try {
                const userQuery = query(collection(FirestoreDB, 'Users'), where('userId', '==', user.uid));
                const userSnapshot = await getDocs(userQuery);

                if (userSnapshot.empty) {
                    console.error("User not found in Firestore.");
                    setAccessDenied(true);
                } else {
                    setAccessDenied(false);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                setAccessDenied(true);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    useEffect(() => {
        if (accessDenied && !loading) {
            navigate('/login', { replace: true });
        }
    }, [accessDenied, loading, navigate]);

    const handleClosePopup = () => {
        setAccessDenied(false);
        navigate(-1); // Go back to previous route
    };

    if (loading) {
        return <div className="loading-screen">Loading...</div>; // Display loading UI
    }

    if (accessDenied) {
        return (
            <div className="popup">
                <div className="popup-content">
                    <h2>Access Denied</h2>
                    <p>You do not have permission to view this page.</p>
                    <button onClick={handleClosePopup}>Close</button>
                </div>
            </div>
        );
    }

    return <Outlet />; // Correctly render nested routes
};

export default ProtectedRoute;
