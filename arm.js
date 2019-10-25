function segment(x,y,length,width,parent)
{
  this.x = x;
  this.y = y;
  this.length = length;
  this.width = width;
  this.endX;
  this.endY;
  this.angle = 0;
  this.parent = parent;
  this.seg = seg[Math.floor(Math.random()*3)];

  this.update = function()
  {
    this.length = neck/10;
    this.endX = this.x + Math.sin(this.angle) * this.length;
    this.endY = this.y + Math.cos(this.angle) * this.length;
    if(this.parent)
    {
      this.x = this.parent.endX;
      this.y = this.parent.endY;
    }


  }

  this.draw = function()
  {
    c.beginPath();
    c.drawImage(this.seg,this.x-this.width/2,this.y-this.width/4,this.width,this.width);
  }

  this.pointAt = function(x,y)
  {
    this.angle = Math.atan2(x-this.x,y-this.y)
  }

  this.drag = function(x,y)
  {
    this.pointAt(x,y);
    this.x = x - Math.sin(this.angle) * this.length;
    this.y = y - Math.cos(this.angle) * this.length;
    if(this.parent)
    {
      this.parent.drag(this.x,this.y);
    }
  }

  this.idrag = function()
  {
    if(this.parent)
    {
      this.x = this.parent.endX;
      this.y = this.parent.endY;
    }
    else
    {
      this.x = innerWidth/2;
      this.y = 200;
    }
  }

  this.reach = function(x,y)
  {
    this.drag(x,y)
    for(var i=n-1;i>=0;i--)
    {
      arms[i].idrag();
    }
  }
}
