console.log("hello spotify");
let currentsong = new Audio();
let songs;
let currfolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currfolder = folder ;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
     songs = [];
    for (let ind = 0; ind < as.length; ind++) {
        const element = as[ind];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

   
    let songsUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songsUL.innerHTML = "" ;
    for (const song of songs) {
        songsUL.innerHTML = songsUL.innerHTML + `<li> 
        <img src="img/music.svg" alt="" class="invert">
        <div class="info">
            <div> ${song.replaceAll("%20", " ")} </div>
            <div>27londe</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img src="img/play.svg" alt="" class="invert">
        </div>
     </li>`;
    }

    

    // Add click events for each song in the list
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", elements => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML); // logs the song title
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });
     
    return songs;
    

    
}



// async function displayalbums() {
//     let a = await fetch(`http://127.0.0.1:5500/songs/`);
//     let response = await a.text();

//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a");
//     let cardContainer = document.querySelector(".cardContainer");

//     // Clear the card container before adding new content
//     cardContainer.innerHTML = "";

//     for (let i = 0; i < anchors.length; i++) {
//         let e = anchors[i];
        
//         if (e.href.includes("/songs")) {
//             let folder = e.href.split("/").slice(-2)[1]; // Get the folder name from the href

//             if (folder === "songs") {
//                 continue; // Skip the "songs" folder
//             } else {
//                 let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
//                 let response = await a.json();
//                 console.log(response);

//                 // Create the card element
//                 let card = document.createElement("div");
//                 card.classList.add("card");
//                 card.setAttribute("data-folder", folder);
//                 card.innerHTML = `
//                     <div class="play">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M5 20V4L19 12L5 20Z" fill="#000000" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"/>
//                         </svg>
//                     </div>
//                     <img src="/songs/${folder}/cover.jpg" alt="">
//                     <h2>${response.title}</h2>
//                     <p>${response.description}</p>`;

//                 // Append the card to the card container
//                 cardContainer.appendChild(card);

//                 // Add event listener for the newly created card
//                 card.addEventListener("click", async (item) => {
//                     console.log(`Switching playlist to folder: ${folder}`);
//                     await getsongs(`songs/${folder}`);
//                 });
//             }
//         }
//     }
// }

const playmusic = (track, pause = false) => {
    currentsong.src = `/${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        play.src = "img/pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}



async function displayalbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");

    // No need to clear the card container, keep the existing content
    // cardContainer.innerHTML = "";

    for (let i = 0; i < anchors.length; i++) {
        let e = anchors[i];
        
        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[1]; // Get the folder name from the href

            if (folder === "songs") {
                continue; // Skip the "songs" folder
            } else {
                let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
                let response = await a.json();
                console.log(response);

                // Create the card element
                let card = document.createElement("div");
                card.classList.add("card");
                card.setAttribute("data-folder", folder);
                card.innerHTML = `
                    <div class="play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z" fill="#000000" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <img src="/songs/${folder}/cover.jpg" alt="">
                    <h2>${response.title}</h2>
                    <p>${response.description}</p>`;

                // Append the card to the card container without removing existing cards
                cardContainer.appendChild(card);

                // Add event listener for the newly created card
                card.addEventListener("click", async (item) => {
                    console.log(`Switching playlist to folder: ${folder}`);
                    await getsongs(`songs/${folder}`);
                    playmusic(songs[0]);
                });
            }
        }
    }
}




// async function displayalbums() {
//     let a = await fetch(`http://127.0.0.1:5500/songs/`);
//     let response = await a.text();
//     // console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a");
//     let cardContainer = document.querySelector(".cardContainer");
//     let array =  Array.from(anchors);
//    for (let index = 0; index < array.length; index++) {
//     const e = array[index];
    
   
//         if(e.href.includes("/songs")){
        
//         let folder = e.href.split("/").slice(-2)[1]; // Get the folder name from the href
//          if (folder === "songs") { // Check if the folder is "songs" (the one you want to skip)
//             return; // Skip this iteration
//           } 
//       else {
//       let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
//      let response = await a.json();
//       console.log(response);
//       cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder = "cs" class="card">
//                     <div class="play">
                        
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M5 20V4L19 12L5 20Z" fill="#000000" stroke="#141B34" stroke-width="1.5" stroke-linejoin="round"/>
//                         </svg>
                        
                        
                          
                          
//                     </div>
//                     <img src="/songs/${folder}/cover.jpg" alt="">
//                     <h2>${response.title}</h2>
//                     <p>${response.description}</p>
//                 </div>`
//        }
//         }
//     }
    
//     // setTimeout(() => {
//     //     Array.from(document.getElementsByClassName("card")).forEach(e => {
//     //         e.addEventListener("click", async item => {
//     //             let folder = item.currentTarget.dataset.folder;
//     //             console.log(`Switching playlist to folder: ${folder}`);
//     //             songs = await getsongs(`songs/${folder}`);
//     //         });
//     //     });
//     // }, 500);
//     Array.from(document.getElementsByClassName("card")).forEach( e=>{
//         e.addEventListener("click" , async item => {
//             // console.log(item,item.currentTarget.dataset);
//             songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            
//         });
//     });
//     // console.log(anchors);
// }

async function main() {
      
    await getsongs("songs/cs");
    playmusic(songs[0], true);

     displayalbums();

    // Global play/pause button event listener
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "img/pause.svg";
        } else {
            currentsong.pause();
            play.src = "img/play.svg";
        }
    });

    // Update song time and seekbar position as the song plays
    currentsong.addEventListener("timeupdate", () => {
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    });

    // Seekbar click event to jump to different parts of the song
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    });

    // Hamburger menu open
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Close menu button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Previous song button functionality
    previous.addEventListener("click", () => {
        // console.log("Previous clicked");
        currentsong.pause();
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1]);
        }
    });

    // Next song button functionality
    next.addEventListener("click", () => {
        // console.log("Next clicked");
        currentsong.pause();
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1]);
        }
        // console.log("hfif");
    });

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
      currentsong.volume = parseInt(e.target.value)/100 ;
    });

    // Array.from(document.getElementsByClassName("card")).forEach( e=>{
    //     e.addEventListener("click" , async item => {
    //         // console.log(item,item.currentTarget.dataset);
    //         songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            
    //     });
    // });
    document.querySelector(".volume>img").addEventListener("click", e=>{ 
        if(e.target.src.includes("img/volume.svg")){
            e.target.src = e.target.src.replace("img/volume.svg", "img/mute.svg")
            currentsong.volume = 0;
             document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("img/mute.svg", "img/volume.svg")
            currentsong.volume = .10;
             document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })

    



}

main();

