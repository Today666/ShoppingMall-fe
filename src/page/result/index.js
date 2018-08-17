"use strict";
require("./index.css");
require("page/common/nav-simple/index.js");
var _ShopM=require("util/ShopM.js");
$(function () {
    var type = _ShopM.getUrlParam("type") || "default",
        $element = $("."+ type + "-success");
        //显示对应的提示元素
        $element.show();

});