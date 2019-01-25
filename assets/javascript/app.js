//key: BxWrhZgY7nal8uWjc8RJPFrZzoTYFoSx

var searchTerm = '';
var beginYear = '';
var endYear = '';
var numberRecs = 1;

//searchTerm
//numberRecs
//startYear
//endYear
//searchBtn
//clearBtn
//articleDiv

$('#clearBtn').on('click', function () {

    searchTerm = '';
    beginYear = '';
    endYear = '';
    numberRecs = 1;

    //add jquery to clear html
    $('#searchTerm').attr('value', '');
    $('#beginYear').attr('value', '');
    $('#endYear').attr('value', '');
    $('#numberRecs').attr('value', '1');
    //clear the articleDiv
    $('#articleDiv').clear();

});

$('#searchBtn').on('click', function (event) {

    event.preventDefault();

    //get searchTerm value and put in searchTerm
    searchTerm = $('#searchTerm').val();
    beginYear = $('#startYear').val();
    endYear = $('#endYear').val();
    numberRecs = $('#numberRecs').val();
    console.log(searchTerm, beginYear, endYear, numberRecs);

    var srchURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + '&page=0&api-key=BxWrhZgY7nal8uWjc8RJPFrZzoTYFoSx';

    if (beginYear !== '') {
        srchURL += '&begin_date=' + beginYear;
    }
    if (endYear !== '') {
        srchURL += '&end_date=' + endYear;
    }

$.ajax({
    url: srchURL,
    method: 'GET'
}).then(function (returnedData) {

    var docs = returnedData.response.docs;

    console.log(returnedData);

    var ul = $('<ul>');  

    for(var i=0;i<numberRecs;i++){

    //add the articles to articleDiv
    //index starting at 1
    //docs[i].headline.main on same line
    //docs[i].byline.original on new line
    //Section: docs[i].section_name on new line
    //docs[i].pub_date on new line
    //docs[i].web_url on new line as link


        var li = $('<li>');
        var span = $('<span>');
        span.text(i+1+' ');
        li.append(span);
        var strong = $('<strong>');
        strong.text(docs[i].headline.main);
        li.append(strong);
        var bylineh5 = $('<h5>');
        bylineh5.text(docs[i].byline.original);
        li.append(bylineh5);

        if(docs[i].section_name !== undefined) {
            var sectionh5 = $('<h5>');
            sectionh5.text('Section: '+docs[i].section_name);
            li.append(sectionh5);
        }
        var pubh5 = $('<h5>');
        pubh5.text(docs[i].pub_date);
        li.append(pubh5);
        var aUrl = $('<a>');
        aUrl.attr('href',docs[i].web_url);
        aUrl.text(docs[i].web_url);
        li.append(aUrl);
        ul.append(li);
    }
    $('#articleDiv').append(ul);

});
    
});
