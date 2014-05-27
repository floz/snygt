page = require "page"

module.exports = ->
    page "/", home
    page "/details", details
    page "/infos", infos

home = ->
    console.log "home"

details = ->
    console.log "details"

infos = ->
    console.log "infos"
