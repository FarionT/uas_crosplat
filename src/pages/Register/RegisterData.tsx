import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToast, IonToolbar } from "@ionic/react"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import '../../firebaseConfig'

const RegisterData:React.FC = () => {
    const db = getFirestore();
    const history = useHistory();

    const bbRef = useRef<HTMLIonInputElement>(null);
    const tbRef = useRef<HTMLIonInputElement>(null);
    const tingkatRef = useRef<HTMLIonRadioGroupElement>(null);
    const genderInputRef = useRef<HTMLIonRadioGroupElement>(null);

    const [toastMessage, setToastMessage] = useState('');
    

    const addDataHandler = async() => {
        const enteredBb = bbRef.current?.value;
        const enteredTb = tbRef.current?.value;
        const enteredTingkat = tingkatRef.current?.value;
        const enteredGender = genderInputRef.current?.value;
        console.log(enteredBb, enteredTb, enteredTingkat, enteredGender);

        if(!enteredBb || enteredBb.toString().trim().length === 0 || !enteredTb || enteredTb.toString().trim().length === 0 ||
        !enteredTingkat || enteredTingkat.toString().trim().length === 0 || !enteredGender || enteredGender.toString().trim().length === 0 ){
            setToastMessage('Masukkan data dengan lengkap!')
            return;
        }else{
            try{
                const docRef = await addDoc(collection(db, "users-data"), {
                  email: localStorage.getItem("loginEmail"),
                  bb: enteredBb,
                  tb: enteredTb,
                  tingkat: enteredTingkat,
                  gender: enteredGender
                });
                // console.log("Document written with ID: ", docRef.id);
                history.push("/catatan", docRef.id)
                }catch(e){
                  console.log("error adding document", e);
            }
        }
    }
    useEffect(()=>{
        const logged = localStorage.getItem("loginEmail");
        console.log(logged)
        if(logged == null || logged == ''){
            history.push('/')
        }
    })
    return(
        <IonPage>
            <IonPage>
            <IonToast isOpen={!! toastMessage}
                      message={toastMessage}
                      duration={2000}
                      onDidDismiss={() => setToastMessage('')}
                    />
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Judul App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Berat Badan (kg)</IonLabel>
                    <IonInput type="number" ref={bbRef}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
                    <IonInput type="number" ref={tbRef}/>
                </IonItem>
                <IonItem>
                    <IonLabel position='floating'>Tingkat Aktivitas</IonLabel>
                    <br/><br/>
                    <IonRadioGroup ref={tingkatRef}>
                        <IonItem>
                            <IonRadio slot="start" value="1"></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Kurang Aktif</b><br/>
                                Jika anda sangat jarang berolahraga atau tidak sama sekali.
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonRadio slot="start" value={2}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Aktif Ringan</b><br/>
                                Jika anda berolahraga ringan selama satu hingga tiga hari dalam seminggu.
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonRadio slot="start" value={3}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Cukup Aktif</b><br/>
                                Jika anda berolahraga dengan intensitas sedang sekitar tiga hingga lima hari dalam seminggu.
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonRadio slot="start" value={4}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Sangat Aktif</b><br/>
                                Jika anda berolahraga dengan intensitas berat selama enam hingga tujuh hari dalam seminggu.
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonRadio slot="start" value={5}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Ekstra Aktif</b><br/>
                                Jika anda berolahraga dengan intensitas berat selama enam hingga tujuh hari dalam seminggu atau melakukan
                                pekerjaan fisik yang ekstra dan membutuhkan stamina dan fisik kuat.
                            </IonLabel>
                        </IonItem>
                    </IonRadioGroup>
                </IonItem>
                <IonItem>
                    <IonLabel position='floating'>Gender</IonLabel>
                    <br/>
                    <IonRadioGroup ref={genderInputRef}>
                        <IonRow>
                            <IonCol>
                                <IonRadio value="male" labelPlacement="end">Laki-laki</IonRadio><br />
                            </IonCol>
                            <IonCol>
                                <IonRadio value="female" labelPlacement="end">Perempuan</IonRadio><br />
                            </IonCol>
                        </IonRow>
                    </IonRadioGroup>
                </IonItem>
                <IonButton onClick={addDataHandler}>
                    Finish
                </IonButton>
                {/* <p style={{ textAlign:'center' }}>Doesn't have an account yet? <br/><a href="/register">Register here</a></p> */}
            </IonContent>
        </IonPage>
        </IonPage>
    )
}

export default RegisterData;