function Particle() {
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 4;

    this.update = function()
    {
     this.vel.add(this.acc);
     this.vel.limit(this.maxspeed);
     this.pos.add(this.vel);
     this.acc.mult(0);
    }

    this.follow = function(vectors)
    {
     var x = floor(this.pos.x / scl);
     var y = floor(this.pos.y / scl);
     var index = x+y*cols;
     var force = vectors[index];
     this.applyForce(force);
    }

    this.applyForce = function(force)
    {
     this.acc.add(force);
    }

    this.show = function(redc,greenc,bluec)
    {
     stroke(redc,greenc,bluec,255);
     strokeWeight(6);
     point(this.pos.x,this.pos.y);
    }

    this.edges = function()
    {
     if(this.pos.x > width) this.pos.x = 0;
     if(this.pos.x < 0) this.pos.x = width;
     if(this.pos.y > height) this.pos.y = 0;
     if(this.pos.y < 0) this.pos.y = height;
    }


}







var inc = 0.1;

var scl = 20;
var cols,rows;
var zoff = 0;
var fr;
var particles = [];
var flowField;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
     createCanvas(windowWidth, windowHeight);
    //background(255);
    cols = floor(width / scl);
    rows = floor(height/ scl);
    fr  = createP('');

    flowField = new Array(cols*rows);

    for(var i = 0;i <2000; ++i)
    {
    particles[i] = new Particle();
    }
}

function draw() {
   // background(255);
    var xoff = 0;

    for(var x = 0;x < cols ;x++)
    {
        var yoff = 0;
        for(var y = 0;y < rows ;y++)
        {
           var index  = (x + y * cols);
           var r = noise(yoff, xoff,zoff)*TWO_PI*4;
           var v = p5.Vector.fromAngle(r);
           v.setMag(0.5);
           flowField[index] = v;
           yoff += inc;

            /*
           stroke(0,50);
           push();
           translate(x*scl, y*scl);
            strokeWeight(1);
           rotate(v.heading());
           line(0,0,scl,0);
           pop();
           */





        }
        xoff += inc;
        zoff += 0.0001;
    }

    for(var i = 0;i <particles.length; ++i)
    {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].show(noise(zoff)*255,noise(zoff*2)*255,noise(zoff*10)*255);
    particles[i].edges();
    }

    if(key === 'a')
    {
     console.log('lol');
     background(255);
    }

    if(key === 's')
    {
     console.log('XD');

    for(var i = 0;i <particles.length; ++i)
    {
    particles[i].applyForce(createVector(-particles[i].pos.x+mouseX,-particles[i].pos.y+mouseY));
    //console.log(createVector(particles[i].pos.x-mouseX,particles[i].pos.y-mouseY));
    }

    }

    fr.html(floor(frameRate()));
}



