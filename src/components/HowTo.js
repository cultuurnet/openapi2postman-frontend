// Core modules imports are same as usual
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import styled from 'styled-components';
SwiperCore.use([Navigation, Pagination]);

const STEPS = [
  {
    id: 1,
    text: 'Start by clicking the "Import" button in Postman.',
  },
  {
    id: 2,
    text: 'Drag and drop or select the JSON file you downloaded. Postman should show an overview of the included API. Click "Import" to continue.',
  },
  {
    id: 3,
    text: 'After the collection has been imported, click on the button with three dots next to its name. Next, click the "Edit" button in the drop-down menu that appears.',
  },
  {
    id: 4,
    text: 'Make sure the "Auth" tab of the collection is active. Scroll all the way to the bottom of the "Auth" tab, and click "Get New Access Token".',
  },
  {
    id: 5,
    text: 'Wait for the success modal to close or click the "Proceed" button.',
  },
  {
    id: 6,
    text: 'A modal to manage your tokens should appear, with a detail view of the new token. Click "Use Token". You are now ready to start making requests! If your token expires, follow the steps to get new access token again.',
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 0;
  text-align: center;
`;

const HowTo = (props) => {
  return (
    <Container>
      <Title>Installation guide</Title>
      <Swiper
        slidesPerView={1}
        setWrapperSize={800}
        navigation
        pagination={{ clickable: true }}
      >
        {STEPS.map((step, index) => (
          <SwiperSlide key={`step_${index}`}>
            <img
              src={`/postman-step-${step.id}.png`}
              alt={`postman download step ${step.id}`}
              width={700}
              height={339}
            />
            <p>
              {`${step.id}.`} {step.text}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export { HowTo };
