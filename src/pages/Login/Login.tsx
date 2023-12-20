import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import '../../firebaseConfig';
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Md5 } from "ts-md5";
import { useHistory } from "react-router-dom";
import logo from "../../images/logo-no-background.png";
import "./Login.css";
// import {createBros}

const Login:React.FC = () => {
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passRef = useRef<HTMLIonInputElement>(null);
    const db = getFirestore();
    const [user, setUser] = useState<Array<any>>();
    const [toastMessage, setToastMessage] = useState('');
    const [currUser, setCurrUser] = useState(null);
    const history = useHistory();

    // BUAT AMBIL DATA USER DARI FIREBASE
    useEffect(()=>{
        async function getData(){
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log('querySnapshot: ', querySnapshot);
        setUser(querySnapshot.docs.map((doc)=>( {...doc.data(), id:doc.id})));
    
        querySnapshot.forEach((doc)=>{
            console.log(`${doc.id}=> ${doc.data()}`);
            console.log('doc: ', doc);
        })
        }
    
        getData()
    }, []);

    // BUAT HANDLE LOGIN
    const loginHandler = () => {
        const enteredEmail = emailRef.current?.value?.toString();
        const enteredPass = passRef.current?.value;
        const hashedPass = Md5.hashStr(enteredPass?.toString);
        console.log("email" + enteredEmail);
        // untuk mengecek apakah email dan password sudah terisi atau tidak
        // setCurrUser(user?.find(x => x.email == enteredEmail));
        if(enteredEmail != "" && enteredPass != ""){
            console.log(currUser?.email);
            if(user?.find(x => x.email == enteredEmail) != undefined || user?.find(x => x.email == enteredEmail) != null){
                if(user?.find(x => x.email == enteredEmail).email == enteredEmail && user?.find(x => x.email == enteredEmail).pass == hashedPass){
                    console.log("masuk");
                    localStorage.setItem("loginEmail", enteredEmail!);
                    setToastMessage('Login Berhasil');
                    history.push('/home');
                }else{
                    setToastMessage('Email atau Password salah');
                }
            }else{
                setToastMessage('Email atau Password salah')
            }
        }else{
            setToastMessage('Masukkan data dengan benar!')
        }
    
    }
    return(
        <IonPage>
            <IonToast isOpen={!! toastMessage}
                      message={toastMessage}
                      duration={1000}
                      onDidDismiss={() => setToastMessage('')}
                    />
            <IonContent color="light">
                <IonImg className="logoLogin" src={logo} alt="Healthu" />
                <IonItem color="light">
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="email" ref={emailRef} required/>
                </IonItem>
                <IonItem color="light">
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" ref={passRef} required/>
                </IonItem>
                <IonButton onClick={loginHandler} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
                    Login
                </IonButton>
                <p style={{ textAlign:'center' }}>Doesn't have an account yet? <br/><a href="/register">Register here</a></p>
            </IonContent>
        </IonPage>
    )
}

export default Login;