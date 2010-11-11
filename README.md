Blender is a way to build Cappuccino theme files using CSS. It converts a CSS file into a Cappuccino Theme Descriptor file.

This is an early release so there are guaranteed to be bugs. Nevertheless, I think it is useful at this point.

# Installation

Until Blender gets included in narwhal, you must install using:

    [sudo] tusk install https://github.com/chandlerkent/Blender/zipball/master

Blender also requires [Jison](https://github.com/zaach/jison), so if you haven't installed it do so:

    [sudo] tusk install jison
    
# Usage

Blender includes a command-line utility  called `blend`. To use `blend`:

    Usage: blender.js [OPTIONS] INPUT_FILE [OUTPUT_DIR]
    Compiles a CSS file to a Cappuccino category of a theme file.
     -t THEME: Set the theme name. Overrides anything set in CSS file.
     -c CLASS: Set the class name. This will be used to create the category.
     -h --help: displays usage information (final option)
    
Blender will output a Theme Descriptor file in the specified OUTPUT_DIR (or current directory if none specified) whose name is CLASS (default ThemeDescriptors) + THEME (default DefaultThemeName) .j. So for example:

    blend -t Aristo -c ThemeDescriptors Aristo.css -> ThemeDescriptors+Aristo.j
    
# Category

As you may have noticed by now, Blender does not create a full Theme Descriptor file. It will only create a category of a specified Theme Descriptor class. This is because a Theme Descriptor file may also need to define sizing for the Theme Showcase. In order to support this, Blender instead creates a category which has methods to retrieve the theme values for each control. These methods should then be called from within the actual Theme Descriptor class.

For example, the following CSS:

    button {
        line-break-mode: CPLineBreakByTruncatingTail;
        image-offset: CPButtonDefaultHeight;
        text-color: var(TextColor); 
        min-size: 0.0 24.0;
        max-size: -1.0 24.0;
    }
    
when blended with:

    blend -t Aristo Aristo.css
    
will create a category file:
    
    // ThemeDescriptor+Aristo.j
    
    @import <Foundation/CPObject.j>
    @import <AppKit/AppKit.j>
    @import "ThemeDescriptor.j"

    @implementation ThemeDescriptor (Aristo)

    + (CPString)themeName
    {
    	return @"Aristo";
    }

    + (CPArray)buttonThemeValues
    {
    	var themedValues = [
    		[@"line-break-mode", CPLineBreakByTruncatingTail],
    		[@"image-offset", CPButtonDefaultHeight],
    		[@"text-color", [CPColor colorWithRed:79.0 / 255.0 green:79.0 / 255.0 blue:79.0 / 255.0 alpha:1]],
    		[@"min-size", CGSizeMake(0.0, 24.0)],
    		[@"max-size", CGSizeMake(-1.0, 24.0)],
    	];
    	return themedValues;
    }

    @end

which then should be used in the main Theme Descriptor file:

    // ThemeDescriptor.j
    @import <Foundation/CPObject.j>
    @import <AppKit/AppKit.j>

    @implementation ThemeDescriptor : BKThemeDescriptor
    {
    }

    + (CPButton)themedStandardButton
    {
        var button = [[CPButton alloc] initWithFrame:CGRectMake(0.0, 0.0, 60.0, CPButtonDefaultHeight)];
        [self registerThemeValues:[self buttonThemeValues] forView:button];
        return button;
    }

    @end

    @import "ThemeDescriptor+Aristo.j"
    
Notice the call to `[self buttonThemeValues]`. Also notice the `@import "ThemeDescriptor+Aristo.j"` at the bottom of the file to include the generated category.

# Why?

Before Blender, creating a Cappuccino theme required writing really awkward code. It was a hassle and unfamiliar to most people. Objective-J is not particularly suited for this.

People (designers) know CSS. They can feel at home using Blender.

# How?

Blender uses [Jison](https://github.com/zaach/jison) to parse the CSS file into an AST-like data structure. Blender then "compiles" the file into an Objective-J category.

# Example

See `/tests/Aristo.css` and `/tests/AristoThemeDescriptor.j` for an example. These files are an (almost) complete port of the Aristo theme to CSS.

TODO: Add more examples.

# TODO

- Support private classes that begin with `_`
- Find a way to make it easy to generate a ThemeDescriptor for a showcase
- .j -> .css?
- Squash the (many, I'm sure) bugs
- Test