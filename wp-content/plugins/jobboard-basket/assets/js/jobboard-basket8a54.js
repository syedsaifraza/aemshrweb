(function( $ ) {
    "use strict";

    /* add to basket. */
    $('body').on('click', '.basket-add', function () {
        var _this = $(this);
        var btn = $(this);
        var id  = btn.data('id');

        if(id === ''){
            return;
        }

        if(!_this.is('[data-modal]')){
            btn.prop('disabled', true);
            btn.find('.cart').css('display', 'none');
            btn.find('.jobboard-loading').attr('style', '');
            $.post(jobboard_localize_basket.ajaxurl, {'action': 'jobboard_basket_ajax_add', 'id': id}, function(response) {
                jobboard_create_notices(response.message, response.type);
                if(response.type === 'error'){
                    btn.prop('disabled', false);
                    btn.find('.cart').attr('style', '');
                    btn.find('.jobboard-loading').css('display', 'none');
                } else {
                    update_basket();
                    btn.removeClass('basket-add').addClass('basket-added');
                    btn.find('.cart').attr('style', '');
                    btn.find('.jobboard-loading').css('display', 'none');
                    btn.find('.add').css('display', 'none');
                    btn.find('.added').attr('style', '');
                }
            });
        }
    });

    // grid jobs element add to basket
    $(document).on('click', '.grid-jobs-basket-add', function () {
        var parent = $(this).parent();
        var btn = $(this);
        var id  = btn.data('id');
        var loader = btn.find('.jobboard-loading');
        var icon = btn.find('.icon');
        var deleteBtn = parent.find('.grid-jobs-basket-delete');
        var allAddBtn = $('.grid-jobs-basket-add');
        var allDeleteBtn = $('.grid-jobs-basket-delete');

        if(id === ''){
            return;
        }

        loader.show();
        icon.hide();
        $.post(jobboard_localize_basket.ajaxurl, {'action': 'jobboard_basket_ajax_add', 'id': id}, function(res) {
            jobboard_create_notices(res.message, res.type);
            update_basket();
            if(res.type === 'success'){
                btn.hide();
                deleteBtn.show();
                allAddBtn.each(function(index, item){
                    if($(item).data('id') == id)
                        $(item).hide();
                });
                allDeleteBtn.each(function(index, item){
                    if($(item).data('id') == id)
                        $(item).show();
                });
            }
            icon.show();
            loader.hide();
        });
    });

    // grid jobs element delete to basket
    $(document).on('click', '.grid-jobs-basket-delete', function () {
        var parent = $(this).parent();
        var btn = $(this);
        var id  = btn.data('id');
        var loader = btn.find('.jobboard-loading');
        var icon = btn.find('.icon');
        var addBtn = parent.find('.grid-jobs-basket-add');
        var allAddBtn = $('.grid-jobs-basket-add');
        var allDeleteBtn = $('.grid-jobs-basket-delete');

        if(id === ''){
            return;
        }

        loader.show();
        icon.hide();
        $.post(jobboard_localize_basket.ajaxurl, {
            'action': 'jobboard_basket_ajax_delete',
            'id' : id
        }, function (res) {
            jobboard_create_notices(res.message, res.type);
            update_basket();
            if(res.type === 'success'){
                btn.hide();
                addBtn.show();
                allAddBtn.each(function(index, item){
                    if($(item).data('id') == id)
                        $(item).show();
                });
                allDeleteBtn.each(function(index, item){
                    if($(item).data('id') == id)
                        $(item).hide();
                });
            }
            icon.show();
            loader.hide();
        });
    });

    /* apply basket. */
    $('#table-basket')
        .on('click', '.action-apply', function () {
            var id  = $(this).data('id');
            var tr  = $(this).parents('tr');
            var bt  = $(this).parents('tr').find('button');

            tr.css('opacity', 0.5);
            bt.prop('disabled', true);

            $.post(jobboard_localize_basket.ajaxurl, {
                'action': 'jobboard_basket_ajax_apply',
                'id' : id
            }, function (response) {
                jobboard_create_notices(response.message, response.type);
                if(response.type === 'error'){
                    tr.css('opacity', 1);
                    bt.prop('disabled', false);
                } else {
                    update_basket();
                    tr.remove();
                }
            });
        })
        .on('click', '.action-remove', function () {
            var id  = $(this).data('id');
            var tr  = $(this).parents('tr');
            var bt  = $(this).parents('tr').find('button');
            delete_basket(id, tr, bt);
        });

    /* remove all. */
    $('.widget-basket')
        .on('click', '.basket-clear', function () {
            var ul = $(this).parents('.widget-basket').find('.widget-content ul');
            var bt = $(this);
            bt.prop('disabled', true);
            ul.css('opacity', 0.5);

            $.post(jobboard_localize_basket.ajaxurl, {
                'action': 'jobboard_basket_ajax_delete_all'},
                function(response) {
                    jobboard_create_notices(response.message, response.type);
                    ul.css('opacity', 1);
                    bt.prop('disabled', false);
                    if(response.type === 'success'){
                        update_basket();
                    }
                }
            );
        })
        .on('click', '.basket-delete', function () {
            var id  = $(this).data('id');
            var li  = $(this).parents('li');
            delete_basket(id, li);
        });
    
    function delete_basket(id, opacity, disabled) {
        opacity.css('opacity', 0.5);
        if(disabled !== undefined) {
            disabled.prop('disabled', true);
        }

        $.post(jobboard_localize_basket.ajaxurl, {
            'action': 'jobboard_basket_ajax_delete',
            'id' : id
        }, function (response) {
            jobboard_create_notices(response.message, response.type);
            if(response.type !== 'success'){
                opacity.css('opacity', 1);
                if(disabled !== undefined) {
                    disabled.prop('disabled', false);
                }
            } else {
                update_basket();
                opacity.remove();
            }
        });
    }
    
    function update_basket() {
        $.post(jobboard_localize_basket.ajaxurl, {
            'action': 'jobboard_basket_ajax_update'},
            function(response) {
                $('.widget-basket .basket-widget-content').html(response.html);
                $('.widget-basket .jobboard-count').text(response.count);
            }
        );
    }
    
})( jQuery );