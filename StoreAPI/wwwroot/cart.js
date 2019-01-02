const cartUri = "api/Cart";
let cart = null;
let _$cartCount = null;


$(document).ready(function () {
    getCartData();
    _$cartCount = $('.cartCount');
});

function getCartData() {
    $.ajax({
        type: "GET",
        url: cartUri,
        cache: false,
        success: function (data) {
            genCList(data);
        }

    });
}

function updateCartCounter() {

    var itemCount = 0;
    var cartTotal = 0.00;
    for (i = 0; i < cart.length; i++) {
        itemCount = itemCount + cart[i].quantity;
        cartTotal = cartTotal + cart[i].product.price * cart[i].quantity;
    }
    var itemText = itemCount !== 1 ? " Items" : " Item";
    _$cartCount.text(itemCount + itemText);
    return cartTotal;

}


function updateCartItem(cartItem) {
    const item = {
        id: cartItem.id,
        productId: cartItem.productId,
        product: null,
        quantity: cartItem.quantity
    };

    $.ajax({
        url: cartUri + "/" + item.id,
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (data) {
            cart = data;
            genCList(data);
        }
    });

}

function deleteItem(id) {
    $.ajax({
        url: uri + "/" + id,
        type: "DELETE",
        success: function (result) {
            getData();
        }
    });
}

function genCList(data) {
    cart = data;
    var cartTotal = updateCartCounter();
    const cList = $("#cart");
    $(cList).empty();
    $.each(data, function (key, item) {
        const cartItem = $('<li class="list-group-item d-flex justify-content-between lh-condensed">')
            .append(
                $('<div></div>')
                    .append(
                        $('<h6 class="my-0"></h6>').text(item.product.name)
                    )
                    .append(
                        $('<small class="text-muted"></small>').text(item.product.description)
                    )
            )
            .append(
                $('<div></div>', { class: "quantityblock" })
                    .append(
                        $('<label class="qplabel text-small" for="quantity">Quantity: </label>')
                    )
                    .append(
                        $('<select class="custom-select d-flex w-15" id="quantity"></select>')
                            .append($('<option value=1 ' + (item.quantity !== 1 ? '' : "selected") + '>1</option>'))
                            .append($('<option value=2 ' + (item.quantity !== 2 ? '' : "selected") + '>2</option>'))
                            .append($('<option value=3 ' + (item.quantity !== 3 ? '' : "selected") + '>3</option>'))
                            .append($('<option value=4 ' + (item.quantity !== 4 ? '' : "selected") + '>4</option>'))
                            .append($('<option value=5 ' + (item.quantity !== 5 ? '' : "selected") + '>5</option>'))
                            .append($('<option value=6 ' + (item.quantity !== 6 ? '' : "selected") + '>6</option>'))
                            .append($('<option value=7 ' + (item.quantity !== 7 ? '' : "selected") + '>7</option>'))
                            .append($('<option value=8 ' + (item.quantity !== 8 ? '' : "selected") + '>8</option>'))
                            .append($('<option value=9 ' + (item.quantity !== 9 ? '' : "selected") + '>9</option>'))
                            .append($('<option value=10 ' + (item.quantity !== 10 ? '' : "selected") + '>10</option>'))
                            .on('change',
                                function () {
                                    item.quantity = parseInt($(this).val());
                                    updateCartItem(item);
                                }
                            )

                    )
                    .append(
                        $('<strong class="qplabel">$' + item.product.price * item.quantity + '</strong>')
                    )
            );

        cartItem.appendTo(cList);

    });

    const cartTotalItem = $('<li class="list-group-item d-flex justify-content-between"></li>')
        .append(
            $('<span>Total (USD)</span>')
        )
        .append(
            $('<strong></strong>').text('$' + cartTotal)
        );
    cartTotalItem.appendTo(cList);



}

