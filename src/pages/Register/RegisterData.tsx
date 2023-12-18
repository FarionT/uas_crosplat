import { IonButton, IonCol, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToast, IonToolbar } from "@ionic/react"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import '../../firebaseConfig'
import logo from '../../images/logo-no-background.png';

const RegisterData:React.FC = () => {
    const db = getFirestore();
    const history = useHistory();

    const bbRef = useRef<HTMLIonInputElement>(null);
    const tbRef = useRef<HTMLIonInputElement>(null);
    const tingkatRef = useRef<HTMLIonRadioGroupElement>(null);
    const genderInputRef = useRef<HTMLIonRadioGroupElement>(null);
    const usiaRef = useRef<HTMLIonInputElement>(null);

    const [toastMessage, setToastMessage] = useState('');
    

    const addDataHandler = async() => {
        const enteredBb = bbRef.current?.value;
        const enteredTb = tbRef.current?.value;
        const enteredUsia = usiaRef.current?.value;
        const enteredTingkat = tingkatRef.current?.value;
        const enteredGender = genderInputRef.current?.value;
        console.log(enteredBb, enteredTb, enteredTingkat, enteredGender);

        if(!enteredBb || enteredBb.toString().trim().length === 0 || !enteredTb || enteredTb.toString().trim().length === 0 ||
        !enteredTingkat || enteredTingkat.toString().trim().length === 0 || !enteredGender || enteredGender.toString().trim().length === 0 ){
            setToastMessage('Masukkan data dengan lengkap!')
            return;
        }else{
            var bmr = 0;
            if(enteredGender == "male"){
                bmr = (88.4 + (13.4 * Number(enteredBb))) + (4.8 * Number(enteredTb)) - (5.68 * Number(enteredUsia));
            }else{
                bmr = (447.6 + (9.25 * Number(enteredBb))) + (3.1 * Number(enteredTb)) - (4.33 * Number(enteredUsia));
            }
            var kalori = 0;
            if(enteredTingkat == 1){
                kalori = 1.2*bmr;
            }else if(enteredTingkat == 2){
                kalori = 1.375 * bmr;
            }else if(enteredTingkat == 3){
                kalori = 1.55 * bmr;
            }else if(enteredTingkat == 4){
                kalori = 1.725 * bmr;
            }else{
                kalori = 1.9 * bmr;
            }
            try{
                const docRef = await addDoc(collection(db, "users-data"), {
                  email: localStorage.getItem("loginEmail"),
                  usia: enteredUsia,
                  bb: enteredBb,
                  tb: enteredTb,
                  bmr: bmr.toFixed(3),
                  tingkat: enteredTingkat,
                  gender: enteredGender,
                  kalori: kalori.toFixed(3)
                });
                // console.log("Document written with ID: ", docRef.id);
                history.replace("/home")
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
                <IonToolbar color="secondary">
                    <IonImg slot="start" src={logo} alt="Healthu" style={{ paddingLeft: '10px', width: '85px' }} />
                </IonToolbar>
            </IonHeader>
            <IonContent color="light">
                <IonItem color="light">
                    <IonLabel position="floating">Usia</IonLabel>
                    <IonInput type="number" ref={usiaRef}/>
                </IonItem>
                <IonItem color="light">
                    <IonLabel position="floating">Berat Badan (kg)</IonLabel>
                    <IonInput type="number" ref={bbRef}/>
                </IonItem>
                <IonItem color="light">
                    <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
                    <IonInput type="number" ref={tbRef}/>
                </IonItem>
                <IonItem color="light">
                    <IonLabel position='floating'>Tingkat Aktivitas</IonLabel>
                    <br/><br/>
                    <IonRadioGroup ref={tingkatRef}>
                        <IonItem color="light">
                            <IonRadio slot="start" value="1"></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Kurang Aktif</b><br/>
                                Jika anda sangat jarang berolahraga atau tidak sama sekali.
                            </IonLabel>
                        </IonItem>
                        <IonItem color="light">
                            <IonRadio slot="start" value={2}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Aktif Ringan</b><br/>
                                Jika anda berolahraga ringan selama satu hingga tiga hari dalam seminggu.
                            </IonLabel>
                        </IonItem>
                        <IonItem color="light">
                            <IonRadio slot="start" value={3}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Cukup Aktif</b><br/>
                                Jika anda berolahraga dengan intensitas sedang sekitar tiga hingga lima hari dalam seminggu.
                            </IonLabel>
                        </IonItem>
                        <IonItem color="light">
                            <IonRadio slot="start" value={4}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Sangat Aktif</b><br/>
                                Jika anda berolahraga dengan intensitas berat selama enam hingga tujuh hari dalam seminggu.
                            </IonLabel>
                        </IonItem>
                        <IonItem color="light">
                            <IonRadio slot="start" value={5}></IonRadio>       
                            <IonLabel className="ion-text-wrap">
                                <b>Ekstra Aktif</b><br/>
                                Jika anda berolahraga dengan intensitas berat selama enam hingga tujuh hari dalam seminggu atau melakukan
                                pekerjaan fisik yang ekstra dan membutuhkan stamina dan fisik kuat.
                            </IonLabel>
                        </IonItem>
                    </IonRadioGroup>
                </IonItem>
                <IonItem color="light">
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
                <IonButton onClick={addDataHandler} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                    Finish
                </IonButton>
                {/* <p style={{ textAlign:'center' }}>Doesn't have an account yet? <br/><a href="/register">Register here</a></p> */}
            </IonContent>
        </IonPage>
        </IonPage>
    )
}

export default RegisterData;