//$(document).on('click', '#myReg', function() {
//    $('#myHeader').toggle();
//});
//
//$(document).on('click', '#signInBtn', function() {
//    $('#myHeader').toggle();
//});

//$(function() {
//    var wtf    = $('#scroll');
//    var height = wtf[0].scrollHeight;
//    wtf.scrollTop(height);
//});

//Page is loading start progress
document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        NProgress.start(); //start progress bar
    }
};

//when page is loaded stop progress
var everythingLoaded = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
        clearInterval(everythingLoaded);
        setTimeout(function(){NProgress.done()},500);
    }
}, 10);

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {
    $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below
        $(this).removeClass("btn-default").addClass("btn-primary");
    });
});

$('img').click(function(){
 //   $('.selected').removeClass('selected'); // removes the previous selected class
    $(this).addClass('selected'); // adds the class to the clicked image
});