import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckUser } from '../../redux/thunkActions';
import { RootState } from '../../redux/store';
import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';




const ParallaxPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [facilitiesPaid, setFacilitiesPaid] = useState({});
  const [facilitiesFree, setFacilitiesFree] = useState({});
  const [activities, setActivities] = useState({});
  const [housings, setHousings] = useState({});
  const [inputs, setInputs] = useState({});

  const [arraysCheckBox, setArraysCheckBox] = useState( {facility: Array(), activity: Array(), housing: Array()} )

  const user = useSelector((state: RootState) => state.user.user);
//   const dispatch = useDispatch();
const filterObjFalse = (obj)=>{
  return  Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value === true)
);
}

  useEffect(() => {
      console.log('MyTours user: ', housings);
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
    const { name, value } = event.target;
    setInputs((prevInputs) => (
      name==='family_friendly'?
    {
      ...prevInputs,
      [name]: value==='0'?false:true,
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

  return (
    <div className="relative bg-cover bg-center min-h-screen"  style={{ backgroundImage: `url('./src/assets/images/minimalizm-montains-1.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50" ></div>
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
                <textarea className="w-full p-2 border rounded" name='description' onChange={handleInputsChange} required></textarea>
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
                  <option value={'весна'}>весна</option>
                  <option value={'лето'}>лето</option>
                  <option value={'осень'}>осень</option>
                  <option value={'зима'}>зима</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Сложность</label>
                <select className="w-full p-2 border rounded" name='difficulty' onChange={handleInputsChange} required>
                  <option value={'низкая'}>низкая</option>
                  <option value={'средняя'}>средняя</option>
                  <option value={'высокая'}>высокая</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Можно с детьми</label>
                <select className="w-full p-2 border rounded" name='family_friendly' onChange={handleInputsChange} required>
                  <option value={1}>Да</option>
                  <option value={0}> Нет</option>
                </select>
              </div>

            </div>
            <div className="map-container min-w-full">
                Карта маршрута:
                <div id="map" className="map min-h-96 min-w-full bg-gray-300">
                </div>
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
};

export default ParallaxPage;
