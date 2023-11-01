import { IonTabs, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonCard, IonCardHeader, IonCardContent } from "@ionic/react";
import { ban, banSharp, create, discOutline, trash } from "ionicons/icons";
import { useRef } from "react";

import { IonReactRouter } from "@ionic/react-router";
import "./kalori.css";



const Kalori:React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonIcon icon={discOutline} size="large" />
                    </IonButtons>
                    <IonTitle>Laporan</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardHeader>Kalori</IonCardHeader>
                    <IonCardContent>
                        <h1>1500</h1>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h2>Rata-rata Harian: 1500</h2>
                            <h2>Target: 2400kkal</h2>
                        </div>
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
                                    <IonLabel>(25%)</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>372</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Makan Siang</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>(37%)</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>544</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Makan Malam</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>(37%)</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>543</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Camilan</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>(0%)</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>-</IonLabel>
                                </div>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <h1>Makanan Dikonsumsi</h1>
                        <IonList>
                            <IonItem className="custom-item">
                                <div className="left-content" style={{fontWeight: 'bold'}}>
                                    <h2>Makanan</h2>
                                </div>
                                <div className="right-content" style={{fontWeight: 'bold'}}>
                                    <h2>Jumlah Dikonsumsi</h2>
                                </div>
                                <div className="right-content2" style={{fontWeight: 'bold'}}>
                                    <h2>Kal (kkal)</h2>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Nasi Putih</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>x2 =</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>408</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Bubur Ayam</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>x1=</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>372</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Ayam Goreng</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>x1=</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>260</IonLabel>
                                </div>
                            </IonItem>
                            <IonList>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Tempe Orek</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>x1=</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>175</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Telur Dadar</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>x1=</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>93</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Sayur Asem</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>x1=</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>80</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content">
                                    <IonLabel>Semur Tahu</IonLabel>
                                </div>
                                <div className="right-content">
                                    <IonLabel>x1=</IonLabel>
                                </div>
                                <div className="right-content2">
                                    <IonLabel>71</IonLabel>
                                </div>
                            </IonItem>
                            <IonItem className="custom-item">
                                <div className="left-content" style={{fontWeight: 'bold'}}>
                                    <IonLabel>Total</IonLabel>
                                </div>
                                <div className="right-content" style={{fontWeight: 'bold'}}>
                                    <IonLabel>x8=</IonLabel>
                                </div>
                                <div className="right-content2" style={{fontWeight: 'bold'}}>
                                    <IonLabel>1459</IonLabel>
                                </div>
                            </IonItem>
                        </IonList>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Kalori;