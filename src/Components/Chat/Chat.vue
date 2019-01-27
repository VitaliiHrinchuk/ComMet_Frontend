<template lang="html">
    <div>
      <div class="chatHeader">
        <span class="chatHeader__back"><i class="fas fa-chevron-left"></i></span>
        <h1 class="chatHeader__title">Chat</h1>
      </div>
      <div class="container container-chat">
        <div id="chatWindow" class="chatWindow">
          <div class="chatMessage"
              :class="{'chatMessage-current' : (msg.username === 'currentUser')}"
              v-for=' msg in messages'

              >
            <div class="chatMessage__photo"
                :style="{ 'backgroundImage': 'url(\'' + tempAvatar + '\')' }">
            </div>
            <p class="chatMessage__text"
              :class="{'chatMessage__text-current' : (msg.username === 'currentUser')}">{{msg}}</p>
          </div>
        </div>
        <div class="chatInput">
          <textarea id="msgArea"
                    class="chatInput__area"
                    placeholder="Type a message"
                    v-model='currentMessage'
                    @keyup.enter.exact='sendMessage()'
                    ></textarea>
          <button class="chatInput__send" type="button"
                  v-if=" currentMessage !='' "
                  @click='sendMessage()'
                  ><i class="far fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    id:{ required: true }
  },
  data(){
    return{
      tempAvatar: require('../../assets/images/avatar__temp.jpg'),
      // messages: [
      //   {username: 'test', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut en'},
      //   {username: 'test2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'},
      //   {username: 'currentUser', text: 'hey all ma dudes'},
      //   {username: 'test2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'},
      //   {username: 'currentUser', text: "how r u?"},
      // ],
      messages: [],
      currentMessage: '',
      chatSocket: null
    }
  },
  methods:{
    sendMessage(){
      // if(this.currentMessage.trim() !== ''){
      //   this.messages.push({username: 'currentUser', text: this.currentMessage});
      //   this.currentMessage = '';
      //   setTimeout(this.toBottomOfChat, 0);
      // }
      this.chatSocket.send(JSON.stringify({
            'message': this.currentMessage
        }));
      this.currentMessage = '';
    },
    toBottomOfChat(){
      document.getElementById('chatWindow').scrollTop = document.getElementById('chatWindow').scrollHeight;
      console.log(document.getElementById('chatWindow').scrollTop);
      console.log(document.getElementById('chatWindow').scrollHeight);
    }
  },
  created(){

    this.chatSocket = new WebSocket(
      'wss://comeandmeet.herokuapp.com/ws/chat/' + this.id + '/');
      this.chatSocket.onmessage = (e)=> {
           var data = JSON.parse(e.data);
           this.messages.push(data.message);
       };

       this.chatSocket.onclose = function(e) {
           console.error('Chat socket closed unexpectedly');
       };
  },
  mounted(){

    var msgArea = document.getElementById('msgArea');
    function resize () {
        msgArea.style.height = 'auto';
        if(msgArea.scrollHeight < 100){
          msgArea.style.height = msgArea.scrollHeight+'px';
        } else {
          msgArea.style.height = 100+'px';
        }

    }

    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    msgArea.addEventListener('change',resize);
    msgArea.addEventListener('cut',delayedResize);
    msgArea.addEventListener('paste',delayedResize);
    msgArea.addEventListener('drop',delayedResize);
    msgArea.addEventListener('keydown', delayedResize);

    this.toBottomOfChat();

  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
.chatHeader{
  height: 50px;
  position: fixed;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  z-index: 4;
  margin-bottom: 1px;
  box-shadow: 1px 1px 1px rgba(0,0,0,.1);
  // border-bottom: 1px solid rgba(0, 0, 0, .25);
  &__title{
    margin-left: auto;
    margin-right: auto;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.5em;
    letter-spacing: 0.1em;
  }
  &__back{
    font-size: 2em;
    color: $primary-color;
    cursor: pointer;
  }
}
.chatWindow{
  background: #fff;
  height: 80vh;
  overflow: auto;
  padding: 20px;
  padding-top: 70px;
  z-index: 2;
  box-shadow: 1px 1px 1px rgba(0,0,0,.1);
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    height: 15px;
    box-shadow: inset 0 0 10px 10px $primary-color;
    border: solid 2px transparent;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    box-shadow: inset 0 0 10px 10px #31A5CC;
    border: solid 1px transparent;
  }

}

.chatMessage{

  font-size: .9em;
  display: flex;
  margin-top: 20px;
  font-family: "Roboto";
  &-current{
    flex-direction: row-reverse;
  }
  &__photo{
    position: relative;
    background-position: center center;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    margin: 0 15px;
    order: 1;
    align-self: flex-end;
  }
  &__text{
    max-width: 65%;
    padding: 15px 15px;
    margin: 0;
    position: relative;
    top: -30px;
    background-color: #f7f8fd;
    border-radius: 20px 20px 20px 0px;
    overflow: auto;
    order: 2;
    word-wrap: break-all;
    white-space: pre-line;
    &-current{
      background: #cdeafc;
      border-radius:20px 20px 0 20px;

    }
  }
}
.chatInput{
  width: 100%;
  border-top: 1px solid rgba(0,0,0,.25);
  box-shadow: 1px 1px 1px rgba(0,0,0,.1);
  padding-right: 20px;
  background: #fff;
  display: flex;

  &__area{
    min-height: 100%;
    width: 95%;
    padding: 0 10px;
    padding-top: 18px;
    border: none;
    font-family: 'Roboto';
    resize: none;
    outline: none;
  }
  &__send{
    font-size: 1.7em;
    align-self: center;
    background: transparent;
    border:none;
    margin-left: auto;
    color: $primary-color;
    cursor: pointer;
    animation-name: fade-out;
    animation-duration: .3s;
    &:hover{
      color: #31A5CC;
    }
  }
}
@keyframes fade-out{
  from{
    transform: scale(.7);
  }
  to{
    transform: scale(1);
  }
}
@media screen and (max-width: 1368px){

}
@media screen and (max-width: 1120px){

}
@media screen and (max-width: 960px){
  .container{
    &-chat{
      padding: 0;
    }
  }
  .chatWindow{
    font-size: .7em;
    padding: 10px 0;
  }
}

@media screen and (max-width: 768px){
  .chatMessage{
    &__photo{
      width: 40px;
      height: 40px;
    }
  }
}
@media screen and (max-width: 560px){

}


@media screen and (max-width: 480px){

}
</style>
