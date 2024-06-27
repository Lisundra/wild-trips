import React, { useEffect, useState } from 'react';
import { Card, Avatar, Input, Button, Typography, Form, Upload } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Profile = ({ initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fileImg, setFileImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  

  useEffect(() => {
    axios.get('http://localhost:3100/api/users/user/get', { withCredentials: true })
      .then(res => {
        console.log("🚀 ~ useEffect ~ res:", res);
        setUser(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [editing]);

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleUploadChange = ({ fileList }) => {

    const file = fileList[0];
     if(file)
     setFileImg(file.originFileObj);

    if (file && file.status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file.originFileObj);
      
      setFileImg(file.originFileObj);

    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('full_name', user.full_name);
    formData.append('bio', user.bio);

    if (fileImg) {
      console.log("🚀 ~ handleSave ~ file:", fileImg)
      formData.append('profile_picture', fileImg);      
    }

    axios.put('http://localhost:3100/api/users', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('User updated successfully:', response.data);
        setEditing(false);
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  if (isLoading) {
    return (
      <>
        <br />
        <br />
        <br />
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <br /> <br /> <br />
      <Card className="max-w-md mx-auto mt-10 flex justify-center ">
        <div className="text-center">
          <Avatar
            size={128}
            icon={<UserOutlined />}
            src={imagePreview || user.profile_picture}
            className="mb-4"
          />
          {editing ? (
            <Upload
              listType="picture"
              beforeUpload={() => false}
              onChange={handleUploadChange}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          ) : null}
        </div>
        <Title level={3} className="text-center">{user.full_name}</Title>
        {editing ? (
          <Input
            value={user.full_name}
            onChange={(e) => handleChange('full_name', e.target.value)}
          />
        ) : null}
        <div className="mt-4">
          <Text strong>Email:</Text>
          <Text>{user.email}</Text>
        </div>
        <div>
          <Text strong>Login:</Text>
          <Text>{user.login}</Text>
        </div>
        <div>
          <Text strong>Role:</Text>
          <Text>{user.role}</Text>
        </div>
        <div className="mt-4">
          <Text strong>Bio:</Text>
          {editing ? (
            <TextArea
              rows={4}
              value={user.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          ) : (
            <Text>{user.bio}</Text>
          )}
        </div>
        <div className="mt-4">
          {editing ? (
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button type="primary" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default Profile;