$(document).on('click', '#myReg', function() {
    $('#myHeader').toggle();
});

$(document).on('click', '#signInBtn', function() {
    $('#myHeader').toggle();
});

$(function() {
    var wtf    = $('#scroll');
    var height = wtf[0].scrollHeight;
    wtf.scrollTop(height);
});