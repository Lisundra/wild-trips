import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, DatePicker, Select, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const EditTourModal = ({ tour, onUpdate, arraysCheckBox }) => {
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [form] = Form.useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [dataTour, setDataTour] = useState({
    Activities: [],
    Housings: [],
    Facilities: []
  });
  const [facilitiesPaid, setFacilitiesPaid] = useState({});
  const [facilitiesFree, setFacilitiesFree] = useState({});

  useEffect(() => {
    if (visible) {
      axios.get(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/tours/${tour.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const tourData = res.data;
        setDataTour(tourData);
        form.setFieldsValue({
          ...tour,
          start_date: tour.start_date ? moment(tour.start_date) : null,
          end_date: tour.end_date ? moment(tour.end_date) : null,
          activities: tourData.Activities.map(activity => activity.id),
          housings: tourData.Housings.map(housing => housing.id),
          facilities: tourData.Facilities.map(facility => facility.id),
        });
        setImagePreviews(tour.Images);

        const paidFacilities = {};
        const freeFacilities = {};
        tourData.Facilities.forEach(facility => {
          if (facility.TourOption.type) {
            paidFacilities[facility.id] = true;
          } else {
            freeFacilities[facility.id] = true;
          }
        });
        setFacilitiesPaid(paidFacilities);
        setFacilitiesFree(freeFacilities);

        
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [visible]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setImagePreviews([]);
    setFacilitiesPaid({});
    setFacilitiesFree({});
  };

  const handleFinish = (values) => {
    console.log("🚀 ~ handleFinish ~ values:", values)
    const formData = new FormData();
    console.log(facilitiesFree, facilitiesPaid)
    
        for (const key in facilitiesFree)
          if(facilitiesFree[key]===true)
          formData.append('facilitiesFree', (key));
        

    for (const key in facilitiesPaid)
    if(facilitiesPaid[key]===true)
    formData.append('facilitiesPaid', (key));

    for (const key in values) {
      if(!values[key])
      delete values[key]

      if (values.hasOwnProperty(key)) {
        if (key === 'images') {
          Object.values(values[key]).forEach((file) => {
            formData.append('images', file.originFileObj);
          });
        } else if (key === 'activities' || key === 'housings' || key === 'facilities') {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      }
    }

    images.forEach((image) => {
      formData.append('images', image);
    });

    console.log('data edit : ', formData.getAll('images'))
    axios.patch(`http://localhost:3100/api/tours/${tour.id}`, formData, { withCredentials: true })
      .then((res) => {
      console.log("🚀 ~ .then ~ res:", res)

        
        onUpdate(res.data);
        setVisible(false);
        form.resetFields();
        setImagePreviews([]);
        setFacilitiesPaid({});
        setFacilitiesFree({});
      })
      .catch((error) => {
        console.error('Ошибка при редактировании тура: ', error);
      });
  };

  const handleImageUpload = (fileList) => {
    const previews = [];
    const files = [];

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === fileList.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file.originFileObj);
      files.push(file.originFileObj);
    });

    setImages(files);
  };

  const handleFacilityChange = (type, facility) => {
    console.log(facilitiesFree, facilitiesPaid )
    if (type === 'paid') {
      setFacilitiesPaid((prev) => ({ ...prev, [facility]: !prev[facility] }));
      setFacilitiesFree((prev) => ({ ...prev, [facility]: false }));
    } else {
      setFacilitiesFree((prev) => ({ ...prev, [facility]: !prev[facility] }));
      setFacilitiesPaid((prev) => ({ ...prev, [facility]: false }));
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Изменить
      </Button>
      <Modal
        title="Редактировать тур"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Название тура" name="title" rules={[{ required: false, message: 'Пожалуйста, введите название тура' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Краткое описание" name="subtitle" rules={[{ required: false, message: 'Пожалуйста, введите краткое описание' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Начало тура" name="start_date" rules={[{ required: false, message: 'Пожалуйста, выберите дату начала тура' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Конец тура" name="end_date" rules={[{ required: false, message: 'Пожалуйста, выберите дату окончания тура' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Подробное описание" name="description" rules={[{ required: false, message: 'Пожалуйста, введите подробное описание' }]}>
            <TextArea />
          </Form.Item>
          <Form.Item label="Цена тура" name="price" rules={[{ required: false, message: 'Пожалуйста, введите цену тура' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Скидка на тур" name="discount">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Страна тура" name="country" rules={[{ required: false, message: 'Пожалуйста, введите страну тура' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Регион тура" name="region" rules={[{ required: false, message: 'Пожалуйста, введите регион тура' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Сезон" name="season" rules={[{ required: false, message: 'Пожалуйста, выберите сезон' }]}>
            <Select>
              <Option value="весна">весна</Option>
              <Option value="лето">лето</Option>
              <Option value="осень">осень</Option>
              <Option value="зима">зима</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Сложность" name="difficulty" rules={[{ required: false, message: 'Пожалуйста, выберите сложность' }]}>
            <Select>
              <Option value="низкая">низкая</Option>
              <Option value="средняя">средняя</Option>
              <Option value="высокая">высокая</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Можно с детьми" name="family_friendly" rules={[{ required: false, message: 'Пожалуйста, выберите вариант' }]}>
            <Select>
              <Option value={1}>Да</Option>
              <Option value={0}>Нет</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Виды деятельности" name="activities">
            <Checkbox.Group>
              {arraysCheckBox.activity.map((activity) => (
                <Checkbox key={activity.id} value={activity.id} defaultChecked={dataTour.Activities.some(a => a.id === activity.id)}>
                  {activity.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Типы жилья" name="housings">
            <Checkbox.Group>
              {arraysCheckBox.housing.map((housing) => (
                <Checkbox key={housing.id} value={housing.id} defaultChecked={dataTour.Housings.some(h => h.id === housing.id)}>
                  {housing.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Оплатить дополнительно</label>
            {arraysCheckBox.facility.map((facility) => (
              <div key={facility.id}>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2 size-5"
                    checked={facilitiesPaid[facility.id] || false}
                    onChange={() => handleFacilityChange('paid', facility.id)}
                  />
                  {facility.name}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Включено в стоимость</label>
            {arraysCheckBox.facility.map((facility) => (
              <div key={facility.id}>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2 size-5"
                    checked={facilitiesFree[facility.id] || false}
                    onChange={() => handleFacilityChange('free', facility.id)}
                  />
                  {facility.name}
                </label>
                  </div>
                ))}
              </div>
          <Form.Item label="Загрузить фото тура" name="images">
            <Upload
              listType="picture"
              multiple
              beforeUpload={() => false}
              onChange={({ fileList }) => handleImageUpload(fileList)}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                {imagePreviews.map((src, index) => (
                  <img key={index} src={src} alt={`preview ${index}`} className="w-full h-full object-cover m-2" />
                ))}
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTourModal;
