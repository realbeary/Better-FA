var username = document.getElementsByClassName("column")[1]
var old = false
if (typeof username == 'undefined') {
    old = true //old interface is used
    username = document.getElementsByClassName("dropdown")[1].children[0].children['my-username'].href
}else{
    username = username.children[1].getAttribute("href")
}

//check if logged in
if (typeof username != null) {
    var user = 0
    if(old == true){
        user = username.slice(33, -1);
    }else{
        user = username.slice(6, -1);
    }
    var pages = 0
    var watchindex = 0
    var gotwatch = false
    var gotallfavs = false
    var requestrefresh = true
    var requestgeneral = true
    var requestmature = false
    var requestadult = false
    const truedic = { "value": true }
    var currentknownartists = []
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    var artiststoignore = []
    favnextlink = "https://www.furaffinity.net/favorites/" + user
    var gotwatchwarning = false
    console.log(gotwatchwarning)

    function httpGet(theUrl) {
        console.log(theUrl)
        let xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.open("GET", theUrl, false);
        xmlHttpReq.send(null);
        return xmlHttpReq.responseText
    }

    const getRecs = async () => {
        if (typeof username == 'undefined') {
            return
        }
        var jsonarg = {}
        jsonarg.user_id = user
        jsonarg.page = pages
        jsonarg.artiststoignore = artiststoignore
        jsonarg.requestrefresh = requestrefresh
        jsonarg.popularity = document.getElementById('popularityslider').value
        jsonarg.requestgeneral = document.getElementById('gcheck').checked
        jsonarg.requestmature = document.getElementById('mcheck').checked
        jsonarg.requestadult = document.getElementById('acheck').checked
        jsonarg.ignorefromwatched = document.getElementById('ignorefromwatchedcheck').checked
        jsonarg.ignorefromfaved = document.getElementById('ignorefromfavedcheck').checked
        j = new URLSearchParams(jsonarg).toString()
        const url = 'https://betterfa.xyz/getrecommendations/?' + j
        console.log(url)
        const response = await fetch(url, {
            method: "get",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420",
            }),
        })

        const myJson = await response.json();
        if (requestrefresh == true) {
            requestrefresh = false
        }
        if (myJson.Status != 'Ok') {
            console.log(myJson.Status)
            if (myJson.Status == "Ran out of recommendations!") {
                ranoutp1.innerText = "This is it... This is the end!"
                ranoutp2.innerHTML = "Want to unlock INFINITE SCROLLING?? Support the development of Better FA now on <a href=\"www.patreon.com/realbeary\">Patreon</a>!"
                ranoutdiv.style.display = ''
            }
            if (myJson.Status == "Ran out of recommendations because of the filters!") {
                ranoutp1.innerText = "You have run out of recommendations when it shouldn't have happened just yet... Try again with less strict filters!"
                ranoutdiv.style.display = ''
            }
            errordiv.display = ''
            errordiv.innerHTML = myJson.Status
            return false
        }
        errordiv.display = 'none'
        var list = myJson.Reclist
        for (var i of list) {
            var img = document.createElement("img");
            img.setAttribute("src", i.thumburl)
            img.setAttribute("class", "recimgs ")
            var a = document.createElement("a");
            var href = "/view/" + (i.id.toString()) + "/"

            a.setAttribute("href", href)
            var u = document.createElement("u");
            var b = document.createElement("b");
            var caption = document.createElement("figcaption");
            var capp1 = document.createElement("p");
            var capa1 = document.createElement("a");


            capa1.setAttribute("title", i.title)
            capa1.innerHTML = i.title
            capa1.setAttribute("href", href)
            capp1.append(capa1)


            var capp2 = document.createElement("p");
            var capa2 = document.createElement("a");
            capa2.setAttribute("href", i.authorurl)
            capa2.setAttribute("title", i.author)
            capa2.innerHTML = i.author
            var capi = document.createElement("i");
            capi.innerHTML = "by"
            capp2.append(capi)
            capp2.append(capa2)

            var figure = document.createElement("figure");
            caption.append(capp1)
            caption.append(capp2)
            figure.setAttribute("class", "t-image " + i.class)
            a.append(img)
            u.append(a)
            b.append(u)
            figure.append(b)
            figure.append(caption)
            gallery.append(figure)

        }
        pages = pages + 1
        return true
    }

    var minGap = 0;
    var gotrecs = false

if(old){
    legacy = document.getElementById("frontpage")
}else{
    legacy = document.getElementsByClassName("content")[0]
}

    var tabs = document.createElement("div");
    var b1 = document.createElement("button");
    var b2 = document.createElement("button");
    var b3 = document.createElement("button");
    var b4 = document.createElement("button");

    var text1 = document.createTextNode("Recommended (beta)");
    b1.appendChild(text1);
    var text2 = document.createTextNode("Watchlist");
    b2.appendChild(text2);
    var text3 = document.createTextNode("Favorites");
    b3.appendChild(text3);
    var text4 = document.createTextNode("Legacy view");
    b4.appendChild(text4);

    var errordiv = document.createElement("div");
    var ranoutdiv = document.createElement("div");
    var ranoutp1 = document.createElement("p");
    var ranoutp2 = document.createElement("p");
    ranoutp1.id = "thendone"
    ranoutp2.id = "thendtwo"
    var refreshbutton = document.createElement("button");
    refreshbutton.innerText = "Refresh"
    refreshbutton.style.display = ''
    refreshbutton.onclick = function () {
        ranoutdiv.style.display = 'none';
        pages = 0;
        requestrefresh = true;
        gallery.innerHTML = "";
        getRecs();
    }

    var acheck = document.createElement("input");
    var mcheck = document.createElement("input");
    var gcheck = document.createElement("input");
    acheck.type = "checkbox"
    mcheck.type = "checkbox"
    gcheck.type = "checkbox"
    acheck.id = "acheck"
    mcheck.id = "mcheck"
    gcheck.id = "gcheck"
    acheck.checked = false
    mcheck.checked = false
    gcheck.checked = true
    var alabel = document.createElement("label");
    var mlabel = document.createElement("label");
    var glabel = document.createElement("label");
    alabel.setAttribute("for", "acheck")
    mlabel.setAttribute("for", "mcheck")
    glabel.setAttribute("for", "gcheck")
    alabel.innerText = "Adult"
    mlabel.innerText = "Mature"
    glabel.innerText = "General"
    var adiv = document.createElement("div");
    var mdiv = document.createElement("div");
    var gdiv = document.createElement("div");

    gdiv.append(glabel)
    gdiv.append(gcheck)
    mdiv.append(mlabel)
    mdiv.append(mcheck)
    adiv.append(alabel)
    adiv.append(acheck)

    var checkdiv = document.createElement("div");
    checkdiv.style.display = "flex"

    checkdiv.append(adiv)
    checkdiv.append(mdiv)
    checkdiv.append(gdiv)

    var ignorefromwatcheddiv = document.createElement("div");
    var ignorefromwatchedcheck = document.createElement("input");
    var ignorefromwatchedlabel = document.createElement("label");
    ignorefromwatchedlabel.setAttribute("for", "gcheck")
    ignorefromwatchedcheck.type = "checkbox"
    ignorefromwatchedcheck.id = "ignorefromwatchedcheck"
    ignorefromwatchedlabel.setAttribute("for", "ignorefromwatchedcheck")
    ignorefromwatchedlabel.innerText = "Ignore from users already watched"
    ignorefromwatchedcheck.checked = true
    ignorefromwatcheddiv.append(ignorefromwatchedlabel)
    ignorefromwatcheddiv.append(ignorefromwatchedcheck)

    var ignorefromfaveddiv = document.createElement("div");
    var ignorefromfavedcheck = document.createElement("input");
    var ignorefromfavedlabel = document.createElement("label");
    ignorefromfavedcheck.type = "checkbox"
    ignorefromfavedcheck.id = "ignorefromfavedcheck"
    ignorefromfavedlabel.setAttribute("for", "ignorefromfavedcheck")
    ignorefromfavedlabel.innerText = "Ignore from users already faved"
    ignorefromfavedcheck.checked = true
    ignorefromfaveddiv.append(ignorefromfavedlabel)
    ignorefromfaveddiv.append(ignorefromfavedcheck)

    var sliderdiv = document.createElement("div");
    var filterslider = document.createElement("input");
    filterslider.type = "range"
    filterslider.value = 75
    filterslider.min = 40
    filterslider.max = 100
    filterslider.style.direction = "rtl"
    filterslider.id = "popularityslider"
    var sliderlabel = document.createElement("label");
    sliderlabel.setAttribute("for", "popularityslider")
    sliderlabel.innerText = "Popularity filter"

    sliderdiv.append(sliderlabel)
    sliderdiv.append(filterslider)

    var recsettingsdiv = document.createElement("div");
    var recothersettingsdiv = document.createElement("div");


    ranoutdiv.style.display = 'none'
    errordiv.style.display = 'none'
    var recpage = document.createElement("div");
    recpage.id = "recpage"
    recpage.style.display = 'none'
    var reccontent = document.createElement("div");
    reccontent.className = 'content'
    var recsection = document.createElement("section");
    recsection.className = "gallery s-250 "
    var recsectionbody = document.createElement("div");
    recsectionbody.className = 'section-body'
    var gallerymargin = document.createElement("div");
    gallerymargin.className = "gallery-frontpage-submission-margin"
    var gallery = document.createElement("section");
    gallery.className = "gallery-frontpage-submission"



    var favpage = document.createElement("div");
    favpage.id = "favpage"
    favpage.style.display = 'none'
    var favcontent = document.createElement("div");
    favcontent.className = 'content'
    var favsection = document.createElement("section");
    favsection.className = "gallery s-250 "
    var favsectionbody = document.createElement("div");
    favsectionbody.className = 'section-body'
    var favgallerymargin = document.createElement("div");
    favgallerymargin.className = "gallery-frontpage-submission-margin"
    var favgallery = document.createElement("section");
    favgallery.className = "gallery-frontpage-submission"

    var watchpage = document.createElement("div");
    watchpage.id = "watchpage"
    watchpage.style.display = 'none'
    var watchcontent = document.createElement("div");
    watchcontent.className = 'content'
    var watchsection = document.createElement("section");
    watchsection.className = "gallery s-250 "
    var watchsectionbody = document.createElement("div");
    watchsectionbody.className = 'section-body'
    var watchgallerymargin = document.createElement("div");
    watchgallerymargin.className = "gallery-frontpage-submission-margin"
    var watchgallery = document.createElement("section");
    watchgallery.className = "gallery-frontpage-submission"
    var watchwarning = document.createElement("div");
    watchwarning.className = "warning"
    var watchwarningp = document.createElement("p");
    watchwarningp.style.float = 'Right'
    var watchwarningsp = document.createElement("span");
    watchwarningp.style.float = 'Left'
    watchwarningp.style.marginBottom = '0'
    watchwarningsp.innerText = "✖"
    var truevar = true
    watchwarningsp.onclick = function () {
        this.parentNode.remove();
        chrome.storage.local.set({ 'gotwatchwarning': truedic });
        return false;
    }
    watchwarningp.innerText = "This page is automatically generated from your notification box, so don't clear it!"
    gallerymargin.append(gallery)
    recsectionbody.append(gallerymargin)
    recsection.append(recsectionbody)
    reccontent.append(recsection)
    recpage.append(errordiv)
    recsettingsdiv.append(refreshbutton)
    recsettingsdiv.style.display = "flex"
    recothersettingsdiv.append(checkdiv)
    recothersettingsdiv.append(ignorefromwatcheddiv)
    recothersettingsdiv.append(ignorefromfaveddiv)
    recothersettingsdiv.append(sliderdiv)
    recsettingsdiv.append(recothersettingsdiv)
    reccontent.prepend(recsettingsdiv)
    recpage.append(reccontent)
    ranoutdiv.append(ranoutp1)
    ranoutdiv.append(ranoutp2)
    reccontent.append(ranoutdiv)

    favgallerymargin.append(favgallery)
    favsectionbody.append(favgallerymargin)
    favsection.append(favsectionbody)
    favcontent.append(favsection)
    favpage.append(favcontent)

    watchgallerymargin.append(watchgallery)
    watchsectionbody.append(watchgallerymargin)
    watchsection.append(watchsectionbody)
    watchcontent.append(watchsection)
    watchwarning.append(watchwarningp)
    watchwarning.append(watchwarningsp)
    chrome.storage.local.get(['gotwatchwarning'], function (result) {
        if (result.gotwatchwarning === undefined) {
            watchpage.prepend(watchwarning)
        }
    });

    watchpage.append(watchcontent)

if(old){
    document.getElementsByTagName("div")[6].append(recpage)
    document.getElementsByTagName("div")[6].append(favpage)
    document.getElementsByTagName("div")[6].append(watchpage)
}else{
    document.getElementById("columnpage").append(recpage)
    document.getElementById("columnpage").append(favpage)
    document.getElementById("columnpage").append(watchpage)
}

    b1.onclick = function () {
        if (gotrecs == false) {
            if (getRecs()) {
                gotrecs = true
            }
        }
        recpage.style.display = ''
        legacy.style.display = 'none'
        favpage.style.display = 'none'
        watchpage.style.display = 'none'
    };

    b2.onclick = function () {
        recpage.style.display = 'none'
        legacy.style.display = 'none'
        favpage.style.display = 'none'
        watchpage.style.display = ''
        if (gotwatch == false) {
            updatewatchpage()
            watchindex = watchindex + 1
            gotwatch = true
        }
    };


    b3.onclick = function () {
        recpage.style.display = 'none'
        legacy.style.display = 'none'
        favpage.style.display = ''
        watchpage.style.display = 'none'
    };


    b4.onclick = function () {
        recpage.style.display = 'none'
        legacy.style.display = ''
        favpage.style.display = 'none'
        watchpage.style.display = 'none'
    };


    tabs.append(b1)
    tabs.append(b2)
    tabs.append(b3)
    tabs.append(b4)

if(old){
    document.getElementsByTagName("div")[6].prepend(tabs)
}else{
    document.getElementById("site-content").prepend(tabs)
}

    var el = document.createElement('html');
    var watchel = document.createElement('html');

    const updatefavpage = async () => {
        html = httpGet(favnextlink)
        el.innerHTML = html
        var arr = el.querySelectorAll('figure')
        for (var i of arr) {
            favgallery.append(i)
        }
        favnextlink = el.getElementsByClassName("button mobile-button right")[0]
        if (favnextlink === undefined) {
            gotallfavs = true
            return
        }
        favnextlink = favnextlink.href
    }

    var subbox = "https://www.furaffinity.net/msg/submissions/"
    updatefavpage()

    gotwatch = false

    const updatewatchpage = async (index) => {
        var htmla = httpGet(subbox)
        watchel.innerHTML = htmla
        var arrw = watchel.querySelectorAll('figure')
        for (let item of arrw) {
            item.querySelector('label').querySelector('div').style.display = 'none'
        }
        for (let item of arrw) {
            watchgallery.append(item)
        }
        gotwatch = true
        return
    }

    window.onscroll = function (ev) {
        if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight)) {
            if (recpage.style.display == '') {
                requestrefresh = false
                getRecs()
                return
            }
            if (favpage.style.display == '') {
                if (gotallfavs == false) {
                    updatefavpage()
                    return
                }
            } if (watchpage.style.display == '') {
                if (gotwatch == false) {
                    updatewatchpage(watchindex)
                }
                watchindex = watchindex + 1
                return

            }
        }
    };
}