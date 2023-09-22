import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { KeywordInputForm } from '../../molecules';
import { Button, CarrotSpinner } from '../../atoms';
import theme from '../../theme';

const EditInventory = () => {
  const { state } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/get-user-ingredients`,
        {
          userId: state.user.id,
        }
      );

      if (response.data.errors) {
        throw new Error('We could not fetch your list! Please try again.');
      }

      if (response.data) {
        setList(response.data.map((item) => item.name).sort());
        setIsLoading(false);
      }
    };

    getList();
  }, []);

  const handleRemoveIngredient = (value) => {
    const idx = list.indexOf(value);

    if (idx > -1) {
      setList(list.filter((i) => i !== value));
    }
  };

  const onSubmit = async () => {
    const pantryInputValue = document.getElementById('pantryInput')?.value;
    let noDupes = [];
    if (pantryInputValue) {
      const keywordArr = pantryInputValue.split(', ');
      noDupes = [
        ...new Set(keywordArr.map((i) => i.trim()).filter((i) => !list.includes(i) && i !== '')),
      ];
    }
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/update-user-ingredients`,
      {
        userId: state.user.id,
        input: [...list, ...noDupes].sort(),
      }
    );

    if (!response.errors && !!response) {
      navigate(`/pantry/${state.user.id}/inventory/view`);
    }
  };

  return (
    <Flex
      alignItems="center"
      backgroundColor={theme.colors.pink[50]}
      borderRadius="14px"
      boxShadow="-3px 4px 8px 2px rgba(0, 0, 0, 0.1)"
      flex="1"
      flexDirection="column"
      marginY="48px"
      maxWidth={['100%', '512px']}
      padding="24px"
      paddingY="32px"
    >
      <Heading marginBottom="16px">Edit Inventory</Heading>
      <Text marginBottom="16px" marginX="8px">
        Add what ingredients you&apos;ve got in your kitchen so you can keep track of them and add
        them to the meal plan generator more easily.
      </Text>
      {isLoading ? (
        <Flex alignSelf="center" gridGap="16px" justifySelf="center">
          <CarrotSpinner key="carrot1" />
          <CarrotSpinner key="carrot2" />
          <CarrotSpinner key="carrot3" />
        </Flex>
      ) : (
        <Flex alignItems="center" flexDirection="column" justifyContent="center">
          <KeywordInputForm
            inputId="pantryInput"
            keywords={list}
            onAddKeyword={setList}
            onRemoveKeyword={handleRemoveIngredient}
          />
          <Button
            marginTop="24px"
            onClick={onSubmit}
            text="Update inventory"
            width={['100%', 'fit-content']}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default EditInventory;
