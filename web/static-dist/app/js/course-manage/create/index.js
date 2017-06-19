webpackJsonp(["app/js/course-manage/create/index"],{0:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n("423d5c93d4f10f876e3b"),o=i(s),l=function(){function e(){r(this,e),this.validator=null,this.init()}return a(e,[{key:"init",value:function(){$('[data-toggle="popover"]').popover({html:!0}),this.initValidator(),this.initExpiryMode(),this.checkBoxChange()}},{key:"initValidator",value:function(){var e=this,t=$("#course-create-form");this.validator=t.validate({groups:{date:"expiryStartDate expiryEndDate"},rules:{title:{required:!0,trim:!0}},messages:{title:Translator.trans("请输入教学计划课程标题")}}),$("#course-submit").click(function(n){e.validator.form()&&(e.isInitIntro(),$(n.currentTarget).button("loading"),t.submit())}),this.initDatePicker("#expiryStartDate"),this.initDatePicker("#expiryEndDate"),this.initDatePicker("#deadline")}},{key:"isInitIntro",value:function(){var e=$("#courses-list-table").find("tbody tr").length;if(1==e){var t=new o.default;t.isSetCourseListCookies()}}},{key:"checkBoxChange",value:function(){var e=this;$('input[name="deadlineType"]').on("change",function(t){"end_date"==$('input[name="deadlineType"]:checked').val()?($("#deadlineType-date").removeClass("hidden"),$("#deadlineType-days").addClass("hidden")):($("#deadlineType-date").addClass("hidden"),$("#deadlineType-days").removeClass("hidden")),e.initExpiryMode()}),$('input[name="expiryMode"]').on("change",function(t){"date"==$('input[name="expiryMode"]:checked').val()?($("#expiry-days").removeClass("hidden").addClass("hidden"),$("#expiry-date").removeClass("hidden")):"days"==$('input[name="expiryMode"]:checked').val()?($("#expiry-date").removeClass("hidden").addClass("hidden"),$("#expiry-days").removeClass("hidden"),$('input[name="deadlineType"][value="days"]').prop("checked",!0)):($("#expiry-date").removeClass("hidden").addClass("hidden"),$("#expiry-days").removeClass("hidden").addClass("hidden")),e.initExpiryMode()}),$('input[name="learnMode"]').on("change",function(e){"freeMode"==$('input[name="learnMode"]:checked').val()?($("#learnLockModeHelp").removeClass("hidden").addClass("hidden"),$("#learnFreeModeHelp").removeClass("hidden")):($("#learnFreeModeHelp").removeClass("hidden").addClass("hidden"),$("#learnLockModeHelp").removeClass("hidden"))})}},{key:"initDatePicker",value:function(e){var t=this,n=$(e);n.datetimepicker({format:"yyyy-mm-dd",language:"zh",minView:2,autoclose:!0,endDate:new Date(Date.now()+31536e7)}).on("hide",function(){t.validator.form()}),n.datetimepicker("setStartDate",new Date)}},{key:"initExpiryMode",value:function(){var e=$('[name="deadline"]'),t=$('[name="expiryDays"]'),n=$('[name="expiryStartDate"]'),i=$('[name="expiryEndDate"]'),r=$('[name="expiryMode"]:checked').val();switch(this.elementRemoveRules(e),this.elementRemoveRules(t),this.elementRemoveRules(n),this.elementRemoveRules(i),r){case"days":var a=$('[name="deadlineType"]:checked');if("end_date"===a.val())return this.elementAddRules(e,this.getDeadlineEndDateRules()),void this.validator.form();this.elementAddRules(t,this.getExpiryDaysRules()),this.validator.form();break;case"date":this.elementAddRules(n,this.getExpiryStartDateRules()),this.elementAddRules(i,this.getExpiryEndDateRules()),this.validator.form()}}},{key:"getExpiryEndDateRules",value:function(){return{required:!0,date:!0,after_date:"#expiryStartDate",messages:{required:Translator.trans("请输入结束日期")}}}},{key:"getExpiryStartDateRules",value:function(){return{required:!0,date:!0,after_now_date:!0,before_date:"#expiryEndDate",messages:{required:Translator.trans("请输入开始日期")}}}},{key:"getExpiryDaysRules",value:function(){return{required:!0,positive_integer:!0,max_year:!0,messages:{required:Translator.trans("请输入有效期天数")}}}},{key:"getDeadlineEndDateRules",value:function(){return{required:!0,date:!0,after_now_date:!0,messages:{required:Translator.trans("请输入截至日期")}}}},{key:"elementAddRules",value:function(e,t){e.rules("add",t)}},{key:"elementRemoveRules",value:function(e){e.rules("remove")}}]),e}();new l},"423d5c93d4f10f876e3b":function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n("d5e8fa5f17ac5fe79c78");var s=n("fe53252afd7b6c35cb73"),o=i(s),l="COURSE_BASE_INTRO",u="COURSE_TASK_INTRO",c="COURSE_TASK_DETAIL_INTRO",d="COURSE_LIST_INTRO",f="COURSE_LIST_INTRO_COOKIE",p=function(){function e(){var t=this;r(this,e),this.intro=null,this.customClass="es-intro-help multistep",$("body").on("click",".js-skip",function(e){t.intro.exit()})}return a(e,[{key:"introType",value:function(){return this.isTaskCreatePage()?void this.initTaskCreatePageIntro():this.isCourseListPage()?void this.initCourseListPageIntro():void this.initNotTaskCreatePageIntro()}},{key:"isCourseListPage",value:function(){return!!$("#courses-list-table").length}},{key:"isTaskCreatePage",value:function(){return!!$("#step-3").length}},{key:"isInitTaskDetailIntro",value:function(){return $(".js-task-manage-item").attr("into-step-id","step-5"),!!$(".js-settings-list").length}},{key:"introStart",value:function(e){var t=this,n='<i class="es-icon es-icon-close01"></i>';this.intro=introJs(),e.length<2?(n="我知道了",this.customClass="es-intro-help"):this.customClass="es-intro-help multistep",this.intro.setOptions({steps:e,skipLabel:n,nextLabel:"继续了解",prevLabel:"上一步",doneLabel:n,showBullets:!1,tooltipPosition:"auto",showStepNumbers:!1,exitOnEsc:!1,exitOnOverlayClick:!1,tooltipClass:this.customClass}),this.intro.start().onexit(function(){}).onchange(function(){t.intro._currentStep==t.intro._introItems.length-1?$(".introjs-nextbutton").before('<a class="introjs-button  done-button js-skip">我知道了<a/>'):$(".js-skip").remove()})}},{key:"initTaskCreatePageIntro",value:function(){$(".js-task-manage-item:first .js-item-content").trigger("click"),store.get(l)||store.get(u)?store.get(u)||(store.set(u,!0),this.introStart(this.initTaskSteps())):(store.set(l,!0),store.set(u,!0),this.introStart(this.initAllSteps()))}},{key:"initTaskDetailIntro",value:function(e){store.get(c)||(store.set(c,!0),this.introStart(this.initTaskDetailSteps(e)))}},{key:"initNotTaskCreatePageIntro",value:function(){store.get(l)||(store.set(l,!0),this.introStart(this.initNotTaskPageSteps()))}},{key:"isSetCourseListCookies",value:function(){store.get(d)||o.default.set(f,!0)}},{key:"initCourseListPageIntro",value:function(){var e=this,t=$("#courses-list-table").find("tbody tr").length;2===t&&!store.get(d)&&o.default.get(f)&&(o.default.remove(f),new Promise(function(e,t){setTimeout(function(){var t=$(".js-sidenav-course-menu");return t.length?void $(".js-sidenav-course-menu").slideUp(function(){e()}):void e()},100)}).then(function(){setTimeout(function(){e.initCourseListIntro(".js-sidenav")},100)}))}},{key:"initCourseListIntro",value:function(e){store.get(d)||(store.set(d,!0),this.introStart(this.initCourseListSteps(e)))}},{key:"initAllSteps",value:function(){var e=[{intro:'<p class="title">功能升级</p>\n        课程管理功能现已全新升级。'},{element:"#step-1",intro:'<p class="title">计划任务</p>\n        教学内容的编辑、管理请点击左侧“计划任务”的菜单项进入。'},{element:"#step-2",intro:'<p class="title">营销设置</p>\n        在“营销设置”中您可以通过设置决定课程如何销售、如何加入、如何学习。'},{element:"#step-3",intro:'<p class="title">添加任务</p>\n        您可以在这里选择各种不同的教学手段，然后上传文件/设置内容/设置学习完成条件。'}];return this.isInitTaskDetailIntro()&&(e.push({element:'[into-step-id="step-5"]',intro:'<p class="title">任务环节</p>\n        在设计学习任务时，您可以按照课时去设置预习、学习、练习、作业、课外这几个环节，\n        每个环节都可以通过各种教学手段来实现。'}),store.get(c)||store.set(c,!0)),e}},{key:"initNotTaskPageSteps",value:function(){return[{intro:'<p class="title">功能升级</p>\n        课程管理功能现已全新升级。'},{element:"#step-1",intro:'<p class="title">计划任务</p>\n        教学内容的编辑、管理请点击左侧“计划任务”的菜单项进入。'},{element:"#step-2",intro:'<p class="title">营销设置</p>\n        在“营销设置”中您可以通过设置决定课程如何销售、如何加入、如何学习。'}]}},{key:"initTaskSteps",value:function(){var e=[{element:"#step-3",intro:'<p class="title">添加任务</p>\n        您可以在这里选择各种不同的教学手段，然后上传文件/设置内容/设置学习完成条件。'}];return this.isInitTaskDetailIntro()&&(e.push({element:"#step-5",intro:'<p class="title">任务环节</p>\n        在设计学习任务时，您可以按照课时去设置预习、学习、练习、作业、课外这几个环节，\n        每个环节都可以通过各种教学手段来实现。',position:"bottom"}),store.get(c)||store.set(c,!0)),e}},{key:"initTaskDetailSteps",value:function(e){return[{element:e,intro:'<p class="title">任务环节</p>\n        在设计学习任务时，您可以按照课时去设置预习、学习、练习、作业、课外这几个环节，\n        每个环节都可以通过各种教学手段来实现。',position:"bottom"}]}},{key:"initCourseListSteps",value:function(e){return[{element:e,intro:'\n          <p class="title">多个教学计划</p>\n          恭喜你创建了多个教学计划！左侧的功能菜单会有所简化，\n          只会显示课程公共的相关设置。'}]}},{key:"initResetStep",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return[{element:".js-intro-btn-group",intro:'<div class="btn-content"><p><a class=\'btn btn-success js-reset-intro '+e+"'>查看引导</a></p>\n        <a class='btn btn-info'>完整教程</a><div>",position:"top"}]}}]),e}();t.default=p},d5e8fa5f17ac5fe79c78:function(e,t){(function(e){var t=!1,n=!1,i=!1;(function(){"use strict";!function(e,r){"function"==typeof t&&t.amd?t([],r):"object"==typeof i?n.exports=r():e.store=r()}(this,function(){function t(){try{return s in r&&r[s]}catch(e){return!1}}var n,i={},r="undefined"!=typeof window?window:e,a=r.document,s="localStorage",o="script";if(i.disabled=!1,i.version="1.3.20",i.set=function(e,t){},i.get=function(e,t){},i.has=function(e){return void 0!==i.get(e)},i.remove=function(e){},i.clear=function(){},i.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var r=i.get(e,t);n(r),i.set(e,r)},i.getAll=function(){},i.forEach=function(){},i.serialize=function(e){return JSON.stringify(e)},i.deserialize=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e||void 0}},t())n=r[s],i.set=function(e,t){return void 0===t?i.remove(e):(n.setItem(e,i.serialize(t)),t)},i.get=function(e,t){var r=i.deserialize(n.getItem(e));return void 0===r?t:r},i.remove=function(e){n.removeItem(e)},i.clear=function(){n.clear()},i.getAll=function(){var e={};return i.forEach(function(t,n){e[t]=n}),e},i.forEach=function(e){for(var t=0;t<n.length;t++){var r=n.key(t);e(r,i.get(r))}};else if(a&&a.documentElement.addBehavior){var l,u;try{u=new ActiveXObject("htmlfile"),u.open(),u.write("<"+o+">document.w=window</"+o+'><iframe src="/favicon.ico"></iframe>'),u.close(),l=u.w.frames[0].document,n=l.createElement("div")}catch(e){n=a.createElement("div"),l=a.body}var c=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);t.unshift(n),l.appendChild(n),n.addBehavior("#default#userData"),n.load(s);var r=e.apply(i,t);return l.removeChild(n),r}},d=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),f=function(e){return e.replace(/^d/,"___$&").replace(d,"___")};i.set=c(function(e,t,n){return t=f(t),void 0===n?i.remove(t):(e.setAttribute(t,i.serialize(n)),e.save(s),n)}),i.get=c(function(e,t,n){t=f(t);var r=i.deserialize(e.getAttribute(t));return void 0===r?n:r}),i.remove=c(function(e,t){t=f(t),e.removeAttribute(t),e.save(s)}),i.clear=c(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(s);for(var n=t.length-1;n>=0;n--)e.removeAttribute(t[n].name);e.save(s)}),i.getAll=function(e){var t={};return i.forEach(function(e,n){t[e]=n}),t},i.forEach=c(function(e,t){for(var n,r=e.XMLDocument.documentElement.attributes,a=0;n=r[a];++a)t(n.name,i.deserialize(e.getAttribute(n.name)))})}try{var p="__storejs__";i.set(p,p),i.get(p)!=p&&(i.disabled=!0),i.remove(p)}catch(e){i.disabled=!0}return i.enabled=!i.disabled,i})}).call(window)}).call(t,function(){return this}())},fe53252afd7b6c35cb73:function(e,t,n){var i,r;!function(a){var s=!1;if(i=a,r="function"==typeof i?i.call(t,n,t,e):i,!(void 0!==r&&(e.exports=r)),s=!0,e.exports=a(),s=!0,!s){var o=window.Cookies,l=window.Cookies=a();l.noConflict=function(){return window.Cookies=o,l}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var i in n)t[i]=n[i]}return t}function t(n){function i(t,r,a){var s;if("undefined"!=typeof document){if(arguments.length>1){if(a=e({path:"/"},i.defaults,a),"number"==typeof a.expires){var o=new Date;o.setMilliseconds(o.getMilliseconds()+864e5*a.expires),a.expires=o}try{s=JSON.stringify(r),/^[\{\[]/.test(s)&&(r=s)}catch(e){}return r=n.write?n.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape),document.cookie=[t,"=",r,a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}t||(s={});for(var l=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,c=0;c<l.length;c++){var d=l[c].split("="),f=d.slice(1).join("=");'"'===f.charAt(0)&&(f=f.slice(1,-1));try{var p=d[0].replace(u,decodeURIComponent);if(f=n.read?n.read(f,p):n(f,p)||f.replace(u,decodeURIComponent),this.json)try{f=JSON.parse(f)}catch(e){}if(t===p){s=f;break}t||(s[p]=f)}catch(e){}}return s}}return i.set=i,i.get=function(e){return i.call(i,e)},i.getJSON=function(){return i.apply({json:!0},[].slice.call(arguments))},i.defaults={},i.remove=function(t,n){i(t,"",e(n,{expires:-1}))},i.withConverter=t,i}return t(function(){})})}});