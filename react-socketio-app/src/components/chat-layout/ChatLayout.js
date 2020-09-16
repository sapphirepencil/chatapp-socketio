import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import { Grid, Segment } from 'semantic-ui-react';
import ChatRoom from '../chatroom/ChatRoom';
import * as classes from './ChatLayout.css';
import RoomList from './room-list/RoomList';
import RoomsDashboard from './rooms-dashboard/RoomsDashboard';

const ChatLayout = ({
  onSendMessage,
  onMessageReceived,
  onJoinRoomsRequest,
  getJoinRoomsSuccess,
  getJoinRequestSent,
  setJoinRequestSent,
  getRooms,
  getRoomNames,
  onLogout,
  getAvailableRooms,
  getAvailableUsers
}) => {


  // currently active room
  const [ activeRoom, setActiveRoom ] = useState(getRoomNames()[0]);

  // For Header: currently active Tab
  const [ activeTab, setActiveTab ] = useState(activeRoom ? 'messages' : 'dashboard')


  useEffect(() => {
    // console.log(`ChatLayout rerendered, messages in ${activeRoom}: `, onMessageReceived(activeRoom));
  })

  const renderDashboard = () => {
    const availableRooms = getAvailableRooms();
    const availableUsers = getAvailableUsers();

    return  (availableRooms && availableUsers) 
      && <RoomsDashboard 
            availableRooms={availableRooms} 
            availableUsers={availableUsers} 
            onJoinRoomsRequest={onJoinRoomsRequest} 
            joinRoomsSuccess={getJoinRoomsSuccess}
            joinRequestSent={getJoinRequestSent()}
            setJoinRequestSent={setJoinRequestSent}
          />
  }

  const renderSection = (activeTab) => {
    switch (activeTab) {
      case 'messages': return !activeRoom ? 'Nothing to show!' : renderRoomsAndMessages();
      case 'dashboard': return renderDashboard();
      case 'notifications': return 'no notifications to show';
      default: return renderDashboard()
    }
  }

  const renderNotifications = () => {
    // return <Notifications joinRequestSent={getJoinRoomsSuccess} />
  }

  const renderRoomsAndMessages = () => {
    return (
      <Grid>
        <Grid.Column width={4}>
          {activeRoom && 
            <RoomList roomNames={getRoomNames()} activeTab={activeRoom} setActiveRoom={setActiveRoom} />
          }
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            {getRooms() &&
                ( <ChatRoom 
                activeRoom={activeRoom} 
                messages={onMessageReceived(activeRoom)} 
                onSendMessage={onSendMessage(activeRoom)} />)
            }
            </Segment>
        </Grid.Column>
      </Grid>
    )
  }

  return (
    
    <div className='container'>

      <Header onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab} />

      { renderSection(activeTab) }

    </div>
    
  )
}

export default ChatLayout;