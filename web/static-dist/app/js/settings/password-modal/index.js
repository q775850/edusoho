webpackJsonp(["app/js/settings/password-modal/index"],[function(o,s){var r=$("#settings-password-form"),i=$("#modal"),a=r.validate({rules:{"form[newPassword]":{required:!0,minlength:5,maxlength:20},"form[confirmPassword]":{required:!0,equalTo:"#form_newPassword"}}});$(".js-submit-form").off("click"),$(".js-submit-form").click(function(){if(a.form()){var o=r.serialize(),s=r.attr("action");$.post(s,o,function(o){i.html(o)})}})}]);