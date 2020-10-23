
const BG=[];
const IM = new Image();
const CAN = document.getElementById("bg");
const CON=CAN.getContext("2d",{ alpha: false });
animationname = "A1";
const LOCK = document.createElement("div");
LOCK.id="blocker";

const PROGR = document.createElement("span");
PROGR.id="progress";
LOCK.appendChild(PROGR);

body.appendChild(LOCK);

UPDATE = false;

Downscale = window.screen.height/1080;
if(Downscale>1)
{
    Downscale=1;
}
body.style.setProperty('--downscale',Downscale);
CAN.width=974;
CAN.height=1080;

IM.src="";

stage=null;
path="";
ATT=null;

var QUE = new Loader();
QUE.onComplete.add(Loaded);
QUE.onProgress.add(Progress);
QUE.onLoad.add(Handle);

var QUE2 = new Loader();
//QUE2.onComplete.add(Loaded);
//QUE2.onProgress.add(Progress);
QUE2.onLoad.add(HandleGallery);
QUE2.onError.add(Err);
// var QUE2 = new createjs.LoadQueue(false);
// QUE2.setMaxConnections(2);
// QUE2.on("fileload", HandleGallery, this);
// QUE2.on("error", Err, this);

Animating = true;

PreloadBg();
PreloadGallery();
IDX=0;

function Err(e,l,r)
{
    l._queue.worker = null;
    l._queue.resources = null;
    r.abort();
    l._queue.pause();
    l.reset();
}
function EnlargeImage(e)
{
    if(animationname=="A1")
    {
        currentscale = this.getBoundingClientRect().width / this.offsetWidth;
        body.style.setProperty('--imagelastscale' , currentscale);
        this.style.animation= "A2 2.0s 1";
        this.style.animationFillMode="forwards";
    }
}
function RevertImage(e)
{
    if(!Animating)
    {
        this.style.animation= "A3 2.0s 1";
        this.style.animationFillMode="forwards";
        this.style.animationPlayState="running";
    }

}
function AnimStart(e)
{
    animationname = e.animationName;
}
function AnimEnd(e)
{
    if(e.animationName == 'A3')
    {
        this.style.animation= "A1 12s infinite";
    }
    Animating = false;
}
function Handle(e)
{
    BG.push(e.result);
}
function HandleGallery(l,r)
{
        r.data.onmouseenter = EnlargeImage;
        r.data.onmouseleave = RevertImage;
        r.data.onanimationend  = AnimEnd;
        r.data.onanimationstart = AnimStart;
        Container.appendChild(r.data); 
}

function PreloadBg()
{
    for(i=1;i<=256;i++)
    {
        var str = "" + i
        var pad = "00000"
        var ans = pad.substring(0, pad.length - str.length) + str
        path="/res/bg/jpg/ATT/lighter/Frame_"+ans+".png";
        QUE.add(path);
    }
    QUE.load();

}
function PreloadGallery()
{
    for(i=1;i<=82;i++)
    {
        path=`/prij/1/${i}.jpg`;
        QUE2.add(path);
    }
    QUE2.load();
}

function Loaded(e)
{
    console.log("loaded");
    //RenderBg();
    //createjs.Ticker.on("tick", Render);
    setInterval(function(){UPDATE=true;},1000/30)
    requestAnimationFrame(Render);
    LOCK.remove();

}

function Progress(e)
{
    //console.log(e.progress);
    PROGR.innerHTML=`Loading -> ${parseInt(e.progress)}%`;
}

function Render()
{
    if(CON!=null)
    {
        if(UPDATE)
        {
            IDX++;
            //IM.src=BG[IDX];
            UPDATE=false;
            CON.drawImage(Object.values(QUE.resources)[IDX].data,0,0);
            if(IDX==255)
            {            
                IDX=0;
            }
            
        }
    }
    requestAnimationFrame(Render);
}

function BodyLoad()
{
        window.dispatchEvent(new Event('mousemove'));
}