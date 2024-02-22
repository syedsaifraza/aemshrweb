(function ($) {
    "use strict";

    $('.package-pricing .table').each(function () {
        if ($(this).hasClass('active')) {
            $('#package_id').val($(this).find('.pricing-button').data('id'));
            $('#package_price').val($(this).find('.pricing-button').data('price'));
            $('#package_name').val($(this).find('.pricing-button').data('name'));
        }
    });

    $('.package-payments .payment:first-child').addClass('active');

    submit_validate();

    $('.package-pricing').on('click', '.pricing-button', function () {
        $('.package-pricing .table').removeClass('active');
        $(this).parents('.table').addClass('active');
        $('#package_id').val($(this).data('id'));
        $('#package_price').val($(this).data('price'));
        $('#package_name').val($(this).data('name'));
        submit_validate();
    });

    $('.package-payments').on('click', '.payment', function () {
        $('.package-payments .payment').removeClass('active');
        $(this).addClass('active');
        $('#payment').val($(this).data('id'));

        switch ($(this).data('id')) {
            case 'bank-transfer':
                $('.package-form').unbind();
                $('#bank-transfer').modal('show');
                break;
            case 'paypal':
                $('.package-form').unbind();
                break;
            case 'razorpay':
                $('.package-form').unbind();
                new JB_Razorpay();
                break;
            case 'stripe':
                $('.package-form').unbind();
                new JB_Stripe();
                break;
        }

        submit_validate();
    });

    $(".package-pricing .pricing-button").on('click', function () {
        if($(this).data('price') == 0){
            $(this).parents('.package-form').find('.package-payments .payments').hide();
            $(this).parents('.package-form').find('.package-payments .payment-label').hide();
            $(this).parents('.package-form').find('.package-payments .submit-button[name="package-checkout"]').addClass('hide');
            $(this).parents('.package-form').find('.package-payments .submit-button[name="package-checkout-submit-free"]').removeClass('hide');
        }
        else{
            $(this).parents('.package-form').find('.package-payments .payments').show();
            $(this).parents('.package-form').find('.package-payments .payment-label').show();
            $(this).parents('.package-form').find('.package-payments .submit-button[name="package-checkout"]').removeClass('hide');
            $(this).parents('.package-form').find('.package-payments .submit-button[name="package-checkout-submit-free"]').addClass('hide');
        }
    });

    $(".package-form .package-payments .submit-button").on("click", function (e) {
        var val = $(this).parents(".package-form").find("input[name=current_package_id]").val();
        var val_2 = $(this).parents(".package-form").find("input[name=package_id]").val();
        if(typeof val !== 'undefined' && val !== '' && val !== val_2){
            if( !confirm('Are you sure that you want to change the package?') )
                e.preventDefault();
        }
    });

    function submit_validate() {
        if (!$('#package').val() && !$('#payment').val()) {
            $('.package-payments .submit-button').prop('disabled', true);
        } else {
            $('.package-payments .submit-button').prop('disabled', false);
        }
    }

})(jQuery);