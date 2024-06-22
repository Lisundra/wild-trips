import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCheckUser } from '../../redux/thunkActions';
import type { RootState } from '../../redux/store';
import DifficultyClue from '../../components/DifficultyClue/DifficultyClue';
import DrawnTourMap from '../../components/DrawnTourMap/DrawnTourMap';

function ParallaxPage() {
  const [showForm, setShowForm] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [facilitiesPaid, setFacilitiesPaid] = useState({});
  const [facilitiesFree, setFacilitiesFree] = useState({});
  const [activities, setActivities] = useState({});
  const [housings, setHousings] = useState({});
  const [inputs, setInputs] = useState({ family_friendly: true, season: 'весна', difficulty: 'низкая', coordinates: '' });
  const [arraysCheckBox, setArraysCheckBox] = useState({ facility: [], activity: [], housing: [] });
  let formData = new FormData();

  const user = useSelector((state: RootState) => state.user.user);

  const filterObjFalse = (obj) => Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value === true)
  );

  useEffect(() => {
    console.log('MyTours user: ', housings);
    fetchCheckUser();
    axios.post('http://localhost:3100/api/tours/checkBox', {
      withCredentials: true
    }).then((res) => {
      console.log('data check ', res.data);
      setArraysCheckBox(res.data);
    });
  }, []);

  const handleFacilityChange = (type, facility) => {
    if (type === 'paid') {
      setFacilitiesPaid((prev) => ({ ...prev, [facility]: !prev[facility] }));
      setFacilitiesFree((prev) => ({ ...prev, [facility]: false }));
    } else {
      setFacilitiesFree((prev) => ({ ...prev, [facility]: !prev[facility] }));
      setFacilitiesPaid((prev) => ({ ...prev, [facility]: false }));
    }
  };

  const handleCheckboxChange = (setState, state, item) => {
    setState((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowForm(false);
    }
  };

  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => (
      name === 'family_friendly' ? {
        ...prevInputs,
        [name]: value !== '0',
      } : {
        ...prevInputs,
        [name]: value,
      }
    ));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('submit form tour ', inputs);
    console.log(facilitiesFree, facilitiesPaid, activities, housings);

    console.log('RESULT OBJECT DATA FOR CREATE',
      {
        ...inputs, facilitiesFree: filterObjFalse(facilitiesFree),
        facilitiesPaid: filterObjFalse(facilitiesPaid),
        activities: filterObjFalse(activities),
        housings: filterObjFalse(housings)
      }
    );

    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        if (key === 'images') {
          Object.values(inputs[key]).forEach(value => {
            formData.append('images', value);
          });
        } else {
          formData.append(key, inputs[key]);
        }
      }
    }

    formData.append('facilitiesPaid', JSON.stringify(filterObjFalse(facilitiesPaid)));
    formData.append('facilitiesFree', JSON.stringify(filterObjFalse(facilitiesFree)));
    formData.append('activities', JSON.stringify(filterObjFalse(activities)));
    formData.append('housings', JSON.stringify(filterObjFalse(housings)));

    axios.post('http://localhost:3100/api/tours/', formData, { withCredentials: true });
    formData = new FormData();
  };

  const handleImageUpload = (event) => {
    const { files } = event.target;
    setInputs((prev) => ({ ...prev, ['images']: files }));

    const previews = [];
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleClickImages = () => {
    setShowImages(!showImages);
  };

  const handleMapCoordinatesChange = (newCoordinates) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      coordinates: newCoordinates,
    }));
  };

  return (
    <div className="relative bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('./src/assets/images/minimalizm-montains-1.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <br /> <br /> <br />
      <div onClick={handleContainerClick} className="relative mt-10 z-9 flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold">Личный кабинет {user?.login}</h1>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Закрыть' : 'Создать тур'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmitForm} className="mt-8 bg-white text-black p-6 rounded shadow-md w-4/5 flex flex-wrap">
            <div className="w-full md:w-1/2 p-2">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Название тура</label>
                <input type="text" name='title' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Краткое описание</label>
                <input type="text" name='subtitle' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Начало тура</label>
                <input type="date" name='start_date' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Конец тура</label>
                <input type="date" name='end_date' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Подробное описание</label>
                <textarea className="w-full p-2 border rounded" name='description' onChange={handleInputsChange} required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Цена тура</label>
                <input type="number" name='price' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Скидка на тур</label>
                <input type="number" name='discount' onChange={handleInputsChange} className="w-full p-2 border rounded" />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-2">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Страна тура</label>
                <input type="text" name='country' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Регион тура</label>
                <input type="text" name='region' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Сложность тура</label>
                <DifficultyClue value={inputs.difficulty} onChange={handleInputsChange} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Фамильный тур</label>
                <select name='family_friendly' onChange={handleInputsChange} className="w-full p-2 border rounded" value={inputs.family_friendly ? '1' : '0'}>
                  <option value='1'>Да</option>
                  <option value='0'>Нет</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Сезон тура</label>
                <select name='season' onChange={handleInputsChange} className="w-full p-2 border rounded" value={inputs.season}>
                  <option value='весна'>Весна</option>
                  <option value='лето'>Лето</option>
                  <option value='осень'>Осень</option>
                  <option value='зима'>Зима</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Фотографии тура</label>
                <input type="file" name='images' onChange={handleImageUpload} multiple className="w-full p-2 border rounded" />
                {showImages && (
                  <div className="mt-4 flex flex-wrap">
                    {imagePreviews.map((src, index) => (
                      <img key={index} src={src} alt="preview" className="w-24 h-24 object-cover m-1 border rounded" />
                    ))}
                  </div>
                )}
                <button type="button" className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded" onClick={handleClickImages}>
                  {showImages ? 'Скрыть' : 'Показать'} фотографии
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Координаты маршрута</label>
                <DrawnTourMap onCoordinatesChange={handleMapCoordinatesChange} />
                <input type="text" name='coordinates' value={inputs.coordinates} onChange={handleInputsChange} className="w-full p-2 border rounded mt-2" readOnly />
              </div>
            </div>
            <button type="submit" className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-800 rounded">
              Сохранить тур
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ParallaxPage;
