import React from "react";
import ButtonConnect from "../ButtonConnect";
import axios from 'axios'


const CallTeleMessage = () => {
  const repeatTime = 1000 * 60 * 25
  const GROUP_REPORT_ID = '-4230847087'
  
  function getVNDate(date) {
    const options = {
      // weekday: "long",
      // year: "numeric",
      // month: "long",
      day: "numeric",
      timeZone: 'Asia/Ho_Chi_Minh' 
    };
    const day = date.toLocaleDateString("vi-VN", options);
    const newDate = date.toLocaleDateString("vi-VN",{weekday: "long", year: "numeric", month: "long", day: "numeric",  timeZone: 'Asia/Ho_Chi_Minh'});
    const hour = date.toLocaleTimeString("vi-VN", { hour: "2-digit",  timeZone: 'Asia/Ho_Chi_Minh' });
    const hourAnMins = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: '2-digit', second:'2-digit',  timeZone: 'Asia/Ho_Chi_Minh' });
  
    return {hour,day, date: `${newDate} ${hourAnMins}`}
  }
  
  const callNotiOnTelegram = () => {
    console.log('on noti');
    const timeRecursive = setInterval(async () => {
      const getDate = getVNDate(new Date())
      const {hour, day, date} = getDate
      const isWeekend = date => date.getDay() % 6 === 0;
  
      console.log('on', {getDate, isWeekend: isWeekend(new Date())});
      
      if(isWeekend(new Date())) return // Sunday: 8, Sat: 7
      if(String(hour) === '10' || String(hour) === '11'){ 
        // const getTime = dayjs(new Date()).format('HH:mm DD/MM/YYYY')
        const getTime = date
        await axios.get('https://api.telegram.org/bot7454988198:AAFZiDj-ij5jX9p03Wv9VC97OWOtZuK-_Bc/sendMessage', {
          params: { chat_id: GROUP_REPORT_ID, text: `Daily report ${getTime}.` }
        })
      }
      }, repeatTime);
    
  }
  return (
    <ButtonConnect
      titleBtn='Call Tele Message'
      onClick={callNotiOnTelegram}
      isHideShowCode
    />
  );
}
 
export default CallTeleMessage;