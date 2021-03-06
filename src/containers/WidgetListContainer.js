import React from 'react'
import {connect} from 'react-redux'
import WidgetList from '../components/WidgetList'
import WidgetService from "../services/WidgetService";

const stateToPropertyMapper = state => ({

    widgets: state.widgets
});

const widgetService = new WidgetService();
const dispatchToPropertyMapper = dispatch => (

    {

    loadWidgets: (widgets, topic, course, module, lesson) => dispatch({
        type:'LOAD_WIDGETS',
        widgets:widgets,
        topic:topic,
        course:course,
        module: module,
        lesson: lesson

    }),
    deleteWidget: widget => {
        // widgetService.deleteWidget(widget.id)
        dispatch({
            type: 'DELETE_WIDGET',
            widget: widget
        })
    }
        ,
    addWidget: (topicId, courseId) =>
        dispatch({
            type: 'CREATE_WIDGET',
            topicId: topicId,
            courseId: courseId
        }),
    updateWidget: widget =>
        dispatch({
            type: 'UPDATE_WIDGET',
            widget: widget
        }),
    moveWidgetUp: widget =>
        dispatch({
            type: 'MOVE_WIDGET_UP',
            widget: widget
        }),
    moveWidgetDown: widget =>
        dispatch({
            type: 'MOVE_WIDGET_DOWN',
            widget: widget
        }),
    findWidget: widgetId =>
        dispatch({
            type: 'FIND_WIDGET',
            widgetId: widgetId
        }),
    findAllWidgetsForTopic: topicId =>
        dispatch({
            type: 'FIND_WIDGET',
            topicId: topicId
        }),
    save: (topicId) =>
        dispatch({
            type: 'SAVE',
            topicId: topicId
        }),
    togglePreview: preview =>
        dispatch({
            type: 'PREVIEW',
            preview: preview
        }),
});

const WidgetListContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(WidgetList);

export default WidgetListContainer