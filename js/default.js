
var run = 1;
var idex = 0;
var Update = false;
const canvas = document.getElementById("bg");
const context=canvas.getContext("2d");
const body=document.getElementById('body');

const BGI = new Image();
//BGI.onload=Render(BGI);
BGI.src=currentFrame(0);


var RATE=30;
canvas.width=1920;
canvas.height=1080;

setInterval(Redraw,1000/RATE);

function Redraw()
{
    Update=true;
}
requestAnimationFrame(Render);
async function LoadGallery()
{
        var i=1,j=1;

        var div = document.createElement('div');
        div.className="imgrid";
        div.id="imgrid";
    
        document.getElementById("body").appendChild(div);
        

            var path = "./prij/";
            while(run !=0)
            { 
                j=1;
                    var dir = path+String(i);
                    while(j<12 && run!=0)
                    {
                        
                        
                            var file = dir+"/"+String(j)+".png";
                            

                            //img.addEventListener('load', Place(d,file));
                            
                            //img.addEventListener('error', Error(file));
                            var result="";
                            await Check(file).then(res => oof(res));
                            j++;                                
                    }    
                i++;
                
            }
            $("#imgrid img").each(function () {
               // this.style.maxHeight=(Math.floor(Math.random() * 100) + 50)+'%';
               // this.style.maxWidth=(Math.floor(Math.random() * 100) + 50)+'%';
            });
        }
function oof(res)
{
    if(res != false)
    {
        var img= document.createElement("img");
        img.src=res;

        div = document.getElementById("imgrid");
        div.appendChild(img);
    }
    else
    {
        run = 0;
    }
}
function Check(file)
{
    var oReq = new XMLHttpRequest();
    return new Promise((resolve, reject) =>
    {
        oReq.onload = (e) => {
            if(oReq.status==404)
            {
                resolve(false);
            }
            else
            {
                resolve(file);
            }};
        oReq.open("GET", file);
        oReq.send();
    });
}
function reqListener() 
{
    //if(this.status != 404)
    //{
        
    //}
}
function Place(d , img)
{
    div = document.getElementById("imgrid");
    div.appendChild(img);         
}
function Error(file)
{
   //alert(file);
   v=0;
}


function currentFrame(i)
{
    
    var str = "" + i
    var pad = "0000000"
    var ans = pad.substring(0, pad.length - str.length) + str
    return "res/bg/BG."+ans+".png";
    //return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${i.toString().padStart(4, '0')}.jpg`;
}
function Render()
{
    if(Update)
    {
        Update = false;
        //context.clearRect(0, 0, canvas.width, canvas.height);
        
        
        context.drawImage(BGI,0,0);
        BGI.src=currentFrame(idex);
        
        idex++;
        
        if(idex==180)
        {
            idex=0;
        }
    }
    requestAnimationFrame(Render); 
}