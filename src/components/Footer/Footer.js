/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageInputSmall, VirtualizedMessageList, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

import './chat.css'

function Footer() {

   const chatClient = StreamChat.getInstance('c2haffg3cpbd');
const userToken = localStorage.getItem("chat");
chatClient.connectUser(
  {
    id: localStorage.getItem("username"),
    name: localStorage.getItem("username"),
    image: 'https://getstream.io/random_png/?id=weathered-king-9&name=weathered',
  },
  userToken,
);

const channel = chatClient.channel('livestream', 'ANTEAGLE', {
  image: 'https://goo.gl/Zefkbx',
  name: 'ANTEAGLE',
});


  return (
    
    <footer className="footer">

      <Chat client={chatClient} theme='livestream dark'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader live />
        <VirtualizedMessageList />
        <MessageInput style={{width:"100%"}} Input={MessageInputSmall} focus />
      </Window>
    </Channel>
  </Chat>
        <div className="copyright" style={{margin:"auto"}}>
         {"                   "} © {new Date().getFullYear()} Powered by{" "}
          <a
            href="https://www.creative-tim.com/?ref=bdr-user-archive-footer"
            target="_blank"
          >
            ipfs.co.in
          </a>{" "}
  
        </div>

    </footer>
    
  );
}

export default Footer;
