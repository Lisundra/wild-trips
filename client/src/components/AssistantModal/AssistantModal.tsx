import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const AssistantModal = ({ userName, userEmail,visible, setVisible  }) => {
  const [name, setName] = useState(userName ? userName : '');
  console.log("🚀 ~ AssistantModal ~ name:", name)
  const [email, setEmail] = useState(userEmail ? userEmail : '');
  console.log("🚀 ~ AssistantModal ~ email:", email)
  const [isRegistered, setIsRegistered] = useState(userEmail?.length>0)  

  
  const handleOk = () => {
    setVisible(false);
    // Handle form submission logic here
  };

  return (
    <Modal
      title={
        <div className="flex items-center">
          <img src="src/assets/avatars/assist.png" alt="Григорий" className="w-8 h-8 rounded-full mr-2" />
          <span className="text-lg font-medium">Григорий</span>
        </div>
      }
      visible={visible}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Забронировать
        </Button>,
      ]}
    >
      <div className="text-gray-600 mb-4">
        <p> Здравствуйте, я ваш персональный менеджер Григорий.</p>
        <p>Пожалуйста, оставьте свои контактные данные.</p>
        <p>Мы обязательно свяжемся с вами для подтверждения заявки!</p>      
      </div>
      {!isRegistered ? (
        <div className="space-y-4">
          <Input
            placeholder="Имя Фамилия"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      ) : (

        <div className="space-y-4">
        
          <Input
            placeholder="Имя Фамилия"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <div>Ваше имя: {name}</div>
          <div>Ваша почта: {email}</div> */}
        </div>
      )}
    </Modal>
  );
};

export default AssistantModal;
