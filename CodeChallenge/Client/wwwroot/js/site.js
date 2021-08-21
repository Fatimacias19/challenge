// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var pageSize = 5;
var pageIndex = 2;
function renderInfiniteScrolling(type, filter) {
    $(window).scroll(function () {
        if (parseInt(Math.round($(window).scrollTop())) ==
            $(document).height() - $(window).height()) {
            GetData(type, filter);
        }
    });
}
function fnSaveLocal(article,isUpdate) {
    var articles = fnGetLocal();
    var id = $("#idImage").val();
    var base64String = sessionStorage.getItem(id)
    sessionStorage.removeItem(id);
    article['articles'][0]['image'] = base64String;

    if (articles == null) {
        localStorage.setItem("articles", JSON.stringify(article));
    }
    else {
        console.log(isUpdate);
        if (isUpdate == 1) {
            const index = articles['articles'].findIndex(x => x.id === id);
            articles['articles'].splice(index, 1);
        }
        articles['articles'].push(article['articles'][0]);
        articles['TotalArticles'] = articles['articles'].length;
        localStorage.setItem("articles", JSON.stringify(articles));
    }
    return
}
function fnGetLocal() {
    var ret = localStorage.getItem("articles");
    if (ret == null)
        return;
    return (JSON.parse(ret));
}
function fnGetLocalId(id) {
    var ret = localStorage.getItem("articles");
    ret = JSON.parse(ret);
    const resultado = ret['articles'].find(x => x.id === id);
    sessionStorage.setItem(id, resultado['image']);
    return (resultado);
}
function Draw(data, type) {

    var html='<a href="@url"><div class="article"><div class="article__hero"><div class="article__hero-image imgix-fluid imgix-bg" data-src="Image" style="background-image: url(##Image);"></div>';
    html += '</div><div class="article__info"><h3 class="article__title"><span>@Title</span>@Description</h3>';
    html += '<div class="article__dek"><p>@Content</p></div><div><div class="article__meta"><span class="by">By</span> @SourceName @PublishedAt';
    html += '</div></div></div></div></a>'

    for (var i = 0; i < data.length; i++) {
        var url1 = data[i].url;
        var url2 = data[i].image
        console.log(url2);
        if (type == 'Local') {
            url1 = "/Article/Show/" + data[i].id;
            url2 = "data:image/png;base64,"+data[i].image;
        }
        let html1 = html.replace("@url", url1).replace("@Title", data[i].title).replace("@PublishedAt", data[i].publishedAt).replace("@Description", data[i].description).replace("@Content", data[i].content).replace("@SourceName", data[i]['source'].name);
        html1 = html1.replace("##Image", encodeURI(url2));
        $("#container").appsend(html1);
    }
    pageIndex++;
}
function GetData(type,filter) {
    if (type == 'External') {
        $.ajax({
            type: 'GET',
            url: 'https://gnews.io/api/v4/search',
            data: { "page": pageIndex, "max": pageSize, "q": filter, "token": "ac42615a4c43a37d65d9c37c6e14f763" },
            dataType: 'json',
            success: function (data) {
                if (data != null) {
                    Draw(data['articles'], type);
                }
            },
            beforeSend: function () {
                $("#progress").show();
            },
            complete: function () {
                $("#progress").hide();
            },
            error: function () {
                //alert("Error while retrieving data!");
            }
        });
    }
}
function readURL(input) {
    document.getElementById("bannerImg").style.display = "block";
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
           document.getElementById('bannerImg').src = e.target.result;
           const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            var str = $("#idImage").val();
           sessionStorage.setItem(str, base64String)
        }
        reader.readAsDataURL(input.files[0]);
    }
}
