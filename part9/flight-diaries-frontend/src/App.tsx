import { useState, useEffect } from 'react'
import type { Diary, Weather, Visibility } from './types';
import { weatherOptions, visibilityOptions } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

function App() {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState(getCurrentDate());
  const [weather, setWeather] = useState<Weather>(weatherOptions[0]);
  const [visibility, setVisibility] = useState<Visibility>(visibilityOptions[0]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

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

        setDate(getCurrentDate());
        setWeather(weatherOptions[0]);
        setVisibility(visibilityOptions[0]);
        setComment('');
      })
      .catch(errorMessage => {
        console.log(errorMessage);
        setError(errorMessage);
        setTimeout(() => {
          setError('')
        }, 5000);
      });
  };

  return (
    <div>
      <h3>Add new entry</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <form onSubmit={diaryCreation}>
        <div>
          <label>date: </label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)} 
          />
        </div>
        <div>
          <label>weather: </label>
          {weatherOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>visibility: </label>
          {visibilityOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={(event) => setVisibility(event.target.value as Visibility)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>comment: </label>
          <input
            type="text"
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
