function get(x)
{
  return document.getElementById(x);
}
function getDistance(x1,y1,x2,y2)
{
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
var canvas = get("cnv");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

var n = 10;
var arms = [];
c.strokeStyle = "#FF7700";
c.fillStyle = "#662200";

var head = document.getElementById("head");
var body = document.getElementById("body");
var seg = [document.getElementById("s"),document.getElementById("ss"),document.getElementById("sss")];
var mouseX = 0;
var mouseY = 0;

arms.push(new segment(innerWidth/2,200,20,110,null));
for(var i=1;i<n;i++)
{
  arms.push(new segment(innerWidth/2,200,20,110+i*3,arms[i-1]));
}

var neck = 200;
document.body.addEventListener("mousemove",function(e)
{
  arms[n-1].reach(e.clientX,e.clientY);
  mouseX = e.clientX;
  mouseY = e.clientY;
  neck = getDistance(e.clientX,e.clientY,innerWidth/2,200);
  if(neck>200){neck=200;}
});

function animate()
{
  c.clearRect(0,0,innerWidth,innerHeight);
  c.drawImage(body,arms[n-1].x-315,arms[n-1].y-150,440,440);
  for(var i=0;i<n;i++)
  {
    arms[i].update();
  }
  for(var i=n-1;i>=0;i--)
  {
    arms[i].draw();
  }
  c.drawImage(head,innerWidth/2-515,90,700,700);
  window.requestAnimationFrame(animate);
}
animate();
