import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCheckUser } from '../../redux/thunkActions';
import type { RootState } from '../../redux/store';
import DifficultyClue from '../../components/DifficultyClue/DifficultyClue';




function ParallaxPage() {
  const [showForm, setShowForm] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [facilitiesPaid, setFacilitiesPaid] = useState({});
  const [facilitiesFree, setFacilitiesFree] = useState({});
  const [activities, setActivities] = useState({});
  const [housings, setHousings] = useState({});
  const [inputs, setInputs] = useState({family_friendly:true, season:'весна', difficulty:'низкая'});

  const [arraysCheckBox, setArraysCheckBox] = useState( {facility: [], activity: [], housing: []} )

  const user = useSelector((state: RootState) => state.user.user);
//   const dispatch = useDispatch();
const filterObjFalse = (obj)=>Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value === true)
)

  useEffect(() => {
      console.log('MyTours user: ', housings);
      fetchCheckUser()
      axios.post('http://localhost:3100/api/tours/checkBox', {
        withCredentials: true
      }).then((res) => {
        console.log('data check ', res.data);
        setArraysCheckBox(res.data);
        
      });

  }, []);

  // useEffect(() => {
  //   console.log('arraysCheckBox updated:', arraysCheckBox['facility'][0]);
  // }, [arraysCheckBox]);

  const handleFacilityChange = (type: string, facility: string) => {
        console.log(arraysCheckBox.facility[2].name);
        
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

  const handleInputsChange = (event)=>{
    const { name, value, files } = event.target;
    if(name==='imageUpload')
    {
      setInputs((prevInputs) => (
      {
        ...prevInputs,
        [name]: files,
      }
      ))
    }else
    setInputs((prevInputs) => (
      name==='family_friendly'?
    {
      ...prevInputs,
      [name]: value!=='0',
    }
    :
    {
      ...prevInputs,
      [name]: value,
    }
    
    ));
  }

  const handleSubmitForm =(e)=>{
    e.preventDefault();
    console.log('submit form tour ',inputs);
    console.log(facilitiesFree, facilitiesPaid, activities, housings);

    console.log('RESULT OBJECT DATA FOR CREATE',
     {...inputs, facilitiesFree: filterObjFalse(facilitiesFree),
      facilitiesPaid: filterObjFalse(facilitiesPaid), 
      activities: filterObjFalse(activities),
      housings: filterObjFalse(housings)}
     )
  }
  const handleImageUpload = (event) => {
    const {files} = event.target;
    const previews = [];
    setInputs((prevInputs) => (
      {
        ...prevInputs,
        'images': files,
      }
      ))

    for (let i = 0; i < files.length; i++) {
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


  return (
    <div className="relative bg-cover bg-center min-h-screen"  style={{ backgroundImage: `url('./src/assets/images/minimalizm-montains-1.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50"  />
     <br /> <br /> <br />
      <div  onClick={handleContainerClick} className="relative mt-10 z-9 flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold">Личный кабинет {user?.login}</h1>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          { showForm?'Закрыть':'Создать тур'}
        </button>

        {showForm && (
          <form  onSubmit={handleSubmitForm} className="mt-8 bg-white text-black p-6 rounded shadow-md w-4/5 flex flex-wrap">
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
                <input type="date"name='end_date' onChange={handleInputsChange} className="w-full p-2 border rounded" required />
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
                <label className="block text-sm font-bold mb-2">Сезон</label>
                <select className="w-full p-2 border rounded" name='season' value={inputs.season} onChange={handleInputsChange} required>
                  <option value="весна">весна</option>
                  <option value="лето">лето</option>
                  <option value="осень">осень</option>
                  <option value="зима">зима</option>
                </select>
              </div>
              <div className="mb-4">
                <div className='flex'>
                <label className="block text-sm font-bold mb-2">Сложность</label>
                <DifficultyClue difficulty={inputs.difficulty?inputs.difficulty:'низкая' } />
                </div>
                <select className="w-full p-2 border rounded" name='difficulty' onChange={handleInputsChange} required>
                  <option value="низкая">низкая</option>
                  <option value="средняя">средняя</option>
                  <option value="высокая">высокая</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Можно с детьми</label>
                <select className="w-full p-2 border rounded" name='family_friendly' onChange={handleInputsChange} required>
                  <option value={1}>Да</option>
                  <option value={0}> Нет</option>
                </select>
              </div>
            <div className="mb-4 flex flex-col">
                <label htmlFor="imageUpload" className="block text-sm font-bold mb-2">Загрузить фото тура:</label>
                <input type="file" id="imageUpload" name="imageUpload" accept=".jpg, .jpeg, .png" multiple onChange={handleImageUpload} required />
                <span className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-700 rounded" onClick={handleClickImages}>{showImages ? 'Скрыть загруженные фотографии' : 'Показать загруженные фотографии'}</span>
                    
                    {showImages && (
                      <div>
                        {imagePreviews.map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt={`preview ${index}`}
                            className="w-fukk h-full object-cover m-2"
                          />
                        ))}
                      </div>      
                    )}
           
              </div>
            </div>
            <div className="map-container min-w-full">
                Карта маршрута:
                <div id="map" className="map min-h-96 min-w-full bg-gray-300" />
            </div>
            <div className="w-full p-2 flex justify-around">
               
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Активности в туре</label>
                {[...Array(arraysCheckBox.activity.length).keys()].map(i => (
                  <div key={i}>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2 size-5"
                        checked={activities[`${i + 1}`] || false}
                        onChange={() => handleCheckboxChange(setActivities, activities, `${i + 1}`)}
                      />
                    { arraysCheckBox.activity[i].name }
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Проживание</label>
                {[...Array(10).keys()].map(i => (
                  <div key={i}>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2 size-5"
                        checked={housings[`${i + 1}`] || false}
                        onChange={() => handleCheckboxChange(setHousings, housings, `${i + 1}`)}
                      />
                    {  arraysCheckBox.housing[i].name}
                    </label>
                  </div>
                ))}
              </div>
          
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Оплатить дополнительно</label>
                {[...Array(20).keys()].map(i => (
                  <div key={i}>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2 size-5"
                        checked={facilitiesPaid[`${i + 1}`] || false}
                        onChange={() => handleFacilityChange('paid', `${i + 1}`)}
                      />
                      { arraysCheckBox.facility[i].name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Включено в стоимость</label>
                {[...Array(20).keys()].map(i => (
                  <div key={i}>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-2 size-5"
                        checked={facilitiesFree[`${i + 1}`] || false}
                        onChange={() => handleFacilityChange('free', `${i + 1}`)}
                      />
                      {arraysCheckBox.facility[i].name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
                    <div className='flex justify-center flex-1'>
              <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-800 rounded" >Сохранить тур</button>
              </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ParallaxPage;
