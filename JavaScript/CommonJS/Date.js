/**
 * Created by admin on 3/29/16.
 */

var div = React.DOM.div;
var hr = React.DOM.hr;
var h2 = React.DOM.h2;

var DividerClass = React.createClass({
    displayName: 'Divider',
    render: function () {
        return div({className: 'divider'},
            h2(null, '这是不是对的啊?'),
            hr()
        );
    }
});