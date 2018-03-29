$(document).on("dialog-ready", function () {
$(".js-coral-Multifield-add").click(function() {
    var field = $(this).parent();
    var size = field.attr("data-maxlinksallowed");
    if (size) {
        var ui = $(window).adaptTo("foundation-ui");
        var totalLinkCount = $(this).prev('ol').children('li').length;
        if (totalLinkCount >= size) {
            ui.alert("Warning", "Maximum " + size + " links are allowed!", "notice");
            return false;
        }
    }
});
});


(function (document, $, ns) {
    "use strict";
$(document).on("click", ".cq-dialog-submit", function (e) {
    e.stopPropagation();
    e.preventDefault();
   var $form = $(this).closest("form.foundation-form"), title = $form.find("[name='./jcr:title']").val(), message, clazz = "coral-Button ";
   var fieldd = $(".coral-Multifield");
   var sizee = fieldd.attr("data-minlinksallowed");
   if(($(this).prev('ol').children('li').length) < sizee){
             message = "Minimum " + sizee + " links are required. Are you sure to submit?";
             clazz = clazz + "coral-Button--warning";
   }
   ns.ui.helpers.prompt({
            title: Granite.I18n.get("Confirm"),
            message: message,
            actions: [{
                   id: "CANCEL",
                   text: "CANCEL",
                   className: "coral-Button"
               },{
                   id: "SUBMIT",
                   text: "SUBMIT",
                   className: clazz
               }
           ],
            callback: function (actionId) {
               if (actionId === "SUBMIT") {
                   $form.submit();
               }
           }
       });
   });
})(document, Granite.$, Granite.author);