import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/config';

const WordForm = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const query = await getDocs(collection(db, 'sys_user'));
      const data = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    })();
  }, []);

  return (
    <div>{items?.map((v) => (<p key={v.id}>{v.id} | {v.name}</p>))}</div>
  );
};

export default WordForm;
