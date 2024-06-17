import { Input, Button } from '@chakra-ui/react';

import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

import type { InputsType } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAdd } from '../../redux/thunkActions';


//! useAppSelector ?optional if needed
//! useAppDispatch

export default function Form(): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>({ title: '', text: '' });

  const dispatch = useAppDispatch();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (): Promise<void> => {
    void dispatch(fetchAdd(inputs));
  };

  return (
    <div>
      <Input
        margin={15}
        onChange={changeHandler}
        value={inputs.title}
        placeholder="title"
        name="title"
        size="sm"
      />
      <Input
        margin={15}
        onChange={changeHandler}
        value={inputs.text}
        placeholder="text"
        name="text"
        size="sm"
      />
      <Button onClick={() => void submitHandler()} colorScheme="blue" variant="outline" size="sm">
        ADD
      </Button>
    </div>
  );
}
