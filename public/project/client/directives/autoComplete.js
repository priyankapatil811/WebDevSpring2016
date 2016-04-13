(function(){
    angular
        .module("autoComplete", [])
        .directive("autoComplete", autoComplete);

    function autoComplete(UserService)
    {
        var getData = function (request, response) {
             UserService.findAllUsers().then(
                function (data) {
                    response(data);
                });
        };

        var selectItem = function (event, ui) {
            $("#myText").val(ui.item.value);
            return false;
        };

        $("#myText").autocomplete({
            source: getData,
            select: selectItem,
            minLength: 4,
            change: function() {
                $("#myText").val("").css("display", 2);
            }
        });
    }
});