import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import '../../firebaseConfig';
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Md5 } from "ts-md5";
import { useHistory } from "react-router-dom";
// import {createBros}

const Login:React.FC = () => {
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passRef = useRef<HTMLIonInputElement>(null);
    const db = getFirestore();
    const [user, setUser] = useState<Array<any>>();
    const [toastMessage, setToastMessage] = useState('');
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
        if(user?.find(x => x.email == enteredEmail) && user.find(x => x.pass == hashedPass)){
            localStorage.setItem("loginEmail", enteredEmail!)
            setToastMessage('Login Berhasil')
            history.push('/home')
        }else{
            setToastMessage('Email atau Password salah')
        }
    }
    return(
        <IonPage>
            <IonToast isOpen={!! toastMessage}
                      message={toastMessage}
                      duration={1000}
                      onDidDismiss={() => setToastMessage('')}
                    />
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Healthu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="email" ref={emailRef}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" ref={passRef}/>
                </IonItem>
                <IonButton onClick={loginHandler} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
                    Login
                </IonButton>
                <p style={{ textAlign:'center' }}>Doesn't have an account yet? <br/><a href="/register">Register here</a></p>
            </IonContent>
        </IonPage>
    )
}

export default Login;