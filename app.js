///////////////////////
//THIS PROJECT WORKS//
/////////////////////
let currentImgIndex = 0;
let numOfImages = 0;
$('.search-movies').on('submit', (event)=>{
  event.preventDefault();
  const userInput = $('#userInput').val();
  $('.movie-img').empty();
  $('.movie-title').empty();
  $('.misc-info').empty();
  $('.movie-plot').empty();
  $('#add').remove();




  $.ajax({
      url:'https://www.omdbapi.com/?apikey=53aa2cd6&t=' + userInput
  }).then(
      (data)=>{
          $('input[type="text"]').val('');
          $('.main-container').css('background-color', 'rgba(0, 0, 0, 0.5)');
          if (data.Response === "False" || data.Error === "Movie not found!") {
            alert('Movie not found!');
            $("#userInput").val('');
            $('.main-container').css('display', 'none');

          }
          else {
            $('.main-container').css('display', 'flex');
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
               $('.playlist-images>img').css('border', '2px solid rgb(103,151,117);');
               $('.main-container').css('display', 'none');
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

  })

  $('#next-button').on('click', () => {
    $('.playlist-images').children().eq(currentImgIndex).css('display', 'none');
    currentImgIndex++;
     if (currentImgIndex >= numOfImages) {
      currentImgIndex = 0;
    }
    $('.playlist-images').children().eq(currentImgIndex).css('display', 'block');
  })

  $('#clear-button').on('click', () => {
    $('.playlist-images').empty();
    $('.buttons').css('display', 'none');
    $('.movie-playlist>h1').css('display', 'none');
    $('.main-container').css('background-color', 'rgba(0, 0, 0, 0)');
  })
