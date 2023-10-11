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
                placeholder= "mail.id"
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
            <h1>HEHHEHEHEHE</h1>
      </IonContent>
    </IonPage>
  );
}

export default SearchPage;
