/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

/* hard-coded data! */
/*
var sampleAlbums = []
sampleAlbums.push({
  artistName: 'Ladyhawke',
  name: 'Ladyhawke',
  releaseDate: '2008, November 18',
  genres: [ 'new wave', 'indie rock', 'synth pop' ]
})
sampleAlbums.push({
  artistName: 'The Knife',
  name: 'Silent Shout',
  releaseDate: '2006, February 17',
  genres: [ 'synth pop', 'electronica', 'experimental' ]
})
sampleAlbums.push({
  artistName: 'Juno Reactor',
  name: 'Shango',
  releaseDate: '2000, October 9',
  genres: [ 'electronic', 'goa trance', 'tribal house' ]
})
sampleAlbums.push({
  artistName: 'Philip Wesley',
  name: 'Dark Night of the Soul',
  releaseDate: '2008, September 12',
  genres: [ 'piano' ]
})
*/

/* end of hard-coded data */

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
})

// this function takes a single album and renders it to the page
function renderAlbum (album) {
  let songString = ''
  album.songs.forEach(function (song, i) {
    let trackNumber = i + 1
    songString = `${songString} - ${trackNumber} - ${song.name}`
  })
  let albumHtml = (`
    <div class="row album" data-album-id='${album.id}'>
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
          </div>

        </div>
      </div>
    </div>
  </div>
  `)
  $('#albums').prepend(albumHtml)
}
