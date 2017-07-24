$(document).ready(function () {
  console.log('app.js loaded!')

  $('.new-album-btn').on('click', function (e) {
    $('.add-album-modal').modal('show')
  })

  $('.new-album-form').on('submit', function (e) {
    e.preventDefault()
    const formData = $(this).serialize()

    $('.artist-name-input').val('')
    $('.album-name-input').val('')
    $('.release-date-input').val('')

    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: formData,
      success: function (album) {
        console.log('successfully posted!')
        console.log('we got back', album)
        renderAlbum(album)
      },
      error: function () {
        console.log('posting failed')
      }
    })

    $('.add-album-modal').modal('hide')
  })
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: function (albums) {
      albums.forEach(renderAlbum)
    },
    error: function (err) {
      throw err
    }
  })
  $('#albums').on('click', '.add-song', function (e) {
    let id = $(this).closest('.album').data('album-id')
    console.log(id)
    $('#songModal').data('album-id', id)
    $('#songModal').modal('show')
  })

  $('#saveSong').on('click', function (e) {
    e.preventDefault()

    const album_id = $('#songModal').data('album-id')
    const trackNumber = $('#trackNumber').val()
    const songName = $('#songName').val()
    console.log(album_id)
    console.log(trackNumber)
    console.log(songName)

    $.ajax({
      method: 'POST',
      url: '/api/albums/' + album_id + '/songs',
      data: {
        trackNumber: trackNumber,
        name: songName
      },
      success: function (song) {
        console.log('Post succeeded!', song)
        $.ajax({
          method: 'GET',
          url: '/api/albums/' + album_id,
          success: function (album) {
            console.log('Here\'s the album we found!', album)
          // render new album
          },
          error: function (e) {
            console.log('GET failed!')
          }
        })
      },
      error: function (e) {
        console.log('post failed!', e)
      }
    })
    $('#songModal').modal('hide');
  })

  $('#albums').on('click', '.delete-song', function (e) {
    e.preventDefault
  })
})

// this function takes a single album and renders it to the page
function renderAlbum (album) {
  let songString = ''
  album.songs.forEach(function (song, i) {
    let trackNumber = i + 1
    songString = `${songString} - ${song. trackNumber} - ${song.name}`
  })
  let albumHtml = (`
    <div class="row album" data-album-id='${album._id}'>
    <div class="col-md-10 col-md-offset-1">
      <div class="panel panel-default">
        <div class="panel-body">


        <!-- begin album internal row -->
          <div class='row'>
            <div class="col-md-3 col-xs-12 thumbnail album-art">
              <img src='${album.image}' alt="album image">
            </div>

            <div class="col-md-9 col-xs-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4 class='inline-header'>Album Name:</h4>
                  <span class='album-name'>${album.name}</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'>Artist Name:</h4>
                  <span class='artist-name'>${album.artistName}</span>
                </li>

                <li class="list-group-item">
                  <h4 class='inline-header'>Released date:</h4>
                  <span class='album-releaseDate'>${album.releaseDate}</span>
                </li>
                <li class="list-group-item">
                  <h4 class="inline-header">Songs:</h4>
                  <span> ${songString}</span>
                </li>
              </ul>
            </div>

          </div>
          <!-- end of album internal row -->

          <div class='panel-footer'>
            <button type='button' class='btn btn-primary add-song'>Add Song</button>
            <button type='button' class='btn btn-primary delete-song'>Delete Song</button>
          </div>

        </div>
      </div>
    </div>
  </div>
  `)
  $('#albums').prepend(albumHtml)
}
