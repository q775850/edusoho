!function(o){function e(e){for(var a,t,i=e[0],r=e[1],n=e[2],s=0,l=[];s<i.length;s++)t=i[s],Object.prototype.hasOwnProperty.call(u,t)&&u[t]&&l.push(u[t][0]),u[t]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(o[a]=r[a]);for(m&&m(e);l.length;)l.shift()();return c.push.apply(c,n||[]),d()}function d(){for(var e,a=0;a<c.length;a++){for(var t=c[a],i=!0,r=1;r<t.length;r++){var n=t[r];0!==u[n]&&(i=!1)}i&&(c.splice(a--,1),e=s(s.s=t[0]))}return e}var t={},u={77:0},c=[];function s(e){if(t[e])return t[e].exports;var a=t[e]={i:e,l:!1,exports:{}};return o[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=o,s.c=t,s.d=function(e,a,t){s.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(a,e){if(1&e&&(a=s(a)),8&e)return a;if(4&e&&"object"==typeof a&&a&&a.__esModule)return a;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var i in a)s.d(t,i,function(e){return a[e]}.bind(null,i));return t},s.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(a,"a",a),a},s.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},s.p="/static-dist/";var a=window.webpackJsonp=window.webpackJsonp||[],i=a.push.bind(a);a.push=e,a=a.slice();for(var r=0;r<a.length;r++)e(a[r]);var m=i;c.push([768,0]),d()}({17:function(e,a){e.exports=jQuery},768:function(e,a,t){"use strict";t.r(a);var i=t(0),r=t.n(i),n=t(1),s=t.n(n),l=t(63),o=t(92);new(function(){function e(){r()(this,e),this.drag=$("#drag-btn").length?new o.a($("#drag-btn"),$(".js-jigsaw"),{limitType:"web_register"}):null,this.setValidateRule(),this.dragEvent(),this.initValidator(),this.inEventMobile(),this.initMobileMsgVeriCodeSendBtn(),this.initFieldVisitId()}return s()(e,[{key:"dragEvent",value:function(){var a=this;this.drag&&this.drag.on("success",function(e){a._smsBtnable()})}},{key:"setValidateRule",value:function(){$.validator.addMethod("spaceNoSupport",function(e,a){return e.indexOf(" ")<0},$.validator.format(Translator.trans("validate.have_spaces")))}},{key:"initValidator",value:function(){var s=this;$("#register-form").validate(this._validataRules()),$.validator.addMethod("email_or_mobile_check",function(e,a,t){var i=!1,r=/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e),n=/^1\d{10}$/.test(e);return n?($(".email_mobile_msg").removeClass("hidden"),s.captchEnable||$(".js-drag-jigsaw").addClass("hidden")):($(".email_mobile_msg").addClass("hidden"),$(".js-drag-jigsaw").removeClass("hidden")),(r||n)&&(i=!0),$.validator.messages.email_or_mobile_check=Translator.trans("validate.mobile_or_email_message"),this.optional(a)||i},Translator.trans("validate.email_or_mobile_check.message"))}},{key:"inEventMobile",value:function(){var a=this;$("#register_emailOrMobile").blur(function(){var e=$("#register_emailOrMobile").val();a.emSmsCodeValidate(e)}),$("#register_mobile").blur(function(){var e=$("#register_mobile").val();a.emSmsCodeValidate(e)})}},{key:"initDragCaptchaCodeRule",value:function(){$(".js-drag-img").length&&$('[name="dragCaptchaToken"]').rules("add",{required:!0,messages:{required:Translator.trans("auth.register.drag_captcha_tips")}})}},{key:"_smsBtnDisable",value:function(){$(".js-sms-send-btn").addClass("disabled").attr("disabled",!0)}},{key:"_smsBtnable",value:function(){$(".js-sms-send-btn").removeClass("disabled").attr("disabled",!1)}},{key:"initSmsCodeRule",value:function(){$('[name="sms_code"]').rules("add",{required:!0,unsigned_integer:!0,rangelength:[6,6],es_remote:{type:"get"},messages:{rangelength:Translator.trans("validate.sms_code.message")}})}},{key:"initMobileMsgVeriCodeSendBtn",value:function(){var a=$(".js-sms-send-btn"),t=this;a.click(function(){t._smsBtnDisable();var e=$("[name='verifiedMobile']").length?"verifiedMobile":"emailOrMobile";new l.a({element:a,url:$(this).data("smsUrl"),smsType:"sms_registration",dataTo:e,captcha:!0,captchaValidated:!0,captchaNum:"dragCaptchaToken",preSmsSend:function(){return!0},error:function(){t.drag.initDragCaptcha()},additionalAction:function(e){return"captchaRequired"==e&&(a.attr("disabled",!0),$(".js-drag-jigsaw").removeClass("hidden"),t.captchEnable=!0,t.drag&&t.drag.initDragCaptcha(),!0)}})})}},{key:"_validataRules",value:function(){var a=this;return{rules:{nickname:{required:!0,byte_minlength:4,byte_maxlength:18,nickname:!0,chinese_alphanumeric:!0,es_remote:{type:"get"}},password:{minlength:5,maxlength:20,spaceNoSupport:!0},email:{required:!0,email:!0,es_remote:{type:"get"}},invitedCode:{required:!1,reg_inviteCode:!0,es_remote:{type:"get"}},emailOrMobile:{required:!0,email_or_mobile_check:!0,es_remote:{type:"get",callback:function(e){e?a._smsBtnable():a._smsBtnDisable()}}},verifiedMobile:{required:!0,phone:!0,es_remote:{type:"get",callback:function(e){e?a._smsBtnable():a._smsBtnDisable()}}},dragCaptchaToken:{required:!0},agree_policy:{required:!0}},messages:{verifiedMobile:{required:Translator.trans("validate.phone.message")},emailOrMobile:{required:Translator.trans("validate.phone_and_email_input.message")},email:{required:Translator.trans("validate.valid_email_input.message")},dragCaptchaToken:{required:Translator.trans("auth.register.drag_captcha_tips")},agree_policy:{required:Translator.trans("validate.valid_policy_input.message")}}}}},{key:"emSmsCodeValidate",value:function(e){/^1\d{10}$/.test(e)?(this.initSmsCodeRule(),$('[name="dragCaptchaToken"]').rules("remove")):(this.initDragCaptchaCodeRule(),$('[name="sms_code"]').rules("remove"))}},{key:"initFieldVisitId",value:function(){$(document).ready(function(){"undefined"!==window._VISITOR_ID&&$('[name="registerVisitId"]').val(window._VISITOR_ID)})}}]),e}())}});