CKEDITOR.plugins.add('mentions', {
  init: function(editor) {

    editor.on( 'contentDom', function() {
      let editable = editor.editable()

      const atMentions = {
        triggers: [
          '@andrew',
          '@sam',
          '@alec',
        ],
        callback: function(mention) {
          console.log('mention', mention)
          const menu = editor.document.createElement('div')
          menu.$.style.height = '50px'
          menu.$.style.position = 'absolute'
          menu.$.style.width = '100px'
          menu.$.style.background = 'red'
          menu.$.appendChild(document.createTextNode('sup'))

          editor.insertElement(menu)
        }
      }

      editable.attachListener(editable, 'keyup', function(e) {
        mention(editor, atMentions)
      })
    })
  }
})

function mention(editor, atMentions) {

  const selection = editor.getSelection()

  const range = selection.getRanges()[0]
  const startNode = range.startContainer

  if (startNode.type == CKEDITOR.NODE_TEXT && range.startOffset) {
    const text = startNode.getText()

    let indexPrevSpace = text.lastIndexOf(' ', range.startOffset) + 1
    let indexNextSpace = text.indexOf(' ', range.startOffset)

    if (indexPrevSpace == -1) indexPrevSpace = 0
    if (indexNextSpace == -1) indexNextSpace = text.length

    let filteredWord = text.substring(indexPrevSpace,indexNextSpace)

    if (filteredWord.indexOf('@') === 0) {
      console.log('filtedWord', filteredWord)
      if (atMentions.triggers.includes(filteredWord)) {
        replaceNode(editor, indexPrevSpace, indexNextSpace, filteredWord)
        atMentions.callback(filteredWord)
      }
    }
    if (filteredWord.indexOf('#') === 0) {
      console.log('mention', filteredWord)
    }
  }
}

function getCurrentWord(editor) {
  const range = editor.getSelection().getRanges()[0],
    startNode = range.startContainer
  if (startNode.type == CKEDITOR.NODE_TEXT && range.startOffset) {
    let indexPrevSpace = startNode.getText().lastIndexOf(' ', range.startOffset) + 1
    let indexNextSpace = startNode.getText().indexOf(' ', range.startOffset)
    if(indexPrevSpace == -1) {
      indexPrevSpace=0;
    }
    if(indexNextSpace == -1) {
      indexNextSpace = startNode.getText().length
    }

    let filteredWord = startNode.getText().substring(indexPrevSpace,indexNextSpace)

    // Range at the non-zero position of a text node.

    return startNode.getText().substring(indexPrevSpace,indexNextSpace)
  }
  // Selection starts at the 0 index of the text node and/or there's no previous text node in contents.
  return '';
}


function replaceNode(editor, end, start, replace) {

  let selection     = editor.getSelection();
  let range         = selection.getRanges()[0];
  let startOffset   = parseInt(range.startOffset - replace.length) || 0;
  let element       = range.startContainer.$;
  const trim = str => str.trim()

  // Keep the text originally inserted after the new tag.
  let after_text = element.textContent.substr(startOffset + end);

  // Shorten text node
  element.textContent = element.textContent.substr(0, startOffset);

  // Create link
  let link = document.createElement('a');
  link.href = '#' + replace.substring(1)
  link.textContent = replace;

  // Insert link after text node
  // this is used when the link is inserted not at the end of the text
  if (element.nextSibling) {
    element.parentNode.insertBefore(link, element.nextSibling);
  }

  // at the end of the editor text
  else {
    element.parentNode.appendChild(link);
  }
  // Add the text which was present after the tag.
  if (trim(after_text).length) {
    element.parentNode.appendChild(document.createTextNode(after_text));
  }

  selection = editor.getSelection();
  range = selection.getRanges()[0];
  let el = new CKEDITOR.dom.element(link.parentNode);
  range.moveToElementEditablePosition(el, link.parentNode.textContent.length);
  editor.focus();
  range.select();
}
