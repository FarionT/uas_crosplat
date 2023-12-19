import { IonButton, IonCard, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import '../../firebaseConfig';
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { Md5 } from "ts-md5";
import '../../firebaseConfig';
import { useHistory } from "react-router-dom";
import logo from "../../images/logo-no-background.png";
import "./Register.css";

const Register:React.FC = () => {
    const db = getFirestore();
    const history = useHistory();

    const namaRef = useRef<HTMLIonInputElement>(null);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passRef = useRef<HTMLIonInputElement>(null);

    const [toastMessage, setToastMessage] = useState('');

    // BUAT MASUKIN FOTO
    // const registerData = async() => {
    //     const fileName = new Date().getTime() + '.jpeg';
    //     const photoBlob = await fetch(takenPhoto!.preview).then((res) => res.blob());
    //     const storageRef = ref(storage, fileName);
    //     uploadBytes(storageRef, photoBlob as Blob).then((snapshot)=>{
    //       console.log('upload file success');
    //       getDownloadURL(ref(storage, fileName)).then((url)=>{
    //         addMemoryHandler(url);
    //       })
    //     })
    //   }
    const [user, setUser] = useState<Array<any>>();
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
    // BUAT MASUKIN DATA KE FIREBASE
    const registerData = async() => {
        
        const enteredNama = namaRef.current?.value;
        const enteredEmail = emailRef.current?.value?.toString();
        if(user?.find(x => x.email == enteredEmail)){
            setToastMessage('Email tersebut telah digunakan')
            return;
        }
        const enteredPass = passRef.current?.value;
        const hashedPass = Md5.hashStr(enteredPass?.toString());
        if(!enteredNama || enteredNama.toString().trim().length === 0 || !enteredEmail || enteredEmail.toString().trim().length === 0 ||
        !enteredPass || enteredPass.toString().trim().length === 0 ){
            setToastMessage('Masukkan data dengan lengkap!')
            return;
        }else{
            try{
                const docRef = await addDoc(collection(db, "users"), {
                  nama: enteredNama!.toString(),
                  email: enteredEmail,
                  pass: hashedPass
                });
                console.log("Document written with ID: ", docRef.id);
                localStorage.setItem("loginEmail", enteredEmail);
                history.push('/register-data')
                }catch(e){
                  console.log("error adding document", e);
            }
        }
    }


    return(
        <IonPage>
            <IonToast isOpen={!!toastMessage}
                      message={toastMessage}
                      duration={2000}
                      onDidDismiss={() => setToastMessage('')}>

            </IonToast>
            <IonContent color="light">
                <IonImg className="logoRegister" src={logo} alt="Healthu" />
                <IonCard >
                    <IonItem color="tertiary">
                        <IonLabel position="floating">Nama</IonLabel>
                        <IonInput type="text" ref={namaRef}/>
                    </IonItem>
                    <IonItem color="tertiary">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput type="email" ref={emailRef}/>
                    </IonItem>
                    <IonItem color="tertiary">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" ref={passRef}/>
                    </IonItem>
                </IonCard>
                <IonButton color="secondary" onClick={registerData} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px'}}>
                        <IonLabel>Register</IonLabel>
                </IonButton>
                <p style={{ textAlign:'center' }}>Already have an account? <br/><a href="/">Login here</a></p>
            </IonContent>
        </IonPage>
    )
}

export default Register;