const storeUri = "api/Store";
const cartUri = "api/Cart";
let products = null;
let cart = null;

$(document).ready(function () {
    getCartData();
    getData();
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
                                    addItemToCart(item.id);
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
        }
    });
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
            alert("Added " + result.product.name + " to cart");
        }
    });
}

function updateCartItem(cartItem) {

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
