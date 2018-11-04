var data = ["sad", "happy", "angry"];


var fn = {
    buildCategories() {
        $('#categories').empty();
        data.forEach((item) => {
            let $button = $('<button>');
            $button.addClass("btn btn-primary btn-sm").attr('data-category', item).text(item);
            $('#categories').append($button);
        })
    },
    addCategory() {
        let newCategory = $('#inputBox').val().trim();
        data.push(newCategory);
        $('#btn-add').attr('placeholder', "add a new category");

        fn.buildCategories();
    },
    getImages() {
        $('#imageList').empty();
        var search = $(this).attr('data-category');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            search + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data
            console.log(results)
            results.forEach((item, index) => {
       
                let title = item.title;
      
                let username = item.username;
                let url = item.url;
                let rating = item.rating.toUpperCase();
                var fixed = item.images.fixed_width_still.url;
                var gif = item.images.fixed_width.url;

                var $cardDiv = $('<div>');
                $cardDiv.addClass('card')

                var $image = $('<img>');
                $image.addClass('card-img-top fixed')
                    .attr({
                        'src': fixed,
                        'data-index': index,
                        'data-gif': gif,
                        'data-fixed': fixed
                    })

                var $metadata = $('<div>');
                $metadata.html('<p class="meta">Title: <span class="value">' + title + '</span></p>' +
                    '<p class="meta">Rating: <span class="value">' + rating + '</span></p>')

                $cardDiv.append($image, $metadata)

                $('#imageList').append($cardDiv)


            });

            


           

        });
    },
};

 function test() {
     console.log('scroll')
 }
function toogleImage() {
    let dataGif = $(this).attr('data-gif');
    let dataFixed = $(this).attr('data-fixed');
    let src = $(this).attr('src');

    if (src === dataFixed) {
        $(this).attr({
            'src':dataGif,
        })
    } else {
        $(this).attr({
            'src':dataFixed,
        })
    }
    
    // let n = $(this).attr('data-index')

    
    // console.log(x)
}

$(document).on("click", ".btn-sm", fn.getImages)
$(document).on("click", "#btn-add", fn.addCategory)

$(document).on("click", "img", toogleImage)

$(document).on("scroll", test)


fn.buildCategories();