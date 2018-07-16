var noop = () => {}

function objectStringify(obj) {
  var str = ''
  for (var key in obj) {
    if (str !== '') {
      str += '&'
    }
    str += key + '=' + encodeURIComponent(obj[key])
  }
  return str
}

function getFileName(name) {
  if (name) {
    var target = name.split(';').filter(function(item) {
      return item.indexOf('filename=') > -1
    })
    if (target && target[0]) {
      return target[0].split('filename=')[1].replace(/(^['"])|(['"]$)/g, '')
    }
  }
  return ''
}

var download = (url, data, options = {}) => {
  var successCallback = options.successCallback || noop
  var failCallback = options.failCallback || noop
  var fileName = options.fileName || 'result'
  delete options.successCallback
  delete options.failCallback
  delete options.fileName
  function createAndDownloadFile(fileName, content) {
    var aTag = document.createElement('a')
    var blob = new Blob([content])
    aTag.download = fileName
    aTag.href = URL.createObjectURL(blob)
    aTag.target = '_self' // required in FF
    document.body.appendChild(aTag) // required in FF
    aTag.click()
    URL.revokeObjectURL(blob)
    aTag.parentNode.removeChild(aTag)
  }

  function aerolite(url) {
    var r = new XMLHttpRequest()
    r.open('GET', url)
    r.responseType = 'blob'
    r.withCredentials = true
    r.onreadystatechange = function() {
      var attachmentFilename = r.getResponseHeader('Content-Disposition')
      attachmentFilename = getFileName(attachmentFilename)
      if (r.readyState === 4) {
        if (r.status === 200) {
          createAndDownloadFile(attachmentFilename || fileName, r.response)
          successCallback()
        } else {
          failCallback()
        }
      }
    }
    r.send(null)
  }
  var uri = `${url}${data ? '?' + objectStringify(data) : ''}`
  aerolite(uri)
}

export default download
