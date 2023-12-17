import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline, addOutline, colorFill, searchOutline } from "ionicons/icons";
import { MouseEventHandler, useEffect, useState } from "react";
import "./CatatanHarian.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import 'react-calendar/dist/Calendar.css';
import '../../firebaseConfig';
import { render } from "react-dom";
import Calendar from 'react-calendar';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const MAIL_DATA = [
    {id: 'sp', subject: 'Sarapan', calori:'0'},
    {id: "ms", subject: 'Makan Siang', calori:'0'},
    {id: 'mm', subject: 'Makan Malam', calori:'0'},
    {id: 'sc', subject: 'Camilan / Snack', calori:'0'}
]

const CatatanHarian: React.FC = () => {
    const [value, onChange] = useState<Value>(new Date());
    console.log(value?.toString().substring(4, 15));
    const handleSearchIcon = () => {
        console.log("Searching...");
    };

    const db = getFirestore();

    const [food, setFood] = useState<Array<any>>();
    useEffect(()=>{
        async function getData(){
            const querySnapshot = await getDocs(collection(db, "users-food"));
            console.log('querySnapshot: ', querySnapshot);
            setFood(querySnapshot.docs.map((doc)=>( {...doc.data(), id:doc.id})));
            // setFood(food?.filter(x => x.email == localStorage.getItem("loginEmail")));
            // const dataBaru = food?.filter(x => x.email == localStorage.getItem("loginEmail"));
            // setFood(dataBaru);
            console.log(food);
        
            querySnapshot.forEach((doc)=>{
                console.log(`${doc.id}=> ${doc.data()}`);
                console.log('doc: ', doc);
            })
            console.log(food);
        }
    
        getData()
    }, []);

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonButton className="button-search" slot="end" onClick={handleSearchIcon} color="primary" href="/search">
                        <IonIcon icon={searchOutline} /> 
                    </IonButton>
                    <IonTitle>
                        Tanggal/Hari/Kalender
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <Calendar onChange={onChange} value={value} className="kalender" />
                <IonCard className="breakfast-category">
                    <IonCardContent className="card">
                        <h2>Breakfast</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'bf' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
                <IonCard className="lunch-category">
                    <IonCardContent className="card">
                        <h2>Lunch</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'lh' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
                <IonCard className="dinner-category">
                    <IonCardContent className="card">
                        <h2>Dinner</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'dn' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
                <IonCard className="snack-category">
                    <IonCardContent className="card">
                        <h2>Snack</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'sc' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default CatatanHarian;