/*
 * ThemeDescriptors.j
 * Aristo
 *
 * Created by Francisco Tolmasky.
 * Copyright 2009, 280 North, Inc. All rights reserved.
 */

@import <Foundation/CPObject.j>
@import <AppKit/AppKit.j>
@import <AppKit/CPTableHeaderView.j>

@implementation AristoThemeDescriptor : BKThemeDescriptor
{
}

+ (CPArray)themeShowcaseExcludes
{
    return ["alert", "cornerview", "columnHeader", "tableView", "tableHeaderRow", "tableDataView"];
}

+ (CPButton)makeButton
{
    return [[CPButton alloc] initWithFrame:CGRectMake(0.0, 0.0, 60.0, CPButtonDefaultHeight)];
}

+ (CPButton)button
{
    var button = [self makeButton];
    
    [self registerThemeValues:[self buttonThemeValues] forView:button];

    return button;
}

+ (CPButton)themedStandardButton
{
    var button = [self button];

    [button setTitle:@"Cancel"];

    return button;
}

+ (CPButton)themedDefaultButton
{
    var button = [self button];

    [button setTitle:@"OK"];
    [button setThemeState:CPThemeStateDefault];

    return button;
}

+ (CPPopUpButton)popUpButton
{
    var button = [[CPPopUpButton alloc] initWithFrame:CGRectMake(0.0, 0.0, 100.0, 24.0) pullsDown:NO];
    
    [self registerThemeValues:[self popUpButtonThemeValues] forView:button];
    
    return button;
}

+ (CPPopUpButton)themedPopUpButton
{
    var button = [self popUpButton];
    
    [button setTitle:@"Pop Up"];
    [button addItemWithTitle:@"item"];
    
    return button;
}

+ (CPPopUpButton)themedPullDownMenu
{
    var button = [self popUpButton];

    [button setPullsDown:YES];
    [button setTitle:@"Pull Down"];
    [button addItemWithTitle:@"item"];

    return button;
}

+ (CPScrollView)themedScrollView
{
    var scrollView = [[CPScrollView alloc] initWithFrame:CGRectMake(0.0, 0.0, 200.0, 200.0)];

    [scrollView setAutohidesScrollers:YES];
    [scrollView setBorderType:CPLineBorder];
    
    [self registerThemeValues:[self scrollViewThemeValues] forView:scrollView];

    return scrollView;
}

+ (CPScroller)makeVerticalScroller
{
    var scroller = [[CPScroller alloc] initWithFrame:CGRectMake(0.0, 0.0, 15.0, 170.0)];

    [scroller setFloatValue:0.1];
    [scroller setKnobProportion:0.5];

    return scroller;
}

+ (CPScroller)themedVerticalScroller
{
    var scroller = [self makeVerticalScroller];

    [self registerThemeValues:[self scrollerThemeValues] forView:scroller];
    
    return scroller;
}

+ (CPScroller)makeHorizontalScroller
{
    var scroller = [[CPScroller alloc] initWithFrame:CGRectMake(0.0, 0.0, 170.0, 15.0)];

    [scroller setFloatValue:0.1];
    [scroller setKnobProportion:0.5];

    return scroller;
}

+ (CPScroller)themedHorizontalScroller
{
    var scroller = [self makeHorizontalScroller];
    
    [self registerThemeValues:[self scrollerThemeValues] forView:scroller];

    return scroller;
}

+ (CPTextField)makeTextField
{
    var textfield = [[CPTextField alloc] initWithFrame:CGRectMake(0.0, 0.0, 60.0, 30.0)];
    
    [self registerThemeValues:[self textFieldThemeValues] forView:textfield];
    
    return textfield;
}

+ (CPTextField)themedStandardTextField
{
    var textfield = [self makeTextField];

    [textfield setBezeled:YES];

    [textfield setPlaceholderString:"placeholder"];
    [textfield setStringValue:""];
    [textfield setEditable:YES];

    return textfield;
}

+ (CPTextField)themedRoundedTextField
{
    var textfield = [self makeTextField];

    [textfield setBezeled:YES];
    [textfield setBezelStyle:CPTextFieldRoundedBezel];

    [textfield setPlaceholderString:"placeholder"];
    [textfield setStringValue:""];
    [textfield setEditable:YES];

    return textfield;
}

+ (CPRadioButton)themedRadioButton
{
    var button = [CPRadio radioWithTitle:@"Hello Friend!"];
    
    [self registerThemeValues:[self radioButtonThemeValues] forView:button];

    return button;
}

+ (CPCheckBox)makeCheckBoxButton
{
    var button = [CPCheckBox checkBoxWithTitle:@"Another Option"];
    
    [self registerThemeValues:[self checkBoxThemeValues] forView:button];

    return button;
}

+ (CPCheckBox)themedCheckBoxButton
{
    return [self makeCheckBoxButton];
}

+ (CPCheckBox)themedMixedCheckBoxButton
{
    var button = [self makeCheckBoxButton];

    [button setAllowsMixedState:YES];
    [button setState:CPMixedState];

    return button;
}

+ (CPSegmentedControl)makeSegmentedControl
{
    var segmentedControl = [[CPSegmentedControl alloc] initWithFrame:CGRectMake(0.0, 0.0, 0.0, 24.0)];

    [segmentedControl setTrackingMode:CPSegmentSwitchTrackingSelectAny];
    [segmentedControl setSegmentCount:3];

    [segmentedControl setWidth:40.0 forSegment:0];
    [segmentedControl setLabel:@"foo" forSegment:0];
    [segmentedControl setTag:1 forSegment:0];

    [segmentedControl setWidth:60.0 forSegment:1];
    [segmentedControl setLabel:@"bar" forSegment:1];
    [segmentedControl setTag:2 forSegment:1];

    [segmentedControl setWidth:35.0 forSegment:2];
    [segmentedControl setLabel:@"1" forSegment:2];
    [segmentedControl setTag:3 forSegment:2];

    return segmentedControl;
};

+ (CPSegmentedControl)themedSegmentedControl
{
    var segmentedControl = [self makeSegmentedControl];
    
    [self registerThemeValues:[self segmentedControlThemeValues] forView:segmentedControl];

    return segmentedControl;
}

+ (CPSlider)makeHorizontalSlider
{
    return [[CPSlider alloc] initWithFrame:CGRectMake(0.0, 0.0, 50.0, 24.0)];
}

+ (CPSlider)themedHorizontalSlider
{
    var slider = [self makeHorizontalSlider];
    
    [self registerThemeValues:[self sliderThemeValues] forView:slider];

    return slider;
}

+ (CPSlider)makeVerticalSlider
{
    return [[CPSlider alloc] initWithFrame:CGRectMake(0.0, 0.0, 24.0, 50.0)];
}

+ (CPSlider)themedVerticalSlider
{
    var slider = [self makeVerticalSlider];
    
    [self registerThemeValues:[self sliderThemeValues] forView:slider];

    return slider;
}

+ (CPSlider)makeCircularSlider
{
    var slider = [[CPSlider alloc] initWithFrame:CGRectMake(0.0, 0.0, 34.0, 34.0)];

    [slider setSliderType:CPCircularSlider];

    return slider;
}

+ (CPSlider)themedCircularSlider
{
    var slider = [self makeCircularSlider];

    [self registerThemeValues:[self sliderThemeValues] forView:slider];
    
    return slider;
}

+ (CPButtonBar)makeButtonBar
{
    var buttonBar = [[CPButtonBar alloc] initWithFrame:CGRectMake(0.0, 0.0, 147.0, 26.0)];

    [buttonBar setHasResizeControl:YES];

    var popup = [CPButtonBar actionPopupButton];
    [popup addItemWithTitle:"Item 1"];
    [popup addItemWithTitle:"Item 2"];

    [buttonBar setButtons:[[CPButtonBar plusButton], [CPButtonBar minusButton], popup]];

    return buttonBar;
}

+ (CPButtonBar)themedButtonBar
{
    var buttonBar = [self makeButtonBar];
    
    [self registerThemeValues:[self buttonBarThemeValues] forView:buttonBar];

    return buttonBar;
}

+ (_CPTableColumnHeaderView)makeColumnHeader
{
    var header = [[_CPTableColumnHeaderView alloc] initWithFrame:CGRectMake(0.0, 0.0, 100.0, 24.0)];

    [header setStringValue:@"Table Header"];

    return header;
}

+ (_CPTableColumnHeaderView)themedColumnHeader
{
    var header = [self makeColumnHeader];
    
    // [self registerThemeValues:[self ThemeValues] forView:slider];
    
    return header;
}

+ (CPTableHeaderView)themedTableHeaderView
{
    var header = [[CPTableHeaderView alloc] initWithFrame:CGRectMake(0.0, 0.0, 100.0, 23.0)];

    [self registerThemeValues:[self tableHeaderViewThemeValues] forView:header];
    
    return header;
}

+ (_CPCornerView)themedCornerview
{
    var scrollerWidth = [CPScroller scrollerWidth],
        corner = [[_CPCornerView alloc] initWithFrame:CGRectMake(0.0, 0.0, scrollerWidth, 23.0)];

    return corner;
}

+ (CPTableView)themedTableView
{
    // This is a bit more complicated than the rest because we actually set theme values for several different (table related) controls in this method

    var tableview = [[CPTableView alloc] initWithFrame:CGRectMake(0.0, 0.0, 150.0, 150.0)];

    return tableview;
}

+ (CPTextField)themedTableDataView
{
    var view = [self themedStandardTextField];

    [view setBezeled:NO];
    [view setEditable:NO];
    [view setThemeState:CPThemeStateTableDataView];

    return view;
}

+ (CPSplitView)themedSplitView
{
    var splitView = [[CPSplitView alloc] initWithFrame:CGRectMake(0.0, 0.0, 200.0, 200.0)],
        leftView = [[CPView alloc] initWithFrame:CGRectMake(0.0, 0.0, 75.0, 150.0)],
        rightView = [[CPView alloc] initWithFrame:CGRectMake(75.0, 0.0, 75.0, 150.0)];

    [splitView addSubview:leftView];
    [splitView addSubview:rightView];
    
    [self registerThemeValues:[self splitViewThemeValues] forView:splitView];

    return splitView;
}

+ (CPAlert)themedAlert
{
    var alert = [CPAlert new];
    
    [self registerThemeValues:[self alertThemeValues] forView:alert];

    return alert;
}

@end

@import "AristoThemeDescriptor+Aristo.j"