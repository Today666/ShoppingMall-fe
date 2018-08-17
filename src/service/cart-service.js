"use strict";
var _ShopM=require("util/ShopM.js");
var _cart = {
    //获取购物车数量
    getCartCount : function (resolve, reject) {
        _ShopM.request({
            url : _ShopM.getServerUrl("/cart/get_cart_product_count.do"),
            success : resolve,
            error : reject
        })
    }
};
module.exports = _cart;
