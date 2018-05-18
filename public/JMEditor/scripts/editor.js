window.onload = function() {
	var editor = ace.edit("ar-editor");
	var editor_wrapper = document.getElementById("ar-editor");
    var new_file = document.getElementById("ar-new");
	var preview = document.getElementById("ar-preview");
	var title = document.getElementById("ar-title");
	var toggle_edit = document.getElementById("ar-show-editor");
	var toggle_preview = document.getElementById("ar-show-html");
	var md = markdownit({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(lang, str).value;
				} catch (__) {}
			}

			try {
				return hljs.highlightAuto(str).value;
			} catch (__) {}

    		return ''; // use external default escaping
      }
  });
    //  .use(markdownitFootnote);

    editor.getSession().setMode("markdown");
    editor.getSession().setTabSize(4);
    editor.getSession().setUseWrapMode(true);
    editor_wrapper.style.fontSize = '12px';
    editor.setOptions({
    	minLines: 30,
    	maxLines: editor.getSession().getScreenLength()
    });

    preview.innerHTML = md.render(editor.getValue());

    editor.getSession().on('change', function(e) {
    	//preview.innerHTML = md.render(editor.getValue());
    	var new_height = editor.getSession().getScreenLength();
    	editor.setOptions({maxLines:new_height});
    })

    new_file.onclick = function(event) {
        editor.setValue("");
        preview.innerHTML = md.render(editor.getValue());
    }

    toggle_preview.onclick = function(event) {
    	preview.innerHTML = md.render(editor.getValue());
    	editor_wrapper.style.display = 'none';
    	preview.style.display = 'block';
    	this.style.display = 'none';
    	toggle_edit.style.display = 'inline-block';
    }

    toggle_edit.onclick = function(event) {
    	editor_wrapper.style.display = 'block';
    	preview.style.display = 'none';
    	this.style.display = 'none';
    	toggle_preview.style.display = 'inline-block';
    }
}