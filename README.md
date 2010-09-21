Blender is a way to build Cappuccino theme files using CSS. It converts a CSS file into a Cappuccino Theme Descriptor file.

This is an initial release so there are guaranteed to be bugs. Nevertheless, I think it is useful at this point.

# Installation

Until Blender gets included in narwhal, you must install using:

    [sudo] tusk install http://github.com/chandlerkent/Blender/zipball/master
    
# Usage

Blender includes a command-line utility  called `blend`. To use `blend`:

    blend CSS_FILE
    
Blender will use the name of the CSS file to determine the name of the Objective-J output file (e.g. ThemeDescriptors.css -> ThemeDescriptors.j).

# Why?

Before Blender, creating a Cappuccino theme required writing really awkward code. It was a hassle and unfamiliar to most people.

People (designers) know CSS. They can feel at home using Blender.

# How?

Blender uses [Jison](http://github.com/zaach/jison) to parse the CSS file into an AST-like data structure. Blender then "compiles" the file into an Objective-J file.

# Example

See `/tests/Aristo.css` for an example. This file is an (almost) complete port of the Aristo theme to Blender.

TODO: Add more examples.

# TODO

- Support private classes that begin with `_`
- Find a way to make it easy to generate a ThemeDescriptor for a showcase
- .j -> .css
- Squash the (many, I'm sure) bugs
- Test