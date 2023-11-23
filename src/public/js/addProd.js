
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", async function (event) {
            const productId = event.target.getAttribute("data-product-id");

            try {
                const response = await fetch(`/carts/add/${productId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const responseData = await response.json();
                console.log("Server Response:", responseData);

                if (response.ok) {
                    alert("Product added to cart!");
                } else {
                    alert("Error adding product to cart.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error adding product to cart.");
            }
        });
    });
});