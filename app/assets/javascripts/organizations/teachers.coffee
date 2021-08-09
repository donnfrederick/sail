# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$ ->
  $('.dropdown-item').on "click", ->
    jump_to = $(this).data "jump-to"
    if typeof jump_to is "string"
      location.href = jump_to
    console.log("called")
