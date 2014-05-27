page = require "page"

dom = document.getElementById "main-menu"
domLinkInfos = dom.querySelector ".menu__infos"

module.exports.init = ->
    domLinkInfos.addEventListener "click", ( e ) ->
        e.preventDefault()
        page domLinkInfos.getAttribute "href"
