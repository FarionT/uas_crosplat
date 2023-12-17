import { IonTabs, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonCard, IonCardHeader, IonCardContent } from "@ionic/react";
import { ban, banSharp, create, discOutline, trash } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

import { IonReactRouter } from "@ionic/react-router";
import "./kalori.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import '../../firebaseConfig';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import logo from "../../images/logo-no-background.png";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Kalori:React.FC = () =>{
    const db = getFirestore();
    const [value, onChange] = useState<Value>(new Date());
    const [food, setFood] = useState<Array<any>>();
    const [user, setUser] = useState<Array<any>>();
    const [total, setTotal] = useState(0);
    var breakfast1 = 0;
    var lunch1 = 0;
    var dinner1 = 0;
    var snack1 = 0;
    const [breakfast, setBreakfast] = useState(0);
    const [lunch, setLunch] = useState(0);
    const [dinner, setDinner] = useState(0);
    const [snack, setSnack] = useState(0);
    
    // var total1 = breakfast + lunch + dinner + snack;
    var total1 = 0;
    useEffect(()=>{
        async function getData(){
            const querySnapshot = await getDocs(collection(db, "users-food"));
            const querySnapshot2 = await getDocs(collection(db, "users-data"));
            console.log('querySnapshot: ', querySnapshot);
            setFood(querySnapshot.docs.map((doc)=>( {...doc.data(), id:doc.id})));
            setUser(querySnapshot2.docs.map((doc)=>( {...doc.data(), id:doc.id})));
            // console.log(food);
            // const dataBaru = food?.filter(x => x.email == localStorage.getItem("loginEmail"));
            // setFood(dataBaru);
        
            querySnapshot.forEach((doc)=>{
                console.log(`${doc.id}=> ${doc.data()}`);
                console.log('doc: ', doc);
            })
        // setFood(food?.filter(x => x.email == localStorage.getItem("loginEmail")));
        }
    
        getData();
          
    }, []);
    const userNow = user?.find(x => x.email == localStorage.getItem("loginEmail"));
    food?.map(makanan => {
        if(makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
            if(makanan.category == 'bf'){
                breakfast1 += (makanan.foodCalory * makanan.totalEaten)
                // console.log("breakfast" + breakfast1);
                // setBreakfast(prev => prev + (makanan.foodCalory * makanan.totalEaten))
            }else if(makanan.category == 'lh'){
                lunch1 += (makanan.foodCalory * makanan.totalEaten)
                // setLunch(prev => prev + (makanan.foodCalory * makanan.totalEaten))
            }else if(makanan.category == 'dn'){
                dinner1 += (makanan.foodCalory * makanan.totalEaten)
                // setDinner(prev => prev + (makanan.foodCalory * makanan.totalEaten))
            }else{
                snack1 += (makanan.foodCalory * makanan.totalEaten)
                // setSnack(prev => prev + (makanan.foodCalory * makanan.totalEaten))
            }
            total1 += (makanan.foodCalory * makanan.totalEaten);
            // setTotal(makanan.foodCalory * makanan.totalEaten);
        }
    })  

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonImg slot="start" className="logoLaporan" src={logo} alt="Healthu" />
                    <IonTitle>Laporan</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color="light">
            <Calendar onChange={onChange} value={value} className="kalender" />
                <IonCard className="kaloriCard">
                    <IonCardHeader>Kalori</IonCardHeader>
                    <IonCardContent>
                        <h1>{total1}</h1>
                        <h2>Target: {userNow && userNow!.kalori}kkal</h2>
                        <div className="horizontal-line" />
                        <div className="kalori-kanan">
                            <h2>Kal(kkal)</h2>
                        </div>
                        <IonList>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Makan Pagi</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>{(breakfast1 * 100 / total1).toFixed(3)}%</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>{breakfast1}</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Makan Siang</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>{(lunch1 * 100 / total1).toFixed(3)}%</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>{lunch1}</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Makan Malam</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>{(dinner1 * 100 / total1).toFixed(3)}%</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>{dinner1}</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Camilan</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>{(snack1 * 100 /total1).toFixed(3)}%</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>{snack1}</IonLabel>
                                </div>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonCard className="consumeCard">
                    <IonCardContent>
                        <h1>Makanan Dikonsumsi</h1>
                        <IonList>
                        {food?.map(makanan => {
                            if(makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                if(makanan.category == 'bf'){
                                    breakfast1 += (makanan.foodCalory * makanan.totalEaten)
                                    // setBreakfast(prev => prev + (makanan.foodCalory * makanan.totalEaten))
                                }else if(makanan.category == 'lh'){
                                    lunch1 += (makanan.foodCalory * makanan.totalEaten)
                                    // setLunch(prev => prev + (makanan.foodCalory * makanan.totalEaten))
                                }else if(makanan.category == 'dn'){
                                    dinner1 += (makanan.foodCalory * makanan.totalEaten)
                                    // setDinner(prev => prev + (makanan.foodCalory * makanan.totalEaten))
                                }else{
                                    snack1 += (makanan.foodCalory * makanan.totalEaten)
                                    // setSnack(prev => prev + (makanan.foodCalory * makanan.totalEaten))
                                }
                                // total += (makanan.foodCalory * makanan.totalEaten);
                                // setTotal(makanan.foodCalory * makanan.totalEaten);
                                return(
                                    <IonItem className="custom-item" key={makanan.id}>
                                        <div className="left-content" style={{fontWeight: 'bold'}}>
                                            <h2>{makanan.foodName}</h2>
                                        </div>
                                        <div className="right-content" style={{fontWeight: 'bold'}}>
                                            <h2>{makanan.totalEaten} g</h2>
                                        </div>
                                        <div className="right-content2" style={{fontWeight: 'bold'}}>
                                            <h2>{makanan.foodCalory}</h2>
                                        </div>
                                    </IonItem>
                                )
                            }
                        })}             
                        </IonList>
                        {/* {()=> {setTotal(total)}} */}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Kalori;