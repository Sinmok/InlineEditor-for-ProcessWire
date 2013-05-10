An Inline Editing module for the open source CMS, ProcessWire
=============================================================



Background
----------

This is my first plugin/module for any Open Source project ever. It is also my
first time ever using Git / GitHub! I am pleased to be able to share this
project with everyone. Contributions, tips and criticisms are always welcome!



Status
------

**Early alpha - Do not use in production sites! Use for testing only!**



Introduction
------------

This module will allow users with edit permissions for a page to edit textual
fields, inline, directly in the page once it has been loaded. The module makes
use of the contenteditble attribute in modern browsers to provide the inline
editing features.



Requirements
------------

1.  The latest version of ProcessWire, currently 2.1.3. The same PHP
    requirements as ProcessWire apply

2.  A modern browser that supports the HTML5 `contenteditable` attribute and has
    JavaScript enabled

3.  jQuery 1.9.1. A call to optionally add the jQuery script from Googles CDN is
    included



Installation
------------

1.  Grab a copy of the Inline Editor files.

2.  In your ProcessWire installation, navigation to site/modules and place the
    contents of the module inside.

3.  Open the ProcessWire admin panel. Select "Modules" and then select Check for
    new Modules.

4.  Install the 'InlineEditor' module. It should automatically install the
    InlineEditorProcess module too

5.  That's it - you're now ready to set up your template



Limitations
-----------

-   Currently only works on **basic textual fields** only. (TextArea, Text
    fields)

-   Repeaters do not currently word.



Module usage
------------

Once the module is installed, you're ready to start editing your templates to
enable inline, live editing.



### Include the module in your template header

Someone in your templates, preferably at the top of a header.inc file, add the
following:



\<?php

\$inline = \$modules-\>get("InlineEditor");

?\>

\<!DOCTYPE html\>

\<!--rest of body / whatever --\>



### Include the required script

Inbetween your \<head\>\</head\> tags add:



\<head\>

\<script src="jquery.js"\>\</script\>

\<?=\$inline-\>scripts()?\>

\<!-- If you need the jQuery library to be included, add true to the scripts()
call --\>

\<?=\$inline-\>scripts(true)?\>

\</head\>



Make sure that this snippet is called *AFTER* your jQuery call.



### Specify the areas that should be made editable

If, for example you have an area that is being output from the \$page API,
simply wrap the call in a div or other block element and call
\$inline-\>setupField("field_name") inside the wrapping elements attributes.



Example 1:

\<div id="foo"\>

\<?\$page-\>some_text_field?\>

\</div\>



**becomes**



\<div id="foo" \<?=\$inline-\>setupField("some_text_field")?\>\>

\<?\$page-\>some_text_field?\>

\</div\>



If you can, it is preferable however that you wrap a singular element around the
field that needs to be edited.

For example:



\<div id="foo" \<?=\$inline-\>setupField("some_text_field")?\>\>

\<?\$page-\>some_text_field?\>

\</div\>



**becomes**



\<div id="foo" \>

    \<div \<?=\$inline-\>setupField("some_text_field")?\>\>

        \<?\$page-\>some_text_field?\>

    \</div\>

\</div\>



Use whatever works for your HTML structure. Obviously you wouldn't want to wrap
contents of a \<h1\> or similiar elements with a \<div\> element.



Use your discretion as to what works for your site.



**Bad!!!**

\<h1\>

\<div \<?=\$inline-\>setupField("some_text_field")?\>\>

    \$page-some_text_field?\>

    \</div\>

\</h1\>



### Editable areas from content in other pages

Suppose you're displaying content from other pages that you would also like to
make editable. You can do this too by adding the Page object to the second
paramater of the setupField() method.



Example:

\<?php

\$other_pages = \$pages-\>find("template=some-template");

?\>



\<?foreach(\$other_pages as \$other_page):?\>

    \<div \<?=\$inline-\>setupField("some_text_field",\$other_page)?\>\>

        \<?=\$other_page-\>some_field?\>

    \</div\>



    \<div \<?=\$inline-\>setupField("some_other_field",\$other_page)?\>\>

        \<?=\$other_page-\>some_other_field?\>

    \</div\>

\<?endforeach;?\>




