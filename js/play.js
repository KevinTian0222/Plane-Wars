    //Load the main page
    var mainDiv = document.getElementById("maindiv");
    //Load the begin page
    var startdiv = document.getElementById("startdiv");
    //Load the score tracker
    var scorediv = document.getElementById("scorediv");
    //Load the coordinate of the mouse
    var mousediv = document.getElementById("mouseXY");
    //Load the coordinate of side mouse
    var mousep = document.getElementById("mousep");
    //Load the score page
    var scorelabel = document.getElementById("label");
    //Load the pause page
    var suspenddiv = document.getElementById("suspenddiv");
    //Load the game-over page
    var enddiv = document.getElementById("enddiv");
    //Load the scoring page after the game ends.
    var planscore = document.getElementById("planscore");
    //Load the weapon page
    var weapsDiv = document.getElementById("weaps");
    //Load the bullet ID list on the weapon page
    var daodanlist = document.getElementById("daodanlist");
    //Load the bullet picture ID list on the weapon page
    var daodanimg = document.getElementById("daodanimg");
    //Load the bullet count on the weapon page
    var numdaodan = document.getElementById("numdaodan");
    //Initialize score
    var scores = 0;

    /*
    Create different types of planes
    */
    function plan(hp, X, Y, sizeX, sizeY, score, dietime, sudu, imagesrc) {
        this.planX = X;
        this.planY = Y;
        this.imagenode = null;
        this.planhp = hp;
        this.planscore = score;
        this.plansizeX = sizeX;
        this.plansizeY = sizeY;

        this.planisdie = false;
        this.plandietimes = 0;
        this.plandietime = dietime;
        this.plansudu = sudu;
        this.weaptype = 0;

        //action
        /*
        action: move
             */
        this.planmove = function () {
            if (scores <= 80000) {
                this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + "px";
                mainDiv.style.backgroundImage = "url(image/bg2.jpg)";
                g_sudu = 1; //the overall speed of the game, which is associated with the speed of the plane.
            } else if (scores > 80000 && scores <= 290000) {
                this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + 1 + "px";
                mainDiv.style.backgroundImage = "url(image/bg1.jpg)";
                g_sudu = 2;
            } else if (scores > 190000 && scores <= 360000) {
                this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + 2 + "px";
                mainDiv.style.backgroundImage = "url(image/bg3.jpg)";
                g_sudu = 3;
            } else if (scores > 260000 && scores <= 450000) {
                this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + 3 + "px";
                mainDiv.style.backgroundImage = "url(image/bg4.jpg)";
                g_sudu = 4;
            } else if (scores > 350000 && scores <= 550000) {
                this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + 4 + "px";
                mainDiv.style.backgroundImage = "url(image/bg4.jpg)";
                g_sudu = 5;
            } else {
                this.imagenode.style.top = this.imagenode.offsetTop + this.plansudu + 5 + "px";
                g_sudu = 6;
            }
        }
        this.init = function () {
            this.imagenode = document.createElement("img");
            this.imagenode.style.left = this.planX + "px";
            this.imagenode.style.top = this.planY + "px";
            this.imagenode.src = imagesrc;
            mainDiv.appendChild(this.imagenode);

        }
        this.init();
    }

    /*
    Create the type of plane that the user controls
     */
    function ourplan(X, Y) {

        var imagesrc = "image/own.png";
        plan.call(this, 1, X, Y, 66, 80, 0, 660, 0, imagesrc);
        this.imagenode.setAttribute('id', 'ourplan');

    }
    /*
    Create the plane that the user controls
    */
    var selfplan = new ourplan(120, 485);

    //action: to move
    var ourPlan = document.getElementById('ourplan');

    var yidong = function () {
            var oevent = window.event || arguments[0];
            var chufa = oevent.srcElement || oevent.target;
            //alert("ddddd");
            var selfplanX = oevent.clientX - 500;
            var selfplanY = oevent.clientY;
            mousep.innerHTML = "X:" + oevent.clientX + ",Y:" + oevent.clientY;
            ourPlan.style.left = selfplanX - selfplan.plansizeX / 2 + "px";
            ourPlan.style.top = selfplanY - selfplan.plansizeY / 2 + "px";
            //    document.getElementsByTagName('img')[0].style.left=selfplanX-selfplan.plansizeX/2+"px";
            //    document.getElementsByTagName('img')[0]..style.top=selfplanY-selfplan.plansizeY/2+"px";
        }
        //detect if the user's plane moves out of the canvas, if so, prohibit the "mousemove" action, vice-versa.
    var bianjie = function () {
        var oevent = window.event || arguments[0];
        var bodyobjX = oevent.clientX;
        var bodyobjY = oevent.clientY;
        if (bodyobjX < 532 || bodyobjX > 788 || bodyobjY < 39 || bodyobjY > 527) {

            if (document.removeEventListener) {
                mainDiv.removeEventListener("mousemove", yidong, true);
            } else if (document.detachEvent) {
                mainDiv.detachEvent("onmousemove", yidong);
            }

        } else {
            if (document.addEventListener) {
                mainDiv.addEventListener("mousemove", yidong, true);
            } else if (document.attachEvent) {
                mainDiv.attachEvent("onmousemove", yidong);
            }
        }
    }

    var bodyobj = document.getElementsByTagName("body")[0];

    if (document.addEventListener) {
        mainDiv.addEventListener("mousemove", yidong, true);

        bodyobj.addEventListener("mousemove", bianjie, true);
    } else if (document.attachEvent) {
        mainDiv.attachEvent("onmousemove", yidong);
        bodyobj.attachEvent("onmousemove", bianjie);
    }

    //When initialized, hide user's plane
    selfplan.imagenode.style.display = "none";

    //-----------------------------------------------------------------------------------子弹类
    /*
    create the types of bullets
     */
    function bullet(X, Y, sizeX, sizeY, imagesrc) {
        this.bulletX = X;
        this.bulletY = Y;
        this.bulletimage = null;
        this.bulletattach = 1;
        this.bullettype = 1; //1 represents the user's ammo，2 represents enemy ammo，
        this.bulletsizeX = sizeX;
        this.bulletsizeY = sizeY;
        //action
        /*
         move action
         */
        this.bulletmove = function () {
            if (this.bullettype == 1) {
                this.bulletimage.style.top = this.bulletimage.offsetTop - 20 + "px";
            } else {
                switch (g_sudu) {
                case 1:
                    this.bulletimage.style.top = this.bulletimage.offsetTop + 3 + "px";
                    break;
                case 2:
                    this.bulletimage.style.top = this.bulletimage.offsetTop + 6 + "px";
                    break;
                case 3:
                    this.bulletimage.style.top = this.bulletimage.offsetTop + 9 + "px";
                    break;
                case 4:
                    this.bulletimage.style.top = this.bulletimage.offsetTop + 12 + "px";
                    break;
                case 5:
                    this.bulletimage.style.top = this.bulletimage.offsetTop + 15 + "px";
                    break;
                }



            }

        }
        this.init = function () {
            this.bulletimage = document.createElement("img");
            this.bulletimage.style.left = this.bulletX + "px";
            this.bulletimage.style.top = this.bulletY + "px";
            this.bulletimage.src = imagesrc;
            mainDiv.appendChild(this.bulletimage);
        }
        this.init();
    }
    /*
    single line bullet
    */
    function oddbullet(X, Y, sizeX, sizeY, imagesrc) {
        bullet.call(this, X, Y, sizeX, sizeY, imagesrc);
    }
    //-------end of single line bullet

    //-----explosion bullet

    function boom(X, Y, sizeX, sizeY, imagesrc) {
        this.boomX = X;
        this.boomY = Y;
        this.boomimage = null;
        this.boomsizeX = sizeX;
        this.boomsizeY = sizeY;
        //action
        this.init = function () {
            this.boomimage = document.createElement("img");
            this.boomimage.style.left = this.boomX + "px";
            this.boomimage.style.top = this.boomY + "px";
            this.boomimage.src = imagesrc;
            mainDiv.appendChild(this.boomimage);
        }
        this.init();

    }



    //-----end of explosion ammo

    //------create enemy planes
    /*
    create different types of enemy planes
     */
    function enemy(hp, a, b, sizeX, sizeY, score, dietime, sudu, imagesrc) {
        plan.call(this, hp, random(a, b), 0, sizeX, sizeY, score, dietime, sudu, imagesrc);
    }
    //generate a random value between min and max
    function random(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }
    //end of creating enemy planes 


    //create equipment
    function jineng(X, Y, sizeX, sizeY, type, imagesrc) {
        this.jinengX = X;
        this.jinengY = Y;
        this.jinengsizeX = sizeX;
        this.jinengsizeY = sizeY;
        this.jinengtype = type;

        this.jinengimage = null;
        //action

        /*
         action: move
         */
        this.jinengmove = function () {
            this.jinengimage.style.top = this.jinengimage.offsetTop + 2 + "px";
        }
        this.init = function () {
            this.jinengimage = document.createElement("img");
            this.jinengimage.style.left = this.jinengX + "px";
            this.jinengimage.style.top = this.jinengY + "px";
            this.jinengimage.src = imagesrc;
            mainDiv.appendChild(this.jinengimage);
        }
        this.init();
    }
    //create tracking bullet
    function daodan(X, Y, sizeX, sizeY, type, imagesrc) {
        this.daodanX = X;
        this.daodanY = Y;
        this.daodansizeX = sizeX;
        this.daodansizeY = sizeY;
        this.daodantype = type;

        this.daodanimage = null;
        //action

        /*
         action: move
         */
        this.daodanmove = function () {
            this.daodanimage.style.top = this.daodanimage.offsetTop + 2 + "px";
        }
        this.init = function () {
            this.daodanimage = document.createElement("img");
            this.daodanimage.style.left = this.daodanX + "px";
            this.daodanimage.style.top = this.daodanY + "px";
            this.daodanimage.style.display = "none";
            this.daodanimage.src = imagesrc;
            weapsDiv.appendChild(this.daodanimage);
        }
        this.init();
    }


    var backgroundPositionY = 0;
    /*
    action target array
     */
    var jinengs = [];
    /*
    enemy target array
     */
    var enemys = [];
    /*
    bullet target array
     */
    var bullets = [];



    /*
     * /*
    tracking bullet target array
     */
    var daodans = [];
    /*
    explosion target array
     */
    var booms = [];
    var mark = 0;
    var mark1 = 0;
    var mark2 = 0;
    var djmark = 0;
    var g_sudu = 1;
    /*
    start function
     */
    function start() {

        mainDiv.style.backgroundPosition = 0 + "px" + " " + backgroundPositionY + "px";
        backgroundPositionY += 0.5;
        // alert( mainDiv.style.backgroundPosition);
        //if(mark==5)
        //clearInterval(set);
        if (backgroundPositionY == 568) {
            backgroundPositionY = 0;
        }
        mark++;
        djmark++;
        /*
        create bullet
        */
        if (mark % 5 == 0) {
            switch (selfplan.weaptype) {

            case 0:
                var wpone = new oddbullet(parseInt(selfplan.imagenode.style.left) + 31, parseInt(selfplan.imagenode.style.top) - 30, 6, 14, "image/zidan.png");
                wpone.bulletattach = 1;
                bullets.push(wpone);
                // daodans.push(new daodan(weapsDiv.style.left+5,weaps.style.top,25,50,1,"image/daodan1.png"));
                // bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+31,parseInt(selfplan.imagenode.style.top)-10,"image/wp1.png"));
                break;
            case 1:
                selfplan.imagenode.src = "image/own2.png";
                var wpone = new oddbullet(parseInt(selfplan.imagenode.style.left) + 10, parseInt(selfplan.imagenode.style.top) - 130, 42, 137, "image/wp2.png");
                wpone.bulletattach = 2;
                bullets.push(wpone);
                break;
            case 2:
                selfplan.imagenode.src = "image/own3.png";
                var wpone = new oddbullet(parseInt(selfplan.imagenode.style.left) + 10, parseInt(selfplan.imagenode.style.top) - 70, 45, 46, "image/wp1.png");
                wpone.bulletattach = 2;
                bullets.push(wpone);
                break;
            case 3:
                selfplan.imagenode.src = "image/own4.png";
                var wpone = new oddbullet(parseInt(selfplan.imagenode.style.left) + 10, parseInt(selfplan.imagenode.style.top) - 130, 53, 121, "image/wp3.png");
                wpone.bulletattach = 2;
                bullets.push(wpone);
                break;
            case 4:
                selfplan.imagenode.src = "image/own5.png";

                break;
            }


        }
        /*
        bullet moves
        */
        var bulletslen = bullets.length;
        for (var i = 0; i < bulletslen; i++) {
            bullets[i].bulletmove();
            /*
            if bullets move out of the canvas, delete bullets
            */
            if (bullets[i].bulletimage.offsetTop < 0) {
                mainDiv.removeChild(bullets[i].bulletimage);
                bullets.splice(i, 1);
                bulletslen--;
            }
        }
        /*
    	        action: move
    	        */
        var jinengslen = jinengs.length;
        for (var i = 0; i < jinengslen; i++) {
            jinengs[i].jinengmove();
            /*
            if reach the limit of the canvas size, disable action
            */
            if (jinengs[i].jinengimage.offsetTop < 0) {
                mainDiv.removeChild(jinengs[i].jinengimage);
                jinengs.splice(i, 1);
                jinengslen--;
            }
        }

        /*
        creating enemy planes
         */

        if (mark == 20) {
            mark1++;
            mark2++;

            //m-size plane 1
            if (mark1 % 5 == 0) {
                enemys.push(new enemy(6, 25, 274, 46, 60, 5000, 360, random(1, 3), "image/zhongfeiji.png"));
            }
            //m-size plane 2
            if (mark1 % 10 == 0) {
                enemys.push(new enemy(6, 25, 274, 90, 81, 3000, 460, random(1, 3), "image/xiaozhong.png"));
            }
            //l-size plane
            if (mark1 == 20) {

                enemys.push(new enemy(12, 37, 160, 110, 164, 30000, 540, 1, "image/dafeiji.png"));
                mark1 = 0;



            }
            //s-size plane
            else {
                enemys.push(new enemy(1, 19, 286, 34, 24, 1000, 360, random(1, 4), "image/xiaofeiji.png"));
            }
            if (mark2 == 30) { //randomly assign 4 kinds of skills
                switch (random(1, 4)) {
                case 1:
                    jinengs.push(new jineng(random(120, 286), random(130, 286), 34, 34, 1, "image/zb1.png"));
                    break;
                case 2:
                    jinengs.push(new jineng(random(120, 486), random(130, 286), 34, 34, 2, "image/zb2.png"));
                    break;
                case 3:
                    jinengs.push(new jineng(random(120, 286), random(130, 286), 34, 34, 3, "image/zb3.png"));
                    break;
                case 4:
                    jinengs.push(new jineng(random(120, 286), random(130, 286), 34, 34, 4, "image/zb4.png"));
                    break;
                }

                mark2 = 0;
            }
            mark = 0;
        }
        /*
        enemy plane movement
         */
        var enemyslen = enemys.length;
        for (var i = 0; i < enemyslen; i++) {
            if (enemys[i].planisdie != true) {

                enemys[i].planmove();
                //create enemy bullets
                switch (enemys[i].imagenode.offsetWidth) {
                case 34:

                    break;
                case 46:

                    break;
                case 90:
                    if (djmark % 300 == 0) {
                        //create enemy m-size plane bullet
                        var djzd = new oddbullet(parseInt(enemys[i].imagenode.style.left) + 40, parseInt(enemys[i].imagenode.style.top) + 110, 10, 10, "image/img_bullet.png");
                        djzd.bullettype = 2;

                        bullets.push(djzd);
                        djmark = 0;
                    }
                    break;
                case 110:
                    if (djmark % 400 == 0) {
                        var djzd = new oddbullet(parseInt(enemys[i].imagenode.style.left) + 35, parseInt(enemys[i].imagenode.style.top) + 168, 15, 30, "image/bimg_bullet.png");
                        djzd.bullettype = 2;

                        bullets.push(djzd);
                        djzd = new oddbullet(parseInt(enemys[i].imagenode.style.left) + 70, parseInt(enemys[i].imagenode.style.top) + 168, 15, 30, "image/bimg_bullet.png");
                        djzd.bullettype = 2;

                        bullets.push(djzd);
                        djmark = 0;
                    }
                    break;


                }
            }
            // alert(enemys[i].imagenode.offsetWidth);
            //if(mark==4)clearInterval(set);
            //delete enemy plane with reach the limit of canvas size
            if (enemys[i].imagenode.offsetTop > 558) {
                mainDiv.removeChild(enemys[i].imagenode);
                enemys.splice(i, 1);
                enemyslen--;
            }
            //when an enemy plane is destroyed, delete it after a certain amount of time.
            if (enemys[i].planisdie == true) {
                enemys[i].plandietimes += 20;
                if (enemys[i].plandietimes == enemys[i].plandietime) {
                    mainDiv.removeChild(enemys[i].imagenode);
                    enemys.splice(i, 1);
                    enemyslen--;
                }
            }

        }

        /*
        collision detection
        */
        //if a plane gets a buff, add a light-ring effect
        for (var m = 0; m < jinengslen; m++) {
            if (jinengs[m].jinengimage.offsetLeft + jinengs[m].jinengsizeX >= selfplan.imagenode.offsetLeft && jinengs[m].jinengimage.offsetLeft <= selfplan.imagenode.offsetLeft + selfplan.plansizeX) {
                if (jinengs[m].jinengimage.offsetTop + jinengs[m].jinengsizeY >= selfplan.imagenode.offsetTop + 40 && jinengs[m].jinengimage.offsetTop <= selfplan.imagenode.offsetTop - 20 + selfplan.plansizeY) {
                    //assign effects according to the kinds of buff
                    selfplan.weaptype = jinengs[m].jinengtype; //将当前技能变成自己的武器
                    switch (jinengs[m].jinengtype) {
                    case 4:
                        daodans.push(new daodan(weapsDiv.style.left + 5, weaps.style.top, 25, 50, 1, "image/daodan1.png"));
                        numdaodan.innerHTML = daodans.length;
                        daodanlist.style.display = "block";
                        break;
                    }
                    var shengji = new boom(parseInt(jinengs[m].jinengimage.style.left) - 40, parseInt(jinengs[m].jinengimage.style.top) - 10, 128, 128, "image/sj.png");

                    setTimeout(function () {
                        mainDiv.removeChild(shengji.boomimage);
                    }, 300);
                    mainDiv.removeChild(jinengs[m].jinengimage);
                    jinengs.splice(m, 1);
                    jinengslen--;
                    break;
                }

            }

        }

        for (var k = 0; k < bulletslen; k++) {
            for (var j = 0; j < enemyslen; j++) {

                //detect user plane collision
                if (enemys[j].planisdie == false) {
                    if (enemys[j].imagenode.offsetLeft + enemys[j].plansizeX >= selfplan.imagenode.offsetLeft && enemys[j].imagenode.offsetLeft <= selfplan.imagenode.offsetLeft + selfplan.plansizeX) {
                        if (enemys[j].imagenode.offsetTop + enemys[j].plansizeY >= selfplan.imagenode.offsetTop + 40 && enemys[j].imagenode.offsetTop <= selfplan.imagenode.offsetTop - 20 + selfplan.plansizeY) {
                            //if user plane collision is detected, game over
                            // selfplan.imagenode.src="image/bffjbx.gif";
                            new boom(parseInt(selfplan.imagenode.style.left), parseInt(selfplan.imagenode.style.top) - 10, 70, 70, "image/ownbz.png");
                            enddiv.style.display = "block";
                            planscore.innerHTML = scores;
                            if (document.removeEventListener) {
                                mainDiv.removeEventListener("mousemove", yidong, true);
                                bodyobj.removeEventListener("mousemove", bianjie, true);
                            } else if (document.detachEvent) {
                                mainDiv.detachEvent("onmousemove", yidong);
                                bodyobj.removeEventListener("mousemove", bianjie, true);
                            }
                            clearInterval(set);
                        }
                    }
                    //detect user bullet with enemy planes
                    if ((bullets[k].bullettype == 1 && bullets[k].bulletimage.offsetLeft + bullets[k].bulletsizeX > enemys[j].imagenode.offsetLeft) && (bullets[k].bulletimage.offsetLeft < enemys[j].imagenode.offsetLeft + enemys[j].plansizeX)) {
                        if (bullets[k].bullettype == 1 && bullets[k].bulletimage.offsetTop <= enemys[j].imagenode.offsetTop + enemys[j].plansizeY && bullets[k].bulletimage.offsetTop + bullets[k].bulletsizeY >= enemys[j].imagenode.offsetTop) {
                            //enemy Health subtract by bullet value
                            enemys[j].planhp = enemys[j].planhp - bullets[k].bulletattach;
                            //enemy health = 0, create an image of explosion, delete enemy plane, add score.
                            if (enemys[j].planhp <= 0) {
                                scores = scores + enemys[j].planscore;
                                scorelabel.innerHTML = scores;

                                //  enemys[j].imagenode.src=enemys[j].planboomimage;
                                switch (enemys[j].imagenode.offsetWidth) {
                                case 34: //explosion effect of s-size plane
                                    var xiaofeijiboom = new boom(parseInt(enemys[j].imagenode.style.left) - 15, parseInt(enemys[j].imagenode.style.top) - 10, 20, 20, "image/ownbz.png");
                                    booms.push(xiaofeijiboom);
                                    setTimeout(function () {

                                        //mainDiv.removeChild(xiaofeijiboom);
                                        var boomslen = booms.length;
                                        for (var b = 0; b < boomslen; b++) {
                                            mainDiv.removeChild(booms[b].boomimage);
                                            booms.splice(b, 1);
                                            boomslen--;
                                        }

                                    }, 300);
                                    break
                                case 46: //explosion effect of m-size plane
                                    var zhongfeijiboom = new boom(parseInt(enemys[j].imagenode.style.left) - 10, parseInt(enemys[j].imagenode.style.top) - 10, 40, 40, "image/ownbz.png");
                                    booms.push(zhongfeijiboom);
                                    setTimeout(function () {
                                        //mainDiv.removeChild(zhongfeijiboom);
                                        var boomslen = booms.length;
                                        for (var b = 0; b < boomslen; b++) {
                                            mainDiv.removeChild(booms[b].boomimage);
                                            booms.splice(b, 1);
                                            boomslen--;
                                        };
                                    }, 300);
                                    break;
                                case 90:
                                    var xiaozhongfeijiboom = new boom(parseInt(enemys[j].imagenode.style.left) - 12, parseInt(enemys[j].imagenode.style.top) - 16, 40, 40, "image/xzfjbz.png");
                                    booms.push(xiaozhongfeijiboom);
                                    setTimeout(function () {
                                        //mainDiv.removeChild(zhongfeijiboom);
                                        var boomslen = booms.length;
                                        for (var b = 0; b < boomslen; b++) {
                                            mainDiv.removeChild(booms[b].boomimage);
                                            booms.splice(b, 1);
                                            boomslen--;
                                        };
                                    }, 300);
                                    break;
                                case 110: //explosion effect of l-size plane
                                    var dafeijiboom = new boom(parseInt(enemys[j].imagenode.style.left) - 10, parseInt(enemys[j].imagenode.style.top) + 10, 80, 80, "image/dfjbz.png");
                                    booms.push(dafeijiboom);
                                    setTimeout(function () {
                                        //mainDiv.removeChild(dafeijiboom);
                                        var boomslen = booms.length;
                                        for (var b = 0; b < boomslen; b++) {
                                            mainDiv.removeChild(booms[b].boomimage);
                                            booms.splice(b, 1);
                                            boomslen--;
                                        };
                                    }, 300);
                                    break;

                                }
                                enemys[j].planisdie = true;
                            }
                            //delete bullet
                            mainDiv.removeChild(bullets[k].bulletimage);
                            bullets.splice(k, 1);
                            bulletslen--;
                            break;
                        }
                    }
                    //detect collision between enemy bullet and user plane
                    if ((bullets[k].bullettype != 1 && bullets[k].bulletimage.offsetLeft + bullets[k].bulletsizeX > selfplan.imagenode.offsetLeft) && (bullets[k].bulletimage.offsetLeft < selfplan.imagenode.offsetLeft + selfplan.plansizeX)) {
                        if (bullets[k].bullettype != 1 && bullets[k].bulletimage.offsetTop <= selfplan.imagenode.offsetTop + selfplan.plansizeY && bullets[k].bulletimage.offsetTop + bullets[k].bulletsizeY >= selfplan.imagenode.offsetTop) {

                            //when collide, game over
                            // selfplan.imagenode.src="image/bffjbx.gif";
                            new boom(parseInt(selfplan.imagenode.style.left), parseInt(selfplan.imagenode.style.top) - 10, 70, 70, "image/ownbz.png");
                            enddiv.style.display = "block";
                            planscore.innerHTML = scores;
                            if (document.removeEventListener) {
                                mainDiv.removeEventListener("mousemove", yidong, true);
                                bodyobj.removeEventListener("mousemove", bianjie, true);
                            } else if (document.detachEvent) {
                                mainDiv.detachEvent("onmousemove", yidong);
                                bodyobj.removeEventListener("mousemove", bianjie, true);
                            }
                            clearInterval(set);

                        }

                    }
                }

            }
        }


    }
    /*
    action when clicking the start button
     */
    var set;

    function begin() {

        startdiv.style.display = "none";
        //   mousediv.style.display="block";
        mainDiv.style.display = "block";
        selfplan.imagenode.style.display = "block";
        scorediv.style.display = "block";
        /*
         use the start function
         */
        set = setInterval(start, 20);
    }
    //action when clicking the continue button after game is over
    function jixu() {
        location.reload(true);
    }