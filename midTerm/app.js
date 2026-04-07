$(document).ready(function () {

  // ── Fetch ELECTRONICS products from Fake Store API ──
  $.ajax({
    url: "https://fakestoreapi.com/products/category/electronics",
    method: "GET",
    dataType: "json",
    success: function (products) {
      var container = $("#deals-container");
      container.empty(); // remove loading text

      // Take only first 4 electronics products
      var topDeals = products.slice(0, 4);

      $.each(topDeals, function (index, product) {
        // Build star rating (filled ★ vs empty ☆)
        var stars = "";
        var rating = Math.round(product.rating.rate);
        for (var i = 1; i <= 5; i++) {
          stars += i <= rating ? "★" : "☆";
        }

        var card =
          '<div class="deal-card">' +
            '<div class="deal-img-wrap">' +
              '<img src="' + product.image + '" alt="' + product.title.replace(/"/g, "&quot;") + '" class="deal-img" onerror="this.onerror=null;this.src=\'https://via.placeholder.com/300x300?text=Product+Image\';">' +
            "</div>" +
            '<div class="deal-info">' +
              '<h3 class="deal-title">' + product.title + "</h3>" +
              '<p class="deal-price">$' + product.price.toFixed(2) + "</p>" +
              '<span class="deal-rating">' + stars + " (" + product.rating.count + ")</span>" +
              '<button class="quick-view-btn" data-id="' + product.id + '">Quick View</button>' +
            "</div>" +
          "</div>";

        container.append(card);
      });
    },
    error: function () {
      $("#deals-container").html(
        '<p class="deals-error">Unable to load deals. Please try again later.</p>'
      );
    },
  });

  // ── Quick View modal ──
  // Use event delegation since cards are added dynamically
  $("#deals-container").on("click", ".quick-view-btn", function () {
    var id = $(this).data("id");

    // Fetch single product details
    $.ajax({
      url: "https://fakestoreapi.com/products/" + id,
      method: "GET",
      dataType: "json",
      success: function (p) {
        var stars = "";
        var rating = Math.round(p.rating.rate);
        for (var i = 1; i <= 5; i++) {
          stars += i <= rating ? "★" : "☆";
        }

        $("#modal-img").attr("src", p.image);
        $("#modal-title").text(p.title);
        $("#modal-desc").text(p.description);
        $("#modal-price").text("$" + p.price.toFixed(2));
        $("#modal-rating").html(stars + " " + p.rating.rate + "/5 (" + p.rating.count + " reviews)");
        $("#modal-category").text("Category: " + p.category);

        $("#quick-view-modal").addClass("is-active");
        $("body").css("overflow", "hidden"); // prevent background scroll
      },
    });
  });

  // Close modal — × button
  $(".modal-close").on("click", function () {
    $("#quick-view-modal").removeClass("is-active");
    $("body").css("overflow", "");
  });

  // Close modal — clicking overlay background
  $("#quick-view-modal").on("click", function (e) {
    if ($(e.target).is("#quick-view-modal")) {
      $(this).removeClass("is-active");
      $("body").css("overflow", "");
    }
  });
});
