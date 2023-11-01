import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

import { MAIL_DATA } from './Mail'; // Pastikan Anda mengimpor MAIL_DATA
import { arrowBack } from 'ionicons/icons';

const SearchPage: React.FC = () => {
  const [selectedMail, setSelectedMail] = useState<string>(''); // State untuk dropdown
  const [searchTerm, setSearchTerm] = useState<string>(''); // State untuk input pencarian

  const handleSelectChange = (event: CustomEvent) => {
    setSelectedMail(event.detail.value);
  }

  return (
    <IonPage>
        <IonHeader className='ion-padding'>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton style={{display: 'block'}} text="" icon={arrowBack}></IonBackButton>
                </IonButtons>
                <IonTitle>NAMA APP</IonTitle>
                <IonSelect
                slot='end'
                placeholder= "Options"
                value={selectedMail}
                onIonChange={handleSelectChange}
                >
                    {MAIL_DATA.map(mail => (
                    <IonSelectOption key={mail.id} value={mail.id}>
                        {mail.subject}
                    </IonSelectOption>
                    ))}
                </IonSelect>
            </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
            <IonToolbar>
                <IonSearchbar
                    value={searchTerm}
                    placeholder="Cari makanan"
                    onIonChange={(e) => setSearchTerm(e.detail.value!)}
                />
            </IonToolbar>
            <IonCard>
              <IonCardContent>
                <IonCardTitle>Ayam Goreng</IonCardTitle>
                <IonCardSubtitle>500 kalori / 100g</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonCardTitle>Kentang Goreng</IonCardTitle>
                <IonCardSubtitle>800 kalori / 100g</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonCardTitle>Nasi Goreng</IonCardTitle>
                <IonCardSubtitle>700 kalori / 100g</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default SearchPage;
