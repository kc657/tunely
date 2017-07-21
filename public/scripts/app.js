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
    let $modal = $('#songModal')
    let $songName = $modal.find('#songName')
    let $trackNumber = $modal.find('#trackNumber')

    let songToSubmit = {
      name: $songName.val(),
      trackNumber: $trackNumber.val()
    }
    let id = $('#songModal').data('album-id')
    let songPostingUrl = `/api/albums/${id}/songs`

    $.post(songPostingUrl, songToSubmit, function (song) {
      console.log('receiving ', song)
      $songName.val('')
      $trackNumber.val('')

      $modal.modal('hide')

      
    })
  })
})

// this function takes a single album and renders it to the page
function renderAlbum (album) {
  let songString = ''
  album.songs.forEach(function (song, i) {
    let trackNumber = i + 1
    songString = `${songString} - ${trackNumber} - ${song.name}`
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
          </div>

        </div>
      </div>
    </div>
  </div>
  `)
  $('#albums').prepend(albumHtml)
}
