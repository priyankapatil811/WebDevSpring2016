(function(){
    angular
        .module("jgaSortable", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(FieldService) {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;
            $(element).sortable({
                axis: jgaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                    console.log(start);
                },
                stop: function(event, ui) {
                    end = ui.item.index();

                    //FieldService.getFieldsForForm(scope.formId).then(function(response) {
                    //    scope.fields = response.data;
                    //});

                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();