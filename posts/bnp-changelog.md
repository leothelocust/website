# Better Network Panel - Changelog <!-- omit in toc -->

- [Version 1.0.0](#version-100)
  - [Improved Search](#improved-search)
  - [JSON Editor BUILT IN](#json-editor-built-in)
  - [Vertical Chrome Panel](#vertical-chrome-panel)
  - [Download JSON](#download-json)

## Version 1.0.0

<a href="/images/v1.0.0-FullScreenshot.png" data-jbox-image="gallery">
    ![Version 1.0.0 Screenshot](/images/v1.0.0-FullScreenshot.png)
</a>

<a id="improved-search"></a>
### Improved Search

Advanced search capability has been added in this release which improves on the previous search by adding a negation search (i.e. "-carts" which would remove requests containing "carts" in the results).

<a href="/images/v1.0.0-Search.png" data-jbox-image="gallery">
    ![New Improved Search Screenshot](/images/v1.0.0-Search.png)
</a>


Additionally, **AND** and **OR** searching filters have been added.  So you can search for:

> `products` **AND** `services`

Which would return any request containing **BOTH** `products` **AND** `services` somewhere in the headers, request body, etc...
 
And you can search for:

> `products` **OR** `services`

Which would return any requests containing **EITHER** `products` **OR** `services`.

<a id="json-editor-built-in"></a>
### JSON Editor BUILT IN

Using the Open Source [JSON Editor](https://github.com/josdejong/jsoneditor), you can now easily search and view JSON data just as you can on the official [jsoneditoronline.org](https://jsoneditoronline.org) website.

<a href="/images/v1.0.0-JSONEditor.png" data-jbox-image="gallery">
    ![JSON Editor Screenshot](/images/v1.0.0-JSONEditor.png)
</a>

<a id="vertical-chrome-panel"></a>
### Vertical Chrome Panel

Better Network Panel now supports a vertical layout using responsive CSS.  Panel resizing will be released soon.

<a href="/images/v1.0.0-VerticalPanel.png" data-jbox-image="gallery">
    ![Vertical Panel Screenshot](/images/v1.0.0-VerticalPanel.png)
</a>

<a id="download-json"></a>
### Download JSON

Download the current panel as a JSON doc.

<a href="/images/v1.0.0-DownloadJSON.png" data-jbox-image="gallery">
    ![Download JSON Button Screenshot](/images/v1.0.0-DownloadJSON.png)
</a>
