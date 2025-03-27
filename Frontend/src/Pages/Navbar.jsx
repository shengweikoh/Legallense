import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Animation/LegalLense.png";
import { useNavigate } from "react-router-dom";
import {
  AppWindow,
  HandCoins,
  Handshake,
  GavelIcon,
  HistoryIcon,
  UploadIcon,
  HomeIcon,
  Home,
  CircleUserRound,
} from "lucide-react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FBInstanceAuth from "../firebase/firebase_auth";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FirestoreDB } from "../firebase/firebase_config";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [freeUpgrade, setFreeUpgrade] = useState(null);
  const auth = getAuth();

  const theme = createTheme({
      palette: {
        primary: {
          main: '#000000', // black primary color
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#ffffff', // white secondary color
          contrastText: '#000000',
        },
        background: {
          default: '#ffffff',
          paper: '#f7f7f7'
        },
      },
    });

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAction = () => {
    if (user && user.uid) {
        navigator.clipboard.writeText(user.uid)
            .then(() => {
                console.log("User UID copied to clipboard!");                
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    }
};

  const isHome = location.pathname === "/" || location.pathname === "/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(FirestoreDB, "Users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists) {
          setFreeUpgrade(docSnap.data().freeUpgrade);
        } else {
          setFreeUpgrade("N/A");
        }
      } else {
        setUser(null);
        setFreeUpgrade(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await FBInstanceAuth.logout(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <HomeIcon style={{ marginRight: "10px" }} /> LegaLens.
        </Link>

        {isHome ? (
          <div className="button-container">
            <Link to="/home">
              <button className="upload">
                <AppWindow /> Dashboard
              </button>
            </Link>

            {user ? (
              <button className="logout" onClick={handleLogout}>
                <CircleUserRound /> Logout
              </button>
            ) : (
              /* ✅ If no user, show Login button */
              <Link to="/login">
                <button className="login">
                  <CircleUserRound /> Login
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="info-container">

            <ThemeProvider theme={theme}>
                <Button className="info-text" onClick={handleOpen} sx = {{textTransform: 'capitalize'}}>
                    <Handshake className="handshake"></Handshake>Refer a Friend
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-content'
                > 
                    <DialogTitle id = 'dialog-title' sx = {{fontWeight: 'bold'}}>
                        Both you and your friend will get 1 free upgrade if they use your referral code when signing up!
                    </DialogTitle >

                    <DialogContent>
                        <DialogContentText id = 'dialog-content'>
                           Your referral code: {user?.uid || "Loading..."}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button variant='contained' onClick={handleAction} sx={{ textTransform: 'capitalize'}}>
                            Copy to clipboard
                        </Button>
                        <Button variant='outlined' onClick = {handleClose} sx={{ textTransform: 'capitalize'}}>
                            Go back
                        </Button>

                    </DialogActions>
                </Dialog>

            </ThemeProvider>


            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-content'
                > 
                    <DialogTitle id = 'dialog-title' sx = {{fontWeight: 'bold'}}>
                        Both you and your friend will get 1 free upgrade if they use your referral code when signing up!
                    </DialogTitle >

                    <DialogContent>
                        <DialogContentText id = 'dialog-content'>
                           Your referral code: {user?.uid || "Loading..."}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button variant='contained' onClick={handleAction} sx={{ textTransform: 'capitalize'}}>
                            Copy to clipboard
                        </Button>
                        <Button variant='outlined' onClick = {handleClose} sx={{ textTransform: 'capitalize'}}>
                            Go back
                        </Button>

                    </DialogActions>
                </Dialog>

            <span className="info-text">
              <HandCoins className="handcoin"></HandCoins>Free Upgrade:{" "}
              {freeUpgrade != null ? freeUpgrade : "Loading..."}{" "}
            </span>
            {user ? (
              <button className="logout" onClick={handleLogout}>
                <CircleUserRound /> Logout
              </button>
            ) : (
              /* ✅ If no user, show Login button */
              <Link to="/login">
                <button className="login">
                  <CircleUserRound /> Login
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
