import React, { useState } from 'react';
import '../../App.css';

const MyTours = () => {
  const [showForm, setShowForm] = useState(false);
  const [facilitiesPaid, setFacilitiesPaid] = useState({});
  const [facilitiesFree, setFacilitiesFree] = useState({});

  const handleFacilityChange = (type, facility) => {
    if (type === 'paid') {
      setFacilitiesPaid((prev) => ({ ...prev, [facility]: !prev[facility] }));
      setFacilitiesFree((prev) => ({ ...prev, [facility]: false }));
    } else {
      setFacilitiesFree((prev) => ({ ...prev, [facility]: !prev[facility] }));
      setFacilitiesPaid((prev) => ({ ...prev, [facility]: false }));
    }
  };

  return (
    <div className="relative bg-cover bg-fixed bg-center min-h-screen" style={{ backgroundImage: `url('/mnt/data/minimalist-mountain-silhouette-tjcyhlhkky04umjt.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold">Welcome to Adventure Tours</h1>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded"
          onClick={() => setShowForm(true)}
        >
          Создать тур
        </button>

        {showForm && (
          <form className="mt-8 bg-white text-black p-6 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Название тура</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Краткое описание</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Начало тура</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Конец тура</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Подробное описание</label>
              <textarea className="w-full p-2 border rounded"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Цена тура</label>
              <input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Скидка на тур</label>
              <input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Страна тура</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Регион тура</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Сезон</label>
              <select className="w-full p-2 border rounded">
                <option>весна</option>
                <option>лето</option>
                <option>осень</option>
                <option>зима</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Сложность</label>
              <select className="w-full p-2 border rounded">
                <option>низкая</option>
                <option>средняя</option>
                <option>высокая</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Можно с детьми</label>
              <select className="w-full p-2 border rounded">
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Активности в туре</label>
              {[...Array(10).keys()].map(i => (
                <div key={i}>
                  <label>
                    <input type="radio" name="activities" className="mr-2" />
                    Активность {i + 1}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Проживание</label>
              {[...Array(10).keys()].map(i => (
                <div key={i}>
                  <label>
                    <input type="radio" name="accommodations" className="mr-2" />
                    Проживание {i + 1}
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
                      className="mr-2"
                      checked={facilitiesPaid[`facility${i + 1}`] || false}
                      onChange={() => handleFacilityChange('paid', `facility${i + 1}`)}
                    />
                    Удобство {i + 1}
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
                      className="mr-2"
                      checked={facilitiesFree[`facility${i + 1}`] || false}
                      onChange={() => handleFacilityChange('free', `facility${i + 1}`)}
                    />
                    Удобство {i + 1}
                  </label>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-800 rounded">Сохранить тур</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyTours;