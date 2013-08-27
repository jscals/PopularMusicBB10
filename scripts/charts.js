/*
 * replaced with below, using jquery
function loadFunc(){
    
    var mainTitle = document.getElementById("mainTitle");
    var buttonBar = document.getElementById("buttonRow");
    var listContainer = document.getElementById("list");
    
    mainTitle.style.backgroundRepeat ="no-repeat";
   
    if(screen.width > 730){
        //if > 730 pixels, is Z10 so set container heights and insert proper Title banner.
        mainTitle.style.backgroundImage ="url(images/Z10banner.png)";
        buttonBar.style.height = "6%";
        listContainer.style.height="75%";
    }
    else{
        mainTitle.style.backgroundImage ="url(images/Q10banner.png)";
    }
    
    buttonSelection("http://www.billboard.com/rss/charts/hot-100", "songs");
};
*/

$(document).ready(function(){
    var mainTitle = document.getElementById("mainTitle");
    //var mainTitle = $("#mainTitle");
    var buttonBar = $("#buttonRow");
    var listContainer = $("#list");
    
    mainTitle.style.backgroundRepeat ="no-repeat";
    //mainTitle.css("backgroundRepeat", "no-repeat");
     
   
    if(screen.width > 730){
        //if > 730 pixels, is Z10 so set container heights and insert proper Title banner.
        mainTitle.style.backgroundImage ="url(images/Z10banner.png)";
        buttonBar.css("height" ,"5%");
        listContainer.css("height","80%");
        mainTitle.style.height = "128px";
    }
    else{
         mainTitle.style.backgroundImage ="url(images/Q10banner.png)";
         mainTitle.style.height = "72px";
    }
    
    /*Initalize the advertising service and display banner. Edit: Ads not supported in Webworks yet.
    var zoneId = #####; // Provided by RIM
    var bannerObj =new blackberry.advertising.Banner(zoneId, "banner");*/
    
    $('#songs').trigger('vclick');
    
});



/*Replaced with below function, optimized for touch
function buttonSelection(address, buttonID){
    //put border around the button whichrepresents the selection currently being listed.
    if(buttonID === "songs"){
        var selectedButton = document.getElementById("songs");
        selectedButton.style.border="2px solid yellow";
        
        var otherButton = document.getElementById("albums");
        otherButton.style.border="0px solid yellow";
    }
    else{
        var selectedButton = document.getElementById("albums");
        selectedButton.style.border="2px solid yellow";
        
        var otherButton = document.getElementById("songs");
        otherButton.style.border="0px solid yellow";
    }
    
    getRSSFeed(address);
}
*/

$(document).on( "vclick", ".button", function() {
    
    if(this.id === "songs"){
        $("#songs").css("border","2px solid white");
        $("#albums").css("border", "0px solid white");
        getRSSFeed('http://www.billboard.com/rss/charts/hot-100');
    }
    else{
        $("#albums").css("border","2px solid white");
        $('#songs').css("border", "0px solid white");
        getRSSFeed('http://www.billboard.com/rss/charts/billboard-200');
    }
    
});


function getRSSFeed(address) {
    var req = new XMLHttpRequest();
    req.open("GET", address, true);
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState === 4 ) {
            if(req.status === 200){
                 listSongs(req.responseText);
            };
        };
        
    };
    
};


function listSongs(xmlFeedText){
    
    //clear the contents of the list div
    var listContainer = document.getElementById("list");
    listContainer.innerHTML = "";
    
    //parse responseText into Xml Obj.
    var parser = new DOMParser(); 
    var xmlFeed = parser.parseFromString(xmlFeedText, "text/xml");
    
    //extract songs from xml object
    var songs = xmlFeed.getElementsByTagName("item");
   
    
    //create div for each song/album, append to list. (limit to 100 entries)
    for(var i =0; i< 100; i++){
       var songDiv = createSongEntry(songs[i]);
       listContainer.appendChild(songDiv);

    };
    
};


//Takes an xml element for a given song/album,
//creates a song/album DOM element containing the rank/name/artist of the item, 
//with inner div containers for the rank and song/album name and artist.
function createSongEntry(song){
    //extract song information from XML dom element
    var songInfoTag = song.getElementsByTagName("title");
    
    //Get the first element in the list (only going to be 1), and extract teh text node and its value.
    var songInfoString = songInfoTag[0].childNodes[0].nodeValue;
            
    //extract the song rank from the info string
    var songRank = songInfoString.substring(0, songInfoString.indexOf(":"));
    
    //determine the position of the song name in the info string and extract it. 
    var startIndexOfSongName = (songInfoString.indexOf(" ")) + 1;
    var endIndexOfSongName = songInfoString.indexOf(",");
    var songName = songInfoString.substring(startIndexOfSongName,endIndexOfSongName);
    
    //extract the song artist from teh info string
    var songArtist = songInfoString.substring(endIndexOfSongName + 2);
    
    
    //Create the elements to hold the info
    var songContainer = document.createElement("li");
    songContainer.setAttribute("class","songItem");
    
    var rankContainer = document.createElement("div");
    rankContainer.setAttribute("class","rankContainer");
    
    var infoContainer = document.createElement("div");
    infoContainer.setAttribute("class","infoContainer");
    
    
    //create our dom elements for the song info.
    var songRankElement = document.createElement("p");
    songRankElement.setAttribute("class", "songRank");
    songRankElement.innerHTML = songRank;
    
    var songNameElement = document.createElement("p");
    songNameElement.setAttribute("class", "songName");
    songNameElement.innerHTML = songName;
    
    var songArtistElement = document.createElement("p");
    songArtistElement.setAttribute("class", "songArtist");
    songArtistElement.innerHTML = songArtist;
    
    
    //attach song info elements to containers
    rankContainer.appendChild(songRankElement);
    infoContainer.appendChild(songNameElement);
    infoContainer.appendChild(songArtistElement);
    
    //attach containers to main Element
    songContainer.appendChild(rankContainer);
    songContainer.appendChild(infoContainer);  
    
    return songContainer;
};



