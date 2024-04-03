import React, { useEffect, useState } from 'react';
//useState updates as it renders
export default function DailyLog() {

    const [dailyLog, setDailyLog] = useState ({});
    const [loading, setLoading] = useState(false); //conditional rendering
    const [date, setDate] = useState(null);

//should fetch data from DailyLogController

    // useEffect(() => {
    //     setLoading(true);

    //     fetch('http://localhost:8080/api/dailylog')
    //       .then(response => response.json())
    //       .then(data => {setDailyLog(data);
    //                      setLoading(false);
    //                      console.log(dailyLog);
    //       })
    //       .catch(error => console.error('Error fetching data:', error));

    //       let todaysDate = dailyLog.date.date;
    //       setDate(todaysDate);
    //   }, []);
      
      async function fetchData() {
        let response = await fetch("http://localhost:8080/api/dailylog"); //await returns promise to allow to receive data "after the fact". fetch url for controller you receiving data from
        let data = await response.json() //convert response to json
        .then( data => {
            setDailyLog(data)
            let todaysDate = data.date.date
            setDate(todaysDate)
            setLoading(false)
            });
        };

      useEffect(() => {
        setLoading(true);
        fetchData();
        console.log(dailyLog);
        console.log(date);
      }, []);
      

//As of now just attempting to return the current date as a header

        if(loading) {
            return <p>loading...</p>
        }
        return (
            <div className='dailyLog'>
                <h1 id ='date'>{date}</h1>
                <div id='calories'>Today's Calories: </div>

            </div>
        )
};