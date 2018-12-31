const storeUri = "api/Store";
const cartUri = "api/Cart";
let products = null;
let cart = null;
let _$cartCount = null; 


$(document).ready(function () {
    getCartData();
    getData();
    _$cartCount = $('#cartCount'); 
});

function getData() {
    $.ajax({
        type: "GET",
        url: storeUri,
        cache: false,
        success: function (data) {
            const cDeck = $("#products");
            $(cDeck).empty();
            $.each(data, function (key, item) {
                const card = $('<div class="card mb-4 shadow-sm"></div>')
                    .append(
                        $('<div class="card-header"></div>')
                            .append(
                                $('<h4 class="my-0 font-weight-normal"></h4>').text(item.name)
                            )   
                     )
                    .append(
                        $('<div></div>', { class: "card-body" })
                            .append(
                                $('<h1 class="card-title pricing-card-title"></h1>')
                                    .text('$' + item.price)
                            )
                            .append(
                                $('<p></p>').text(item.description)
                            )
                            .append(
                                $('<button type="button" class="btn btn-lg btn-block btn-primary">Add To Cart</button>').on("click", function () {
                                    updateCart(item.id);
                                })
                            )
                            
                );

                card.appendTo(cDeck);
            });

            products = data;
        }

    });
}

function getCartData() {
    $.ajax({
        type: "GET",
        url: cartUri,
        cache: false,
        success: function (data) {
            cart = data;
            updateCartCounter();
        }
    });
    
    
}

function updateCartCounter() {
    
    var itemCount = 0;
    for (i = 0; i < cart.length; i++) {
        itemCount = itemCount + cart[i].quantity;
    }
    var itemText = itemCount !== 1 ? " Items" : " Item";
    _$cartCount.text(itemCount + itemText);

}

function updateCart(productId) {
    //First we filter objects from the cart array that match our product Id;
    var existingItem = cart.filter(item => item.productId === productId);
    if (!Array.isArray(existingItem) || !existingItem.length) {
        addItemToCart(productId);
    } else if (existingItem.length === 1) {
        updateCartItem(existingItem[0]);
    }
}
function addItemToCart(productId) {

    const item = {
        productId: productId,
        quantity: 1
    };

    $.ajax({
        type: "POST",
        accepts: "application/json",
        url: cartUri,
        contentType: "application/json",
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Something went wrong!");
        },
        success: function (result) {
            cart = result;
            updateCartCounter();
        }
        
    });
}

function updateCartItem(cartItem) {
    const item = {
        id: cartItem.id,
        productId: cartItem.productId,
        product: null,
        quantity: cartItem.quantity + 1
    };

    $.ajax({
        url: cartUri + "/" + item.id,
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            cart = result;
            updateCartCounter();
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

function editItem(id) {
    $.each(todos, function (key, item) {
        if (item.id === id) {
            $("#edit-name").val(item.name);
            $("#edit-id").val(item.id);
            $("#edit-isComplete")[0].checked = item.isComplete;
        }
    });
    $("#spoiler").css({ display: "block" });
}

$(".my-form").on("submit", function () {
    const item = {
        name: $("#edit-name").val(),
        isComplete: $("#edit-isComplete").is(":checked"),
        id: $("#edit-id").val()
    };

    $.ajax({
        url: uri + "/" + $("#edit-id").val(),
        type: "PUT",
        accepts: "application/json",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});

function closeInput() {
    $("#spoiler").css({ display: "none" });
}

function cartSuccess() {
    getCartData();
}
