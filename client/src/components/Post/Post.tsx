import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from '@chakra-ui/react';
import type { PostPropsType } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchDelete } from '../../redux/thunkActions';

//! useAppSelector
//! useAppDispatch

function Post({ post }: PostPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const deleteHandler = async (): Promise<void> => {
    void dispatch(fetchDelete(post.id));
  };

  return (
    <Card margin="15px">
      <CardHeader fontSize={22}>
        <h1>{post.title}</h1> 
      </CardHeader>
      <CardBody>
        <p>{post.text}</p>
      </CardBody>
      <CardFooter flexDirection="column">
        <Button onClick={() => void deleteHandler()} colorScheme="blue" size="sm">
          DELETE
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Post;
