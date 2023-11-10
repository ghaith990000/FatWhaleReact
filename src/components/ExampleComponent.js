// src/components/FirestoreData.js
import React, { useState, useEffect } from 'react';
import firebaseConfig from '../firebase';

const FirestoreData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Assuming 'exampleCollection' is the name of your Firestore collection
        const collectionRef = firebaseConfig.collection('menus');
        const snapshot = await collectionRef.get();

        const newData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Firestore Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FirestoreData;
