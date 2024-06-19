import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel } from 'antd';
import Meta from 'antd/es/card/Meta';

// Стиль для контента слайда
const contentStyle = {
  margin: 0,
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function HomeCarousel() {
  const images = [
    '/src/assets/images/tigers.png',
    '/src/assets/images/fjord.png',
    '/src/assets/images/arctic.png',
    '/src/assets/images/rainforest.png',
  ];

  return (
    <Carousel autoplay autoplaySpeed={3500} arrows>
  {images.map((src, index) => (
    <div key={index}>
      <div style={contentStyle}>
        <img src={src} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  ))}
</Carousel>
  );
}

export default HomeCarousel;


// import React from 'react';
// import { Carousel, Card, Button } from 'antd';

// export default function HomeCarousel({ tours }) {
//   return (
//     <Carousel autoplay autoplaySpeed={2500} arrows>
//       {tours.map((tour) => (
//         <div key={tour.id}>
//           <Card
//             hoverable
//             cover={<img alt={tour.name} src={tour.images[0]?.image_path} />}
//           >
//             <h3>{tour.name}</h3>
//             <div>
//               <p>
//                 {tour.discount !== null ? (
//                   <>
//                     <span className="line-through mr-2">{tour.price}</span>
//                     <span>{tour.price - tour.discount}</span>
//                   </>
//                 ) : (
//                   tour.price
//                 )}
//               </p>
//               <p>{tour.start_date} - {tour.end_date}</p>
//               <Button type="primary" href={`/tour/${tour.id}`}>
//                 Посмотреть программу
//               </Button>
//             </div>
//           </Card>
//         </div>
//       ))}
//     </Carousel>
//   );
// }



