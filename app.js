
  let currentImgIndex = 0;
  let numOfImages = 0;
  $('#submit').on('click', (event)=>{
    event.preventDefault();
    const userInput = $('input[type="text"]').val();
    $('.movie-img').empty();
    $('.movie-title').empty();
    $('.misc-info').empty();
    $('.movie-plot').empty();
    $('#add').remove();
    $('input[type="text"]').val('');
    $('.main-container').css('background-color', 'rgba(0, 0, 0, 0.5)');

    $.ajax({
        url:'https://www.omdbapi.com/?apikey=53aa2cd6&t=' + userInput
    }).then(
        (data)=>{

            if (data.Response === "False" || data.Error === "Movie not found!") {
              alert('Movie not found!');
              $("#userInput").val('');
            }
            else {
              const $img = $('<img>').attr('src', data.Poster).appendTo('.movie-img');
              $('.movie-title').append(data.Title);

              let $rated = $('<h4>').text(`${data.Rated} `).appendTo('.misc-info')
              let $runtime = $('<h4>').text(`${data.Runtime} `).appendTo('.misc-info')
              let $genre = $('<h4>').text(`${data.Genre} `).appendTo('.misc-info')
              let $metaScore = $('<h4>').text(`Meta Score: ${data.Metascore} `).appendTo('.misc-info')
              $('.movie-plot').text(`${data.Plot}`);
              //add to playlist button
              const $addToPlaylist = $('<button>').text('Add to Playlist').appendTo(".movie-info").attr('id', 'add');

              $('#add').on('click', () => {
                 $('.movie-img').empty();
                 $('.movie-title').empty();
                 $('.misc-info').empty();
                 $('.movie-plot').empty();
                 $('#add').remove();
                 $('.movie-playlist>h1').css("display", "block");
                 const $playlistImg = $('<img>').attr('src', data.Poster).appendTo('.playlist-images');
                 $('.buttons').css('display', 'block');
                 alert(`${data.Title} has been added to your playlist!`);
                 numOfImages = $('.playlist-images').children().length;
                 $('.main-container').css('background-color', 'rgba(0, 0, 0, 0)');
                 $('.playlist-images>img').css('border', '2px solid ivory');

               })
               }


          },
          ()=>{
              console.log("couldn't access the API");
          }
      );
    });

    numOfImages = $('.playlist-images').children().length;

    $('#previous-button').on('click', () => {
      $('.playlist-images').children().eq(currentImgIndex).css('display', 'none');
      currentImgIndex--;
      if (currentImgIndex < 0) {
        currentImgIndex = numOfImages - 1;
      }
      $('.playlist-images').children().eq(currentImgIndex).css('display', 'block');


      // console.log(`currentImgIndex: ${currentImgIndex}\n numOfImages: ${numOfImages}`);
      // console.log('this is previous button, current index is at: ' + currentImgIndex);
    })

    $('#next-button').on('click', () => {
      $('.playlist-images').children().eq(currentImgIndex).css('display', 'none');
      currentImgIndex++;
       if (currentImgIndex >= numOfImages) {
        currentImgIndex = 0;
      }
      $('.playlist-images').children().eq(currentImgIndex).css('display', 'block');
      // console.log(`currentImgIndex: ${currentImgIndex}\n numOfImages: ${numOfImages}`);
      // console.log("this is next button, current index is at: " + currentImgIndex);
    })

    $('#clear-button').on('click', () => {
      $('.playlist-images').empty();
      $('.buttons').css('display', 'none');
      $('.movie-playlist>h1').css('display', 'none');
      $('.main-container').css('background-color', 'rgba(0, 0, 0, 0)');
    })












































//////////////////////////
// search bar w/ enter //
////////////////////////

// how to make the search bar function via enter key and pressing search?
///how to get search bar to work once we hit enter?
// used the key press function but the function doesn't work with ajax...

    // $("#userInput").keypress(function (e) {
    //   if (e.keyCode === 13) {
    //   alert('Enter key pressed!');
    //   const userInput = $('input[type="text"]').val();
    //   event.preventDefault();
    //   $.ajax({
    //       url:'https://www.omdbapi.com/?apikey=53aa2cd6&t=' + userInput
    //   }).then(
    //       (data)=>{
    //         console.log(data.Title);
    //           if (data.Response === "False" || data.Error === "Movie not found!") {
    //             alert('invalid movie');
    //             $("#userInput").val('');
    //           }
    //           else {
    //             console.log(data);
    //             const $img = $('<img>').attr('src', data.Poster).appendTo('.movie-img');
    //
    //             const $title = $('<h1>').text(`${data.Title} (${data.Year})`).appendTo(".movie-title");
    //             const $rated = $('<h2>').text(`Rated: ${data.Rated}`).appendTo(".misc-info");
    //             const $runtime = $('<h2>').text(`${data.Runtime}`).appendTo(".misc-info");
    //             const $genre = $('<h2>').text(`${data.Genre}`).appendTo(".misc-info");
    //             const $metaScore = $('<h2>').text(`Meta Score: ${data.Metascore}`).appendTo(".misc-info");
    //             const $moviePlot = $('<p>').text(data.Plot).appendTo(".movie-info");
    //             $("#userInput").val('');
    //             $('#add').on('click', () => {
    //             $('.movie-playlist>h1').css("display", "block");
    //             $img.appendTo(".movie-playlist");
    //             $('.movie-title').empty();
    //             $('.movie-info').empty();
    //             $('#add').remove();
    //           }
    //
    //
    //           // const $movieRelease =
    //
    //       },
    //       ()=>{
    //           console.log("couldn't access the API");
    //       }
    //   );
    //   }
    // });



    //////////////////////////
    //key press for enter ///
    ////////////////////////


    // $('#userInput').keypress(
    //   function(event){
    //   let keycode = (event.keyCode ? event.keyCode : event.which);
    //
    //   if(keycode === 13){
    //     alert('You pressed a "enter" key in textbox');
    //
    //
    //   }
    //
    // });
