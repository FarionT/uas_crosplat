import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline, addOutline, chevronForward, colorFill, searchOutline } from "ionicons/icons";


import spiderman from '../images/spiderman.png';

const ProfileUser: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        (Logo) + NamaApp
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="ion-text-center ion-margin-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <IonAvatar>
                        <IonImg src={spiderman} alt="Avatar" />
                    </IonAvatar>
                    <h2>Username</h2>
                    <p>example@gmail.com</p>
                </div>
                <IonRow>
                    <IonCol>
                        <h2>Setting Umum</h2>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Berat Saya</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Update berat badan awal dan tujuan berat badan</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon slot="end" icon={chevronForward} />
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Album Foto</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Berisikan kumpulan foto baik foto diri maupun makanan harian</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon slot="end" icon={chevronForward} />
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Pengingat</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Tempat untuk mengatur pengingat atau Notif untuk user</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon slot="end" icon={chevronForward} />
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h2>Akun</h2>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Pengelolaan Akun</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Mengubah Email, username, dan hapus akun</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon slot="end" icon={chevronForward} />
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h2>Preferensi</h2>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Daerah</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Pilih Lokasi User</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon slot="end" icon={chevronForward} />
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Tema</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Pilih tema aplikasi</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon slot="end" icon={chevronForward} />
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default ProfileUser;