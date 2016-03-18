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
            var sortAxis = attributes.sortAxis;
            $(element).sortable({
                axis: sortAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    FieldService.getFieldsForForm(scope.formId).then(
                        function(response)
                        {
                            scope.fields = response.data;
                            console.log(scope.fields);
                        }
                    );

                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
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