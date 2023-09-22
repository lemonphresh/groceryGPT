import React, { useEffect, useState } from 'react';
import { Flex, Heading, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import JsPDF from 'jspdf';
import { CopyIcon, DownloadIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import { CarrotSpinner } from '../../atoms';
import theme from '../../theme';
import Doodles from '../../assets/doodles.png';
import MeasuringSpoons from '../../assets/measuringspoons.png';

const ViewInventory = () => {
  const { state } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const paperRowHeight = '32px';
  const paperFontSize = '24px';
  const paperFontLineHeight = '33px';

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
        setList(response.data);
        setIsLoading(false);
      }
    };

    getList();
  }, []);

  const todaysDate = new Date(Date.now()).toLocaleString().split(', ')[0].replaceAll('/', '-');
  const joinedList = list.map((i) => i.name).join('\n');
  const generatePDF = () => {
    const report = new JsPDF('portrait', 'pt', 'a4');
    report.text(joinedList, 10, 10);
    report.save(`current-inventory-${todaysDate}.pdf`);
  };
  const copyText = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(joinedList);
    } else {
      document.execCommand('copy', true, joinedList);
    }
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      marginY={['24px', '32px']}
      maxWidth={['100%', '512px']}
      textAlign="center"
      width="100%"
    >
      {isLoading ? (
        <Flex alignSelf="center" gridGap="16px" justifySelf="center">
          <CarrotSpinner key="carrot1" />
          <CarrotSpinner key="carrot2" />
          <CarrotSpinner key="carrot3" />
        </Flex>
      ) : (
        <Flex>
          {list.length === 0 ? (
            <Flex alignItems="center" flexDirection="column" justifyContent="center" width="100%">
              <Image
                alt="A set of stainless steel measuring spoons."
                filter="drop-shadow(-2px 3px 8px rgba(0, 0, 0, 0.3))"
                src={MeasuringSpoons}
                width={['175px', '250px']}
              />
              <Heading marginBottom="24px" marginTop={['32px', '48px']} size="lg">
                Oh! Your pantry is empty.
              </Heading>
              <Text>
                Start adding items to your pantry&apos;s inventory{' '}
                <Link to={`/pantry/${state.user.id}/inventory/edit`}>
                  <span style={{ color: theme.colors.blue[400], textDecoration: 'underline' }}>
                    here
                  </span>
                </Link>
                .
              </Text>
            </Flex>
          ) : (
            <Flex
              boxShadow="-3px 4px 8px 2px rgba(0, 0, 0, 0.2)"
              height="100%"
              id="paper"
              maxWidth={['100%', '512px']}
              minHeight="420px"
              position="relative"
              width="100%"
              _before={{
                content: '""',
                height: '100%',
                left: '40px',
                position: 'absolute',
                top: 0,
                width: '2px',
              }}
            >
              <Flex
                backgroundImage={`repeating-linear-gradient(${theme.colors.orange[50]} 0px, ${theme.colors.orange[50]} ${paperRowHeight}, ${theme.colors.cyan[200]} ${paperFontLineHeight})`}
                height="100%"
                id="pattern"
                width="100%"
              >
                <Flex
                  borderLeft={`2px ${theme.colors.pink[200]} solid`}
                  flexDirection="column"
                  fontFamily={theme.fonts.handwriting}
                  fontSize={paperFontSize}
                  id="pantry-inventory"
                  letterSpacing="1px"
                  lineHeight={paperFontLineHeight}
                  paddingY="40px"
                  position="relative"
                  marginLeft="56px"
                  paddingRight="16px"
                  width="100%"
                  wordBreak="break-word"
                >
                  <Heading
                    fontFamily={theme.fonts.handwriting}
                    lineHeight={paperFontLineHeight}
                    marginTop={['32px', undefined]}
                    width="fit-content"
                  >
                    Pantry Inventory
                  </Heading>
                  <UnorderedList marginLeft="48px" maxWidth="224px" width="fit-content">
                    {list.map((item) => (
                      <ListItem key={uuid4()}>{item.name}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
                <Image
                  aria-hidden
                  bottom="24px"
                  display={['none', 'block']}
                  height="fit-content"
                  filter="opacity(80%)"
                  position="absolute"
                  right="24px"
                  width={['96px', '148px', '148px', '148px']}
                  src={Doodles}
                />
                <button
                  aria-label="Copy this meal plan to your clipboard."
                  onClick={copyText}
                  style={{
                    backgroundColor: theme.colors.green[300],
                    borderRadius: '8px',
                    boxShadow: '2px 1px 2px 0px rgba(0, 0, 0, 0.1)',
                    padding: '4px',
                    position: 'absolute',
                    right: '64px',
                    top: '24px',
                    zIndex: 1,
                  }}
                  type="button"
                >
                  <CopyIcon color={theme.colors.white} height="24px" width="24px" />
                </button>
                <button
                  aria-label="Download your meal plan as a PDF."
                  onClick={generatePDF}
                  style={{
                    backgroundColor: theme.colors.blue[300],
                    borderRadius: '8px',
                    boxShadow: '2px 1px 2px 0px rgba(0, 0, 0, 0.1)',
                    padding: '4px',
                    position: 'absolute',
                    right: '24px',
                    top: '24px',
                    zIndex: 1,
                  }}
                  type="button"
                >
                  <DownloadIcon color={theme.colors.white} height="24px" width="24px" />
                </button>
              </Flex>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default ViewInventory;
