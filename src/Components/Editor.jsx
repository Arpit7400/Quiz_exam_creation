/* eslint-disable */
// Load react default libraries.
import React, { useState } from 'react';

// Load Froala Editor scripts and styles.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
// Import jQuery so we can expose Froala editor to the window.
import $ from 'jquery';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// Expose froala-editor to the window.



function Editor({value, onChange}) {
     window.$ = $;
     window.FroalaEditor = require('froala-editor');
     // Load wiris mathtype-froala plugin.
     require('@wiris/mathtype-froala3');
     // Load WIRISplugins.js dynamically.
     const jsDemoImagesTransform = document.createElement('script');
     jsDemoImagesTransform.type = 'text/javascript';
     jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
     // Load generated scripts.
     document.head.appendChild(jsDemoImagesTransform);
     // Define the toolbar & configuration options for the froala editor.
     const toolbar = ['wirisEditor', 'wirisChemistry'];
     const froalaConfig = {
         toolbarButtons: toolbar,
         // Add [MW] uttons to the image editing popup Toolbar.
         imageEditButtons: ['wirisEditor', 'wirisChemistry', 'imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove'],
          // Allow all the tags to understand the mathml
          htmlAllowedTags: ['.*'],
          htmlAllowedAttrs: ['.*'],
          // List of tags that are not removed when they have no content inside
          // so that formulas renderize propertly
          htmlAllowedEmptyTags: ['mprescripts', 'none'],
          placeholderText: 'Start typing something...'
          // In case you are using a different Froala editor language than default,
          // language: 'es',
          // You can choose the language for the MathType editor, too:
          // @see: https://docs.wiris.com/en/mathtype/mathtype_web/sdk-api/parameters#regional_properties
          // mathTypeParameters: {
          //   editorParameters: { language: 'es' },
          // },
          // Execute on initialized editor.
         //  events: {
         //      initialized() {
         //      // Since Froala 3.1.1 version, initialization events need to be called manually for the React component.
         //      // Parse the initial content set on the editor through html to render it
         //      const contentRendered = WirisPlugin.Parser.initParse(this.html.get(true));
         //      this.html.set(contentRendered);
         //      },
         //  },
      };
    // const [data, setData] = useState()
    // const handleModelChange = (newModel) => {
    //   setData(newModel);
    //   console.log(newModel)
    // };
  
    return (
        <div className='math-editor' style={{width:'100%'}}>
            <FroalaEditor tag='div' config={ froalaConfig } model={ value } onModelChange={onChange} />
            {/* <FroalaEditorView model={value} /> */}
        </div>
    );
  }
  
  export default Editor;
  