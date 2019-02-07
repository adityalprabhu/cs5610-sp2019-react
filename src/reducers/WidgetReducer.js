import CourseService from "../services/CourseService";

const widgets =
    [
        {
            id: 123,
            title: 'Widget 11',
            type: 'HEADING',
            text: 'This is a heading',
            size: 2
        },
        {
            id: 234,
            title: 'Widget 22',
            type: 'IMAGE',
            src: 'http://lorempixel.com/300/150/'
        },
        {
            id: 345,
            title: 'Widget 33',
            type: 'PARAGRAPH',
            text: ''
        },
        {
            id: 456,
            title: 'Widget 44',
            type: 'LIST',
            text: '',
            listItems: []
        }
    ];

const widgetReducer = (state ={widgets:[], preview: false}, action) => {

    let courseService = new CourseService();

    switch(action.type) {

        case 'DELETE_WIDGET':
            courseService.deleteWidget(action.widget.id);
            return {
                widgets: state.widgets.filter(widget => widget.id !== action.widget.id)
            };

        case 'CREATE_WIDGET':
            return {
                widgets: courseService.createWidget(action.topicId, {
                    id: (new Date()).getTime(),
                    title: 'Widget ' + ((new Date()).getTime()%10),
                    type: 'HEADING',
                    text: '',
                    size: 1
                })
            };

        case 'UPDATE_WIDGET':
            // replace the old widget with the new widget

            courseService.updateWidget(action.widget.id, action.widget);

            return {
                widgets: state.widgets.map(widget =>
                    widget.id === action.widget.id ? action.widget : widget
                )
            };

        case 'MOVE_WIDGET_UP':
            // move the widget position up by 1

            return {
                widgets: courseService.moveWidgetUp(action.widget, state.widgets)
            };

        case 'MOVE_WIDGET_DOWN':
            // move the widget position up by 1

            return {
                widgets: courseService.moveWidgetDown(action.widget, state.widgets)
            };

        case 'LOAD_WIDGETS':
            return {
                widgets: courseService.findAllWidgets(action.course, action.module, action.lesson, action.topic),
                topic:action.topic,
                preview:state.preview
            };

        case 'FIND_WIDGET':
            return {
                widget: courseService.findWidget(action.widgetId)
            };

        case 'FIND_ALL_WIDGETS_FOR_TOPIC':
            return {
                widgets: courseService.findWidgets(action.topic.id)
            };

        case 'FIND_ALL_WIDGETS':
            return {
                widgets: courseService.findAllWidgets(action.course, action.module, action.lesson, action.topic),
                topic:action.topic
            };

        case 'SAVE':
            return{
                widgets:state.widgets
            };

        case 'PREVIEW':
            console.log("in preview");
            console.log(state.preview);
            return{
                widgets: state.widgets
            };
        default:
            return state;
    }
};


export default widgetReducer;