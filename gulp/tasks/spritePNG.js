const buffer = require('vinyl-buffer')
const imagemin = require('gulp-imagemin')
const merge = require('merge-stream')

const spritesmith = require('gulp.spritesmith')

module.exports = function spritePNG() {
  // Generation
  const spriteData = $.gulp.src('dev/static/images/sprite/png/*.png').pipe(
    spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite/sprite.png',
      cssName: 'sprite.scss',
      padding: 5,
      cssVarMap: function (sprite) {
        sprite.name = 'icon-' + sprite.name
      }
    })
  )

  // Optimization
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe($.gulp.dest('dist/static/images/sprite/'))

  // Assembly SCSS
  const cssStream = spriteData.css.pipe($.gulp.dest('dev/static/styles/utils/'))

  return merge(imgStream, cssStream)
}
