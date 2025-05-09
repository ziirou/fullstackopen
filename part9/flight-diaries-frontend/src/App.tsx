import { useState, useEffect } from 'react'
import type { Diary } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary({ date, weather, visibility, comment })
      .then(data => {
        setDiaries(diaries.concat(data));
      });

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={diaryCreation}>
        <div>
          date <input
            value={date}
            onChange={(event) => setDate(event.target.value)} 
          />
        </div>
        <div>
          weather <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)} 
          />
        </div>
        <div>
          visibility <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)} 
          />
        </div>
        <div>
          comment <input
            value={comment}
            onChange={(event) => setComment(event.target.value)} 
          />
        </div>
        <button type='submit'>add</button>
      </form>

      <h3>Diary entries</h3>
      {diaries.map(diary =>
        <div key={diary.id} style={{ marginBottom: "0.5rem" }}>
          <b>{diary.date}</b><br />
          <span>weather: {diary.weather}</span><br />
          <span>visibility: {diary.visibility}</span>
        </div>
      )}
    </div>
  )
}

export default App
