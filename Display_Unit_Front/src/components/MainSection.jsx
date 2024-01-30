import React, { useState, useEffect } from "react";
import EventSection from "./EventSection";
// import { get } from "mongoose";

export default function MainSection() {
  const [hotSessions, setHotSessions] = useState([]);
  const [registeredSessions, setRegisteredSessions] = useState([]);
  const [rfidNo, setRfidNo] = useState('');
  const [userName, setUserName] = useState('');

  const fetchAndSetRegisteredSessions = async (rfidNo) => {
    const sessionIds = await fetchSessionIds(rfidNo);
    const sessionDetails = await fetchSessionDetails(sessionIds);
    console.log('sessionDetailssss', sessionDetails);
    setRegisteredSessions(sessionDetails);
  };

  useEffect(() => {
    // const defaultRfidNo = '003';

    const defaultRfidNo = new URLSearchParams(window.location.search).get('id') || '1894-75';
    // const defaultRfidNo = new URLSearchParams(window.location.search).get('id');
    console.log('--------------defaultRfidNo', defaultRfidNo);
    setRfidNo(defaultRfidNo);

    // Fetch and set registered sessions when the component mounts
    fetchAndSetRegisteredSessions(defaultRfidNo);
  }, []);

  // Fetch and set registered sessions whenever rfidNo changes
  useEffect(() => {
    if (rfidNo) {
      fetchAndSetRegisteredSessions(rfidNo);
    }
  }, [rfidNo]);

  const fetchSessionIds = async (rfidNo) => {
    try {
      // const rfidNo = '002';
      // console.log('_________rfidNo', rfidNo);
      
      const userid = await fetch(`http://13.201.130.222:5001/api/attendees/rfidNo/${rfidNo}`);
      // const userid = await fetch(`http://localhost:5001/api/attendees/rfidNo/${rfidNo}`);
      const useridData = await userid.json();
      const user_id = useridData.userId;

      // console.log('**********************', user_id);

      const userData = await fetch(`http://13.201.130.222:5001/api/attendees/rfid/${rfidNo}`);
      // const userData = await fetch(`http://localhost:5001/api/attendees/rfid/${rfidNo}`);
      const userDataData = await userData.json();
      const userName = userDataData.name;    
      setUserName(userName);      
      console.log('__________useridData', userName);

      // const response = await fetch(`http://localhost:5001/api/sessionreg/rfid/${user_id}`);
      const response = await fetch(`http://13.201.130.222:5001/api/sessionreg/rfid/${user_id}`);
      const data = await response.json();
  
      console.log('_____data', data);
      if (response.ok) {
        return data.sessionIds;
      } else {
        console.error('Error fetching session ids:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching session ids:', error);
      return [];
    }
  };

  const getConferenceName = async (conferenceId) => {    
    const getNameResponse = await fetch(
      `http://13.201.130.222:5001/api/conferences/${conferenceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const getNameResponseData = await getNameResponse.json();
    // console.log("((((((((((", getNameResponse)

    if (getNameResponse.ok) {
      console.log("jshabdjhadb", getNameResponseData);
      return getNameResponseData.conferenceDetails
    }
  };

  const fetchSessionDetails = async (sessionIds) => {
    try {
      // Array to store session details for each session ID
      const sessionDetailsArray = [];
  
      // Iterate over session IDs and fetch details for each
      for (const sessionId of sessionIds) {
        // const sessionDetailsResponse = await fetch(`http://localhost:5001/api/conferences/sessions/${sessionId}`, {
        const sessionDetailsResponse = await fetch(`http://13.201.130.222:5001/api/conferences/sessions/${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const sessionDetailsData = await sessionDetailsResponse.json();
        console.log('sessionDetailsResponse', sessionDetailsData);

        const confIdRes = await fetch(`http://13.201.130.222:5001/api/conferences/conferenceId/${sessionId}`, {
        // const confIdRes = await fetch(`http://localhost:5001/api/conferences/conferenceId/${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const confId = await confIdRes.json();
        console.log("%%%%%%%%%", confId.conferenceId);
  
        if (sessionDetailsResponse.ok) {
          const cName = await getConferenceName(confId.conferenceId);
          console.log("^^^^^^^^",cName)
          const updated = { ...sessionDetailsData, conferenceDetails: cName };
          // sessionDetailsArray.push(sessionDetailsData);
          console.log("UP",updated);
          // console.log(sessionDetailsData)
          sessionDetailsArray.push(updated);
        } else {
          console.error(`Error fetching session details for session ID ${sessionId}:`, sessionDetailsData.message);
        }
      }
  
      return sessionDetailsArray;
    } catch (error) {
      console.error('Error fetching session details:', error);
      return [];
    }
  };
  
  useEffect(() => {
    const fetchHotSessions = async () => {
      try {
        const topSessionsResponse = await fetch("http://13.201.130.222:5001/api/currentattendee/topSessions");
        // const topSessionsResponse = await fetch("http://localhost:5001/api/currentattendee/topSessions");
        const topSessionsData = await topSessionsResponse.json();

        // console.log('topSessionsData', topSessionsData);
        if (!topSessionsResponse.ok) {
          console.error(`Error fetching top sessions: ${topSessionsData.message}`);
          return [];
        }

        const conferenceIds = topSessionsData.conferenceIds;
        // console.log('conferenceIds', conferenceIds);
        const hotSessionsList = [];

        for (const conferenceId of conferenceIds) {
          // const conferenceRoom = await fetch(`http://localhost:5001/api/conferences/${conferenceId}`);
          const conferenceRoom = await fetch(`http://13.201.130.222:5001/api/conferences/${conferenceId}`);
          const confRoomName = await conferenceRoom.json();    

          const sessionDetailsResponse = await fetch(`http://13.201.130.222:5001/api/conferences/${conferenceId}/sessions`);
          // const sessionDetailsResponse = await fetch(`http://localhost:5001/api/conferences/${conferenceId}/sessions`);
          const sessionDetailsData = await sessionDetailsResponse.json();
          // console.log('sessionDetailsData: --', sessionDetailsData);
          
          if (sessionDetailsResponse.ok) {
            for (const session of sessionDetailsData.sessionDetails) {
              const startTime = new Date(session.startTime);
              const endTime = new Date(session.endTime);
              const currentTime = new Date();

              // Format the dates to the desired format
            const formattedStartTime = startTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const formattedEndTime = endTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const ToformattedCurrentTime = currentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            // Convert the formatted string to a Date object
            const CurrentTime = new Date(ToformattedCurrentTime);
            const StartTime = new Date(formattedStartTime);
            const EndTime = new Date(formattedEndTime);
            
            // substract 15 hours
            const formatted_StartTime = new Date(
              StartTime.getFullYear(),
              StartTime.getMonth(),
              StartTime.getDate(), 
              StartTime.getHours() - 15,
              StartTime.getMinutes(),
              StartTime.getSeconds(),
              );

            const formatted_EndTime = new Date(
              EndTime.getFullYear(),
              EndTime.getMonth(),
              EndTime.getDate(), 
              EndTime.getHours() - 15,
              EndTime.getMinutes(),
              EndTime.getSeconds(),
              );

            // Subtract 19 hours 
            const formattedCurrentTime = new Date(
            CurrentTime.getFullYear(),
            CurrentTime.getMonth(),
            CurrentTime.getDate(), 
            CurrentTime.getHours() - 19,
            CurrentTime.getMinutes(),
            CurrentTime.getSeconds(),
            );

            const adjusted_StartTime = formatted_StartTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const adjusted_EndTime = formatted_EndTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
            const adjustedTime = formattedCurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });

            // console.log('Start Time:', adjusted_StartTime);
            // console.log('End Time:', adjusted_EndTime);
            // // console.log('Current Time:', formattedCurrentTime);
            // // console.log('Current Time:', CurrentTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' }));
            // console.log('Adjusted Time:', adjustedTime);
            // console.log('________________ conferenceName: ', confRoomName.conferenceDetails);
            
              if (formatted_StartTime <= formattedCurrentTime && formattedCurrentTime <= formatted_EndTime) {
                hotSessionsList.push({
                  conferenceId: conferenceId,
                  conferenceDetails: confRoomName.conferenceDetails,  
                  sessionName: session.sessionName,
                  SessionDetails: session.sessionDetails,
                  speaker: session.speaker,
                  startTime: adjusted_StartTime,
                  endTime: adjusted_EndTime,
                  MaxCapacity: session.maxAttendeeCap,
                  // CurrentCapacity: session.currentCapacity,
                });
              }
            }
          } else {
            console.error(`Error fetching session details for conferenceId ${conferenceId}: ${sessionDetailsData.message}`);
          }
        }

        console.log('Ongoing Sessions List:', hotSessionsList);
        setHotSessions(hotSessionsList);
      } catch (error) {
        console.error(`Error fetching hot sessions: ${error}`);
      }
    };

    // Call the fetchHotSessions function when the component mounts or when rfidNo changes
    fetchHotSessions();
  }, [rfidNo]);

  return (
    // w-full flex flex-row gap-4
    // Container for the main section with flex layout
    <div className="w-full flex flex-row gap-4 background">
      
      <div className="flex h-screen sticky top-0 items-start flex-col justify-start">
   
        <img
          src="./eventflow_color.svg"
          alt="logo"
          className="w-64 h-auto m-3 mb-11"
        />
        {/* Background image */}

        <img
          src="./bg.png"
          alt="background"
          className="lg:w-200 lg:h-200 md:w-50 md:h-50 overflow-hidden justify-center items-center mt-0 lg:ml-11 sm:ml-3  transition duration-300 ease-in-out transform hover:scale-105 "
    
        />
      </div>
      {/* Main content area with upcoming and registered events */}

      <div className="flex flex-col gap-2 justify-start items-center flex-1">
        {/* Input for entering rfidNo */}
        <pre></pre>
        <pre></pre>
        {/* <pre></pre> */}
        <h1 className="text-3xl font-bold text-black cr1">Welcome to EventFlow, {userName}</h1>
        <pre></pre>
        <input type="text" value={rfidNo} onChange={(e) => setRfidNo(e.target.value)} placeholder="RfidNo" />
      <div className="cr1">
       
        <EventSection events={registeredSessions} title="Registered Sessions" />
      <div className="sec2">
      
        <EventSection  events={hotSessions} title="Headline Sessions" />
        </div>
      
        </div>
      </div>
    </div>
  );
}
