// src/components/OurClients.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const clients = [
  {
    name: '',
    img: 'https://www.synnectify.com/images/clients/Rudra1.png',
    alt: 'rudra',
  },
  {
    name: '',
    img: 'https://www.synnectify.com/images/clients/odcet.png',
    alt: 'odcet',
  },
  {
    name: '',
    img: 'https://www.synnectify.com/images/clients/logo.png',
    alt: 'oneday',
  },
  {
    name: '',
    img: 'https://imagekit.io/public/share/wehbarmxp7/f77c31d6cfc2eaf2ed37e16cfcc2f634cac8e8e8bad49721542b57379b4b1626f4f0f77f779051376d4a9db13dc56865f544eaa0d0058bd79c117176b15d3b6637a2cbd973e4f0f178c6319566c10fd5',
    alt: 'Synnectify',
  },
  {
    name: '',
    img: 'https://guardianhomecare.net/assets/img/logo.png',
    alt: 'guardianhomecare',
  },
  {
    name: '',
    img: 'https://jravahfoods.com/images/JR%20small.png',
    alt: 'jravahfoods',
  },
  {
    name: '',
    img: 'https://gissllc.com/assets/custom/images/giss1.png',
    alt: 'global',
  },
  {
    name: '',
    img: 'https://myonlinetaxreturn.com/assets/images/logo-orange.png',
    alt: 'myonlinetaxreturn',
  },
  {
    name: '',
    img: 'https://bestinsurancedeal.net/img/logos/logo.png',
    alt: 'bestinsurancedeal',
  },
];

const OurClients: React.FC = () => {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {clients.map((client, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                padding: 24,
                minHeight: 250,
                justifyContent: 'center',
              }}
            >
              <img
                src={client.img}
                alt={client.alt}
                style={{
                  maxWidth: 180,
                  maxHeight: 120,
                  objectFit: 'contain',
                  marginBottom: 16,
                }}
              />
              <span style={{ fontWeight: 600, fontSize: 18 }}>{client.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurClients;