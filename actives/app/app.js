"use strict"

const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outLine = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-div video');

    const sounds = document.querySelectorAll('.soundBtn');

    const timeDisplay = document.querySelector('.time-display');
    let BasicDuration = 10;
    
    const outLineLen = outLine.getTotalLength();
    
    sounds.forEach(sound => {
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            song.currentTime = 0;
            play.src = './images/svg/play.svg';
            song.pause();
            video.pause();
        })
    }); 

    const timeBtn = document.querySelectorAll('.timeBtn');
    timeBtn.forEach(element => {
        element.addEventListener('click',(time)=>{
            BasicDuration = time.target.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(BasicDuration/60)}:${Math.floor(BasicDuration%60)}`;
            song.currentTime = 0;
            play.src = './images/svg/play.svg';
            song.pause();
            video.pause();
        });
    });


    outLine.style.strokeDasharray = outLineLen;
    outLine.style.strokeDashoffset = outLineLen;

    play.addEventListener('click',()=>{
        checkPlaying(song);
    });

    const checkPlaying = song =>{
        if(!song.paused){
            play.src = './images/svg/play.svg';
            song.pause();
            video.pause();
        }else{
            song.play();
            video.play();
            play.src = './images/svg/pause.svg';
        } 
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = BasicDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        timeDisplay.textContent = `${minutes}:${seconds}`;
        let progress = outLineLen - (currentTime / BasicDuration) * outLineLen;
        outLine.style.strokeDashoffset = progress;

        if(currentTime >= BasicDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './images/svg/play.svg';
            video.pause();
        }
    }
}

app()