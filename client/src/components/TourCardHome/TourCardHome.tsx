import React from 'react';
import { Card } from 'antd'; 

export default function TourCardHome() {
  return (
    <Card title={tour.name} style={{ width: 300 }}> 
    <p>{tour.title}</p>
    <p>{tour.price}</p>
    {/* условие, чтобы попадали те, у кого discount !== null */}
    <p>{tour.price}</p>
<p>Discount: {tour.discount ? 'Yes' : 'No'}</p> <p>Admin Choice: {tour.admin_choice ? 'Yes' : 'No'}</p> 
<p>Added Date: {tour.dateAdded}</p>
 </Card> 

  )
}
