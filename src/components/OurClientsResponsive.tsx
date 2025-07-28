import React from 'react';
import OurClients from './OurClients';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Use the same clients array as in OurClients.tsx
const clients = [
  {
    name: 'RUDRA',
    img: 'https://www.synnectify.com/images/clients/Rudra1.png',
    alt: 'rudra',
  },
  {
    name: 'odcet',
    img: 'https://www.synnectify.com/images/clients/odcet.png',
    alt: 'odcet',
  },
  {
    name: 'oneday',
    img: 'https://www.synnectify.com/images/clients/logo.png',
    alt: 'oneday',
  },
  {
    name: 'Synnectify',
    img: 'https://ik.imagekit.io/wehbarmxp7/image.png?updatedAt=1753424827730',
    alt: 'Synnectify',
  },
  {
    name: 'guardianhomecare',
    img: 'https://guardianhomecare.net/assets/img/logo.png',
    alt: 'guardianhomecare',
  },
  {
    name: 'jravahfoods',
    img: 'https://jravahfoods.com/images/JR%20small.png',
    alt: 'jravahfoods',
  },
  {
    name: 'global',
    img: 'https://gissllc.com/assets/custom/images/giss1.png',
    alt: 'global',
  },
  {
    name: 'myonlinetaxreturn',
    img: 'https://myonlinetaxreturn.com/assets/images/logo-orange.png',
    alt: 'myonlinetaxreturn',
  },
  {
    name: 'bestinsurancedeal',
    img: 'https://bestinsurancedeal.net/img/logos/logo.png',
    alt: 'bestinsurancedeal',
  },
];

const PanoramaSwiper: React.FC = () => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      loop={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Autoplay, Pagination]}
      className="panoramaSwiper"
      style={{ minHeight: 350 }}
      breakpoints={{
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
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

const OurClientsResponsive: React.FC = () => (
  <>
    {/* Mobile only: show original cards animation */}
    <div className="block md:hidden">
      <OurClients />
    </div>
    {/* Tablet and Desktop only: show panorama animation */}
    <div className="hidden md:block">
      <PanoramaSwiper />
    </div>
  </>
);

export default OurClientsResponsive;