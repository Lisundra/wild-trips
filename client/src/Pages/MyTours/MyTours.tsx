import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { fetchCheckUser } from '../../redux/thunkActions';
import type { RootState } from '../../redux/store';
import DifficultyClue from '../../components/DifficultyClue/DifficultyClue';
import MiniCardTour from '../../components/MiniCardTour/MiniCardTour';
import EditTour from '../../components/EditTour/EditTour';
import MiniCardTourNew from '../../components/MiniCardTour/MiniCardTourNewDesign';
import styles from './MyTours.module.css';
import RegButton from '../../components/RegButton/RegButton';



function ParallaxPage() {
  const [visible, setVisible] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [tourCreated, setTourCreated] = useState(false);
  const [upd, setUpd] = useState(0)
  const [isDelete, setIsDelete] = useState(false);
  const [dataTours, setDataTours] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [facilitiesPaid, setFacilitiesPaid] = useState({});
  const [facilitiesFree, setFacilitiesFree] = useState({});
  const [activities, setActivities] = useState({});
  const [housings, setHousings] = useState({});
  const [inputs, setInputs] = useState({family_friendly:true, season:'Весна', difficulty:'Низкая', coordinates:''});
  const [arraysCheckBox, setArraysCheckBox] = useState( {facility: [], activity: [], housing: []} )
  let formData = new FormData()

  const user = useSelector((state: RootState) => state.user.user);
//   const dispatch = useDispatch();
const filterObjFalse = (obj)=>Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value === true)
)

  useEffect(() => {
      fetchCheckUser()
      axios.post('http://localhost:3100/api/tours/checkBox', {
        withCredentials: true
      }).then((res) => {
        // console.log('data check ', res.data);
        setArraysCheckBox(res.data);
      });

       console.log('USER ',user)

       if(user.role==='admin'){

        axios.get('http://localhost:3100/api/tours/admin/all', {
          withCredentials: true
        }).then((res) => {
          // console.log('data org tours ', res.data);
  
          const formattedData = res.data.map(card=>{
           const newObj = {
            ...card,
            'Images': (JSON.parse(card.Images[0].image_path)).map(el=>el.replace(/^.*?src/, 'src'),)
           }
            return newObj
          })
  
          // console.log("🚀 ~ useEffect ~ formattedData:", formattedData)      
          setDataTours(formattedData)
        });

       } else
      axios.get('http://localhost:3100/api/tours/org/all', {
        withCredentials: true
      }).then((res) => {
        // console.log('data org tours ', res.data);

        const formattedData = res.data.map(card=>{
         const newObj = {
          ...card,
          'Images': (JSON.parse(card.Images[0].image_path)).map(el=>el.replace(/^.*?src/, 'src'),)
         }
          return newObj
        })
        // console.log("🚀 ~ useEffect ~ formattedData:", formattedData)      
        setDataTours(formattedData)
      });


  }, [upd]);


  useEffect(() => {
  console.log('USER 2',user)
  if(user.role==='admin'){
    axios.get('http://localhost:3100/api/tours/admin/all', {
        withCredentials: true
      }).then((res) => {
        // console.log('data org tours ', res.data);

        const formattedData = res.data.map(card=>{
         const newObj = {
          ...card,
          'Images': (JSON.parse(card.Images[0].image_path)).map(el=>el.replace(/^.*?src/, 'src'),)
         }
          return newObj
        })
        
        // console.log("🚀 ~ useEffect ~ formattedData:", formattedData)      
        setDataTours(formattedData)
      });
    
  }
  else
      axios.get('http://localhost:3100/api/tours/org/all', {
        withCredentials: true
      }).then((res) => {
        // console.log('data org tours ', res.data);

        const formattedData = res.data.map(card=>{
         const newObj = {
          ...card,
          'Images': (JSON.parse(card.Images[0].image_path)).map(el=>el.replace(/^.*?src/, 'src'),)
         }
          return newObj
        })

        // console.log("🚀 ~ useEffect ~ formattedData:", formattedData)      
        setDataTours(formattedData)
      });
    

  }, [tourCreated]);


  const handleFacilityChange = (type: string, facility: string) => {
        // console.log(arraysCheckBox.facility[2].name);
        
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
                    //! удалить
    }
  };



  const handleInputsChange = (event)=>{
    const { name, value, files } = event.target;

    if(name==='coordinates'){
      setInputs((prevInputs) => (
        {
          ...prevInputs,
          [name]: value.replace(/.*%([a-zA-Z0-9]+)&.*/, '$1'),
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
    // console.log('submit form tour ',inputs);
    // console.log(facilitiesFree, facilitiesPaid, activities, housings);

    // console.log('RESULT OBJECT DATA FOR CREATE',
    //  {...inputs, facilitiesFree: filterObjFalse(facilitiesFree),
    //   facilitiesPaid: filterObjFalse(facilitiesPaid), 
    //   activities: filterObjFalse(activities),
    //   housings: filterObjFalse(housings)}
    //  )
    
      for (const key in inputs) {
        if (inputs.hasOwnProperty(key)) {
           if(key==='images'){
          //  console.log("🚀 ~ handleSubmitForm ~ inputs[key]:", inputs[key])
           Object.values(inputs[key]).forEach(value => {
            // console.log(value);
            formData.append('images', value);
          });

          }
            else
            if(key==='coordinates'){
              const jsonString = JSON.stringify(inputs[key]);
              formData.append(key, jsonString);
            }else
            formData.append(key, inputs[key]);
        }
      }

      formData.append( 'facilitiesPaid', JSON.stringify(filterObjFalse(facilitiesPaid))) 
      formData.append( 'facilitiesFree', JSON.stringify(filterObjFalse(facilitiesFree))) 
      formData.append( 'activities', JSON.stringify(filterObjFalse(activities)))
      formData.append( 'housings', JSON.stringify(filterObjFalse(housings)))
      // Формируем данные для ручки на создание
   
        
      // console.log("🚀 ~ handleSubmitForm ~ formData:", formData.getAll('images'))


     axios.post('http://localhost:3100/api/tours/',formData,{withCredentials:true}).then(res=>{
      res?setTourCreated(true):setTourCreated(false)
     }).catch(err=>setTourCreated(false))

     setTimeout(() => {
      setTourCreated(false);
    }, 1500);
     formData = new FormData()
     setShowForm(!showForm)
  }

  const handleImageUpload = (event) => {
    const {files} = event.target;

    setInputs((prev) => ({ ...prev, 'images': files }));


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
      // console.log("🚀 ~ handleImageUpload ~ formData:", formData.getAll('images'))
  };

  const handleClickImages = () => {
    setShowImages(!showImages);
  };

  const handlerUpdateTour = (updateTour) => {
    // console.log("🚀 ~ handlerUpdateTour ~ updateTour:", updateTour);


    setDataTours((prevTours) => 
      prevTours.map((t) => 
        t.id === updateTour.id 
          ? { ...t, ...updateTour } 
          : t
      )
    );

    setUpd(upd+1)
  }

  const toggleVisibility = (id) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3100/api/tours/${id}`,{
    withCredentials:true
    })
    setDataTours(dataTours.filter(card => card.id !== id));

    setIsDelete(true)
  };

  return (
    
    <div className="relative bg-cover bg-center min-h-screen"  style={{ backgroundImage: `url('./src/assets/images/minimalizm-montains-1.jpg')` }} >
      <div className="absolute inset-0 bg-black opacity-50"  />
     <br /> <br /> <br />
      <div className="relative mt-10 z-9 flex flex-col items-center justify-start min-h-screen text-white">
        <h1 className="text-4xl font-bold">Личный кабинет {user?.login}</h1>

        <button
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded"
          onClick={() => setShowForm(!showForm)}
        >
          { showForm?'Закрыть':'Создать тур'}
        </button>

        {showForm && (
          <form  onSubmit={handleSubmitForm} className="mt-8 bg-white text-black p-6 rounded shadow-md w-4/5 flex flex-wrap justify-center">
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
                  <option value="Весна">Весна</option>
                  <option value="Лето">Лето</option>
                  <option value="Осень">Осень</option>
                  <option value="Зима">Зима</option>
                </select>
              </div>
              <div className="mb-4">
                <div className='flex'>
                <label className="block text-sm font-bold mb-2">Сложность</label>
                <DifficultyClue difficulty={inputs.difficulty?inputs.difficulty:'Низкая' } />
                </div>
                <select className="w-full p-2 border rounded" name='difficulty' onChange={handleInputsChange} required>
                  <option value="Низкая">Низкая</option>
                  <option value="Средняя">Средняя</option>
                  <option value="Высокая">Высокая</option>
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
              <label htmlFor="imageUpload" className={styles.inputFileButton}>
                <span className={styles.inputFileIconWrapper}>
                  <UploadOutlined style={{ fontSize: '25px', color: '#fff' }} />
                </span>
                <span className={styles.inputFileButtonText}>Загрузить фото тура:</span>
              </label>
              <input type="file" id="imageUpload" name="imageUpload" accept=".jpg, .jpeg, .png" multiple onChange={handleImageUpload} required />
                <div className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-700 rounded select-none"
                 onClick={handleClickImages}>{
                  showImages ? 'Скрыть загруженные фотографии' 
                 : 
                 'Показать загруженные фотографии'}
                 </div>
                    
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

            <p className="block font-bold mb-2">
            Чтобы добавить карту для вашего тура, следуйте инструкции:
            </p>
            <ol>
               <li>1. Нажмите кнопку "Открыть Яндекс.Карты"</li>           
               <li>2. Создайте маршрут в конструкторе карт</li>           
               <li>3. Нажмите кнопку "Сохранить и продолжить" в конструткоре карт</li>      
               <li>4. Нажмите кнопку "Получить код карты" в конструткоре карт</li>    
               <li>5. Скопируйте код и вставьте в поле ниже:</li> 
               </ol>  
               <textarea className="w-full p-2 border rounded" name='coordinates' onChange={handleInputsChange} required />
                <div className='iframe' />              
        
              <div className='flex flex-col items-center'>
            <button type='button' className='rounded-md p-2 hover:bg-yellow-400' style={{ backgroundColor: '#FD900A', width: '230px', borderRadius: '8px' }}>
            <a href="https://yandex.ru/map-constructor" target="_blank" rel="noreferrer">Открыть Яндекс.Карты</a>
            </button>
             <RegButton type='button' className="mt-4 px-4 py-2 hover:bg-cyan-700 rounded select-none" 
                 onClick={()=>{ setShowMap(!showMap)}}>{
                  showMap ? 'Скрыть карту' 
                 : 
                 'Показать карту'}
             </RegButton>
             </div>
             {showMap&&(
                inputs?.coordinates? (
             <iframe src={`https://yandex.ru/map-widget/v1/?um=constructor%${inputs?.coordinates?inputs.coordinates:''}&amp;source=constructor`} 
               width="500"
               height="400"
                /> 
                )
                :
                (
                <h2>
                  Неккоректные данные
                </h2>
                )
             )
             
             }
            

            </div>

            <div className="w-full p-2 flex justify-around">
               
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Активности в туре</label>
                {[...Array(arraysCheckBox.activity.length).keys()].map(i => (
                  <div className={!showCheckBox && i>10?'hidden':''} key={i}>
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
                {[...Array(arraysCheckBox.housing.length).keys()].map(i => (
                  <div  key={i}>
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
                {[...Array(arraysCheckBox.facility.length).keys()].map(i => (
                  <div className={!showCheckBox && i>10?'hidden':''} key={i}>
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
                {[...Array(arraysCheckBox.facility.length).keys()].map(i => (
                  <div className={!showCheckBox && i>10?'hidden':''} key={i}>
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
                              
             <div className='flex flex-col'>
              <button type='button' onClick={()=>setShowCheckBox(!showCheckBox)} 
              className="mt-4 mb-12 px-4 py-2 w-52 h-10 bg-gray-400 hover:bg-gray-800 rounded text-white">
                {showCheckBox?'Скрыть':'Показать все услуги'}
                </button> 
              <button className="mt-4 px-4 py-2 w-52 h-10 bg-blue-600 hover:bg-blue-800 rounded text-white" >Сохранить тур</button>              
                  <div className={`absolute -mt-5 rounded p-1 bg-green-600 transition-opacity duration-1000
                   ${tourCreated ? 'opacity-100' : 'opacity-0'}`}>
                          Ваш тур успешно создан!
                  </div>
              </div>
              
          </form>
        )}
        
        <div className='allTours flex flex-wrap justify-around'>
                  {
                    dataTours.map(tour=>(
                      <>

                      {/* <MiniCardTourNew /> */}

                      <Card
                      key={tour.id}
                      style={{ width: 350, height: 400 }}
                      hoverable
                      className="mt-20 m-4 -p-3 flex flex-col justify-between"
                      actions={[                      
                      <EditOutlined key={tour.id} onClick={() => toggleVisibility(tour.id)} />,
                     <DeleteOutlined key="delete" onClick={() => deleteHandler(tour.id)} />,
                        <Link to={`/${tour.id}`}>  
                    <ArrowRightOutlined key="setting" />
                         </Link> 
                      ]}
                    >

                      <MiniCardTour {...tour} />
                      {visible[tour.id] && (
                        <EditTour
                          key={tour.id}
                          isAdmin={user.role === 'admin'}
                          visible={visible[tour.id]}
                          setVisible={(isVisible) => toggleVisibility(tour.id, isVisible)}
                          arraysCheckBox={arraysCheckBox}
                          tour={tour}
                          onUpdate={(updatedTour) => handlerUpdateTour(updatedTour)}
                        />
                      )}
                    </Card>
                    </>
                    ))
                  }
        </div>
      </div>
    </div>
    
  );
}

export default ParallaxPage;