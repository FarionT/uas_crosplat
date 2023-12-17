// PengelolaanAkun.tsx
import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
  IonButton,
  IonBackButton,
  IonToast,
  IonIcon,
  IonImg,
} from '@ionic/react';
import { getFirestore, doc, updateDoc, query, where, getDocs, DocumentData, collection, getDoc } from 'firebase/firestore';
import { arrowBackOutline } from 'ionicons/icons';
import logo from "../../images/logo-no-background.png";

interface UserData {
  id: string;
  nama: string;
  email: string; // Tambahkan properti email
  // Tambahkan properti lain sesuai kebutuhan
}

const PengelolaanAkun: React.FC = () => {
  const db = getFirestore();
  const [newUsername, setNewUsername] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [userNow, setUserNow] = useState<UserData | undefined>();

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(query(collection(db, 'users')));
      const usersData = querySnapshot.docs.map((doc) => ({ ...(doc.data() as UserData), id: doc.id }));
      const currentUser = usersData.find((user) => user.email === localStorage.getItem('loginEmail'));
      setUserNow(currentUser);
    }

    getData();
  }, [db]);

  const handleUpdateUsername = async () => {
    try {
      if (userNow) {
        const userRef = doc(db, 'users', userNow.id);
        await updateDoc(userRef, { nama: newUsername });
  
        // Fetch the updated user data from Firebase
        const updatedUserSnapshot = await getDoc(userRef);
        const updatedUser = { ...(updatedUserSnapshot.data() as UserData), id: updatedUserSnapshot.id };
  
        console.log('Updated user data from Firebase:', updatedUser);
  
        // Update the userNow state with the updated data
        setUserNow(updatedUser);
  
        showToastMessage('Username berhasil diperbarui.');
      }
    } catch (error: any) {
      console.error('Error updating username:', error.message);
      showToastMessage('Terjadi kesalahan. Coba lagi nanti.');
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
            <IonButtons slot="start">
                <IonButton routerLink='/profile'>
                    <IonIcon icon={arrowBackOutline} />
                </IonButton>
            </IonButtons>
            <IonImg slot="start" src={logo} alt="Healthu" style={{ paddingLeft: '10px', width: '85px' }} />
            <IonTitle>Pengelolaan Akun</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
        <IonLabel position="floating">Username Baru</IonLabel>
        <IonInput
          type="text"
          value={newUsername}
          onIonChange={(e) => setNewUsername(e.detail.value!)}
        />
        <IonButton expand="full" onClick={handleUpdateUsername}>
          Update Username
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default PengelolaanAkun;
