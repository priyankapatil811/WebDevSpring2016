/**
 * Created by Priyanka on 3/17/16.
 */
(function(){
    angular
        .module("fieldsSortable", [])
        .directive("fieldsSortable", fieldsSortable);

    function fieldsSortable(FieldService) {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    FieldService.reorderFields().then(
                        function(response)
                        {

                        }
                    );
                    scope.$apply();
                /*
                    var temp = scope.users[start];
                    scope.users[start] = scope.users[end];
                    scope.users[end] = temp;
                    scope.$apply();
                    */
                }
            });
        }
        return {
            link: link
        }
    }
})();