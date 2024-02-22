(function ($) {
    "use strict";
    $.each($(".field-group-table"), function (index, item){
        var _table_body = $(item).find("tbody");
        var _last_row = $(item).find("tbody tr:last");
        var row_id = 1;
        if(_last_row.length == 1){
            row_id = _last_row.data("id");
        }
        _table_body.data("row", row_id);
    });
    $(document).on("click", ".field-group .add", function(){
        var _this = $(this);
        var _table = _this.parents("table.field-group-table");
        var _table_body = _table.find("tbody");
        var _last_row = _table.find("tbody tr:last");
        var row_id = 1;
        if(typeof _table_body.data("row") === "undefined"){
            if(_last_row.length == 1){
                row_id = _last_row.data("id")+1;
            }
        }
        else{
            row_id = _table_body.data("row")+1;
        }
        _table_body.data("row", row_id);
        // var row_id = (_last_row.length == 1)?_last_row.data("id")+1:1;
        var fields_data = _this.data("fields");
        fields_data = window[fields_data];
        var row = $($.parseHTML("<tr data-id=\""+row_id+"\"></tr>"));
        $.each(fields_data, function (index, item){
            var dom_nodes = $($.parseHTML("<td class=\"group-field-"+item.type+"\"><div"+" class=\"field-"+item.type+"\">"+item.template+"</div></td>"));
            var _el = dom_nodes.find("#"+item.id);
            var el_id = _el.attr('id') + '-' + row_id;
            var el_name = _el.attr('name') + '[' + row_id + ']';
            _el.attr('id', el_id);
            _el.attr('name', el_name);
            if(item.type == 'select' && !$("body").hasClass("wp-admin"))
                _el.select2({allowClear: true});
            row.append(dom_nodes);
        });
        row.append("<td class=\"group-field-delete\"><a href=\"javascript:void(0);\" class=\"delete\" data-target=\""+row_id+"\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n</a></td>");
        _table.find("tbody").append(row);
    });
    $(document).on("click", ".field-group .delete", function(){
        var _this = $(this);
        var _table = _this.parents("table");
        var row_id = _this.data("target");
        var _row = _table.find("tr[data-id="+row_id+"]");
        _row.remove();
    });
})(jQuery);