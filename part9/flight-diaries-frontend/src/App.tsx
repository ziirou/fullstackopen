import { useState, useEffect } from 'react'
import type { Diary } from './types';
import { getAllDiaries } from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary =>
        <div key={diary.id} style={{ marginBottom: "0.5rem" }}>
          <b>{diary.date}</b><br></br>
          weather: {diary.weather}<br></br>
          visibility: {diary.visibility}
        </div>
      )}
    </div>
  )
}

export default App
