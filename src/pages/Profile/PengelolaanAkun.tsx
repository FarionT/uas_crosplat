// PengelolaanAkun.tsx
import React, { useState, useEffect, useRef } from 'react';
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
import { useHistory } from 'react-router-dom'; // Import useHistory
import { getFirestore, doc, updateDoc, query, getDocs, getDoc, collection } from 'firebase/firestore';
import { arrowBackOutline } from 'ionicons/icons';
import logo from "../../images/logo-no-background.png";

interface UserData {
  id: string;
  nama: string;
  email: string; 
}

const PengelolaanAkun: React.FC = () => {
  const history = useHistory(); // Initialize useHistory
  const db = getFirestore();
  const newNameRef = useRef<HTMLIonInputElement>(null);
  // const [newUsername, setNewUsername] = useState('');
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
      const newName = newNameRef.current?.value;
      if (userNow) {
        const userRef = doc(db, 'users', userNow.id);
        await updateDoc(userRef, { nama: newName });
  
        // Fetch the updated user data from Firebase
        const updatedUserSnapshot = await getDoc(userRef);
        const updatedUser = { ...(updatedUserSnapshot.data() as UserData), id: updatedUserSnapshot.id };
  
        console.log('Updated user data from Firebase:', updatedUser);
  
        // Update the userNow state with the updated data
        setUserNow(updatedUser);
  
        showToastMessage('Username berhasil diperbarui.');
        
        // Navigate back to the profile page
        history.push('/profile'); // Use history.push
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
                <IonBackButton defaultHref="/profile" /> {/* Use IonBackButton */}
            </IonButtons>
            <IonImg slot="start" src={logo} alt="Healthu" style={{ paddingLeft: '10px', width: '85px' }} />
            <IonTitle>Pengelolaan Akun</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" color="light">
        <IonLabel position="floating">Username Baru</IonLabel>
        <IonInput
          type="text"
          ref={newNameRef}
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
