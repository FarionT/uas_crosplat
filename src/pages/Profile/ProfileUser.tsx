import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import '../../firebaseConfig';
import man from '../../images/man.png';
import logo from '../../images/logo-no-background.png';
import './ProfileUser.css';

const ProfileUser: React.FC = () => {
  const db = getFirestore();
  const history = useHistory();
  const [user, setUser] = useState<Array<any>>();
  const [userNow, setUserNow] = useState();

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUser(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getData();
  }, [db]);

    // function untuk mengambil user yang sedang login sekarang
    useEffect(() => {
        if (user) {
            const currentUser = user.find(user => user.email === localStorage.getItem("loginEmail"));
            setUserNow(currentUser);
        }
    }, [user]);

    //function untuk melakukan logout
    const handleLogout = () => {
        localStorage.setItem("loginEmail", "");
        history.push('/');
        window.location.reload();
    };

  useIonViewDidEnter(() => {
    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, 'users'));
        setUser(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchData();
  }, [db]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonImg slot="start" className="logoProfile" src={logo} alt="Healthu" />
          <IonTitle className='title-profile centered-title'>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
        <div className="ion-text-center ion-margin-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <IonAvatar className='avatar-profile'>
            <IonImg src={man} alt="Avatar" />
          </IonAvatar>
          {userNow && (
            <div>
              <h2>{userNow.nama}</h2>
              <p>{userNow.email}</p>
            </div>
          )}
        </div>
        <IonRow>
          <IonCol>
            <IonCard className="manageCard" routerLink="/kelolaAkun">
              <IonCardHeader>
                <IonCardTitle>Pengelolaan Akun</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Mengubah username dan Menghapus Akun</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard routerLink="/album" className="albumCard">
              <IonCardHeader>
                <IonCardTitle>Album Foto</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Berisikan kumpulan foto baik foto diri maupun makanan harian</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        {/* <IonRow>
          <IonCol>
            <IonCard className="updateCard">
              <IonCardHeader>
                <IonCardTitle>Angka Kecukupan Gizi (AKG)</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Update berat badan, tinggi badan, dan tingkat aktivitas</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard routerLink="/album" className="albumCard">
              <IonCardHeader>
                <IonCardTitle>Album Foto</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Berisikan kumpulan foto baik foto diri maupun makanan harian</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow> */}
        <IonButton color="danger" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
          LOGOUT
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfileUser;
